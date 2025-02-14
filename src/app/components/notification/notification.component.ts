import { Component, inject } from '@angular/core';
import { BoardConsumerService } from '#shared/services/board-consumer.service';

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
  protected readonly bc = inject(BoardConsumerService)
}
