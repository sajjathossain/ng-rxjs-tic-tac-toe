import { Component, inject } from '@angular/core';
import { AsyncPipe, } from '@angular/common';
import { BoardService } from './shared/';
import { NotificationComponent } from '#components/notification/notification.component';
import { PlayerButtonComponent } from '#components/player-button/player-button.component';
import { CurrentPlayerComponent } from "./components/current-player/current-player.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NotificationComponent, PlayerButtonComponent, CurrentPlayerComponent],
  providers: [BoardService, AsyncPipe],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private readonly bs = inject(BoardService)
  private readonly ap = inject(AsyncPipe)

  get currentPlayer() {
    return this.bs.currentPlayer()
  }

  get isGameOver() {
    return this.ap.transform(this.bs.isGameOver)
  }

  get isXWinner() {
    return this.ap.transform(this.bs.isXWinner)
  }

  get isOWinner() {
    return this.ap.transform(this.bs.isOWinner)
  }

  get board() {
    return this.ap.transform(this.bs.board)
  }
}

