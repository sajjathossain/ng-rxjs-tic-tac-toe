import { Component, inject } from '@angular/core';
import { BoardService } from '../../shared';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [AsyncPipe],
  styles: `
    :host {
      @apply absolute w-full h-full top-0 left-0 z-10 bg-gray-700 backdrop-blur-md
    }
  `,
  templateUrl: './notification.component.html',
})
export class NotificationComponent {

  protected readonly bs = inject(BoardService)

}
