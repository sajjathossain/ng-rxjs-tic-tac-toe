import { TPlayer, TState } from "#shared/types";
import { Injectable, signal } from "@angular/core";
import { BehaviorSubject, combineLatest, fromEvent, Subject } from "rxjs";
import { distinctUntilChanged, filter, map, mergeWith, scan, shareReplay, tap } from "rxjs/operators";

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
      const [pos1, pos2, pos3] = combination
      if (board[pos1] === player && board[pos2] === player && board[pos3] === player) {
        return true
      }
    }

    return false
  }

  private changePlayer() {
    this.currentPlayer.update((currentPlayer) => currentPlayer === "X" ? "O" : "X");
    this.totalCount.next(this.totalCount.value + 1);
  }

  private readonly lastestAddValue = (payload: { idx: number, player: TPlayer }) => (state: TState): TState => {
    const { idx, player } = payload;
    const currentValues = state;
    const currentPlayer = player;
    currentValues.splice(idx, 1, currentPlayer);
    this.changePlayer()

    return currentValues;
  }

  private get initialState(): TState {
    const initalState = new Array(9).fill(null)
    return initalState
  }

  private readonly resetBoard = (_event: void) => (_state: TState): TState => {
    this.totalCount.next(0);
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
      return this.resetBoard()(state)
    }

    key = key - 1

    const keyIdxValue = state[key]
    if (keyIdxValue !== null) {
      return state
    }

    state.splice(key, 1, this.currentPlayer())
    this.changePlayer()
    return state
  }

  get board() {
    return this.board$
  }

  private boardValues$ = new BehaviorSubject<TState>(this.initialState);

  readonly currentPlayer = signal<TPlayer>("X");
  readonly resetBoard$ = new Subject<void>()
  readonly addValue$ = new Subject<{ idx: number, player: TPlayer }>()
  readonly keypress$ = fromEvent<KeyboardEvent>(document, "keydown").pipe<KeyboardEvent, KeyboardEvent>(filter(this.isKeyAllowed), tap(event => event.preventDefault()))

  private readonly board$ = this.boardValues$.pipe(map((values) => (_state: TState) => values)).pipe(mergeWith(this.keypress$.pipe(map(this.keypress)), this.addValue$.pipe(map(this.lastestAddValue), distinctUntilChanged()), this.resetBoard$.pipe(map(this.resetBoard))), scan((state: TState, stateHandlerFN) => stateHandlerFN(state), this.initialState), shareReplay())

  readonly isXWinner = this.board$.pipe(map(values => this.totalCount.value >= 4 && this.currentPlayer() === "O" ? this.checkWinner(values, "X") : false))
  readonly isOWinner = this.board$.pipe(map(values => this.totalCount.value >= 4 && this.currentPlayer() === "X" ? this.checkWinner(values, "O") : false))

  readonly totalCount = new BehaviorSubject<number>(0)
  readonly isGameOver = combineLatest([this.isXWinner, this.isOWinner, this.totalCount.pipe(map(value => value === 9))]).pipe(map((values) => values.some(Boolean)))
}

