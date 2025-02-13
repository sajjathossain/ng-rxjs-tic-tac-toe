import { Injectable, signal } from "@angular/core";
import { BehaviorSubject, combineLatest, Subject } from "rxjs";
import { distinctUntilChanged, map, mergeWith, scan, shareReplay } from "rxjs/operators";

export type TPlayer = "X" | "O";
export type TState = (TPlayer | null)[];

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

  private readonly lastestAddValue = (payload: { idx: number, player: TPlayer }) => (state: TState): TState => {
    const { idx, player } = payload;
    const currentValues = state;
    const currentPlayer = player;
    currentValues.splice(idx, 1, currentPlayer);
    this.currentPlayer.set(currentPlayer === "X" ? "O" : "X");
    this.totalCount.next(this.totalCount.value + 1);

    return currentValues;
  }

  private get initialState() {
    const initalState = new Array(9).fill(null)
    return initalState
  }

  private readonly resetBoard = (_event: void) => (_state: TState): TState => {
    this.totalCount.next(0);
    return this.initialState
  }

  protected get boardValues() {
    return this.board$
  }

  private boardValues$ = new BehaviorSubject<TState>(this.initialState);
  currentPlayer = signal<TPlayer>("X");
  resetBoard$ = new Subject<void>()
  addValue$ = new Subject<{ idx: number, player: TPlayer }>()

  board$ = this.boardValues$.pipe(mergeWith(this.addValue$.pipe(map(this.lastestAddValue), distinctUntilChanged()), this.resetBoard$.pipe(map(this.resetBoard))), scan((state: TState, stateHandlerFN) => typeof stateHandlerFN === "function" ? stateHandlerFN(state) : stateHandlerFN, this.initialState), shareReplay())


  isXWinner = this.board$.pipe(map(values => this.totalCount.value >= 4 ? this.checkWinner(values, "X") : false))
  isOWinner = this.board$.pipe(map(values => this.totalCount.value >= 4 ? this.checkWinner(values, "O") : false))

  totalCount = new BehaviorSubject<number>(0)
  isGameOver = combineLatest([this.isXWinner, this.isOWinner, this.totalCount.pipe(map(value => value === 9))]).pipe(map((values) => values.some(Boolean)))
}

