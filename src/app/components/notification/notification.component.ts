import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { BoardService } from '#shared/services';

@Component({
  imports: [NgIf],
  providers: [AsyncPipe],
  selector: 'app-notification',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      @apply absolute w-full h-full top-0 left-0 z-10 bg-gray-700/20 backdrop-blur-sm rounded-md outline outline-indigo-500
    }
  `,
  templateUrl: './notification.component.html',
})
export class NotificationComponent {
  protected readonly bs = inject(BoardService)
  protected readonly ap = inject(AsyncPipe)

  protected readonly isXWinner = this.ap.transform(this.bs.isXWinner$)
  protected readonly isOWinner = this.ap.transform(this.bs.isOWinner$)
  protected readonly isGameOver = this.ap.transform(this.bs.isGameOver$)

  resetBoard() {
    this.bs.resetBoard$.next()
  }
}
