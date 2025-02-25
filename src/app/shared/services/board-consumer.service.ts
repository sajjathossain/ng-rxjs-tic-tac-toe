import { AsyncPipe } from "@angular/common";
import { inject, Injectable } from "@angular/core";
import { BoardService } from "./board.service";

@Injectable({
  providedIn: 'root',
})
export class BoardConsumerService {
  private readonly ap = inject(AsyncPipe)
  private readonly bs = inject(BoardService)

  get isXWinner() {
    return this.ap.transform(this.bs.isXWinner$)
  }

  get isOWinner() {
    return this.ap.transform(this.bs.isOWinner$)
  }

  get isGameOver() {
    return this.ap.transform(this.bs.isGameOver$)
  }

  resetBoard() {
    this.bs.resetBoard$.next()
  }

  get board() {
    return this.ap.transform(this.bs.board)
  }

  get currentPlayer() {
    return this.bs.isXNext() ? "X" : "O"
  }

  addValue(idx: number) {
    this.bs.addValue$.next(idx)
  }
}
