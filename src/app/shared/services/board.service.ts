import { TPlayer, TState } from "#shared/types";
import { Injectable } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { BehaviorSubject, combineLatest, fromEvent, Subject } from "rxjs";
import { filter, map, mergeWith, scan, shareReplay, skipWhile, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private readonly winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]


  private readonly checkWinner = (board: TState, player: TPlayer) => {
    for (const combination of this.winningCombinations) {
      if (combination.every(idx => board[idx] === player)) {
        return true
      }
    }

    return false
  }

  private readonly addValue = (idx: number) => (state: TState): TState => {
    const currentPlayer = this.isXNext() ? "X" : "O";
    state.splice(idx, 1, currentPlayer);

    return state;
  }

  private get initialState(): TState {
    const initalState = new Array(9).fill(null)
    return initalState
  }


  private readonly resetBoard = () => (): TState => {
    return this.initialState
  }

  private readonly isKeyAllowed = (event: KeyboardEvent) => {
    const key = Number(event.key);

    if (key >= 0 && key <= 9) {
      return true
    }

    return false
  }

  private readonly keypress = (event: KeyboardEvent) => (state: TState): TState => {
    let key = Number(event.key);
    if (key === 0) {
      return this.resetBoard()()
    }

    key = key - 1

    const keyIdxValue = state[key]
    if (keyIdxValue !== null) {
      return state
    }

    return this.addValue(key)(state)
  }

  get board() {
    return this.board$
  }

  private caclulateTotalCount(state: TState) {
    return state.filter(Boolean).length
  }

  readonly resetBoard$ = new Subject<void>()
  readonly addValue$ = new Subject<number>()
  readonly keypress$ = fromEvent<KeyboardEvent>(document, "keydown").pipe<KeyboardEvent, KeyboardEvent>(filter(this.isKeyAllowed), tap(event => event.preventDefault()))

  private readonly board$ = new BehaviorSubject<TState>(this.initialState)
    .pipe(map(() => (_state: TState) => _state))
    .pipe(
      mergeWith(
        this.keypress$.pipe(map(this.keypress)),
        this.addValue$.pipe(map(this.addValue)),
        this.resetBoard$.pipe(map(this.resetBoard))
      )
    )
    .pipe(
      scan((state, stateHandlerFN) => stateHandlerFN(state), this.initialState),
    ).pipe(shareReplay(1))


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private readonly isXNext$ = new BehaviorSubject<boolean>(true).pipe(mergeWith(this.board$)).pipe(scan((_prev, _current) => !_prev, true))
  readonly isXNext = toSignal(this.isXNext$)

  readonly totalCount$ = this.board$.pipe(
    map(this.caclulateTotalCount),
    shareReplay(1),
  )

  readonly isXWinner$ = this.board$.pipe(
    skipWhile(state => this.caclulateTotalCount(state) <= 4),
    scan((_prev, current) => this.checkWinner(current, "X"), false),
    shareReplay(1),
  )
  readonly isOWinner$ = this.board$.pipe(
    skipWhile(state => this.caclulateTotalCount(state) <= 4),
    scan((_prev, current) => this.checkWinner(current, "O"), false),
    shareReplay(1),
  )

  readonly isGameOver$ = combineLatest(
    [this.isXWinner$, this.isOWinner$, this.totalCount$.pipe(map(value => value === 9))]
  ).pipe(map((values) => values.some(Boolean)))
    .pipe(shareReplay(1))
}

