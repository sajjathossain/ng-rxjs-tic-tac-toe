import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BoardConsumerService } from '#shared/services/board-consumer.service';
import { NgIf } from '@angular/common';

@Component({
  imports: [NgIf],
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
  protected readonly bc = inject(BoardConsumerService)
}
