import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BoardService } from '#shared/services';

@Component({
  selector: 'app-notification',
  standalone: true,
  styles: `
    :host {
      @apply absolute w-full h-full top-0 left-0 z-10 bg-gray-700 backdrop-blur-md rounded-md
    }
  `,
  templateUrl: './notification.component.html',
})
export class NotificationComponent {
  private readonly bs = inject(BoardService)
  private readonly pipeSync = inject(AsyncPipe)

  get isXWinner() {
    return this.pipeSync.transform(this.bs.isXWinner)
  }

  get isOWinner() {
    return this.pipeSync.transform(this.bs.isOWinner)
  }

  get isGameOver() {
    return this.pipeSync.transform(this.bs.isGameOver)
  }

  protected resetBoard() {
    this.bs.resetBoard$.next()
  }

}
