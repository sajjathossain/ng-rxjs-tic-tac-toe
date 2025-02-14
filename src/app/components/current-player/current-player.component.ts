import { BoardConsumerService } from '#shared/services/board-consumer.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-current-player',
  standalone: true,
  imports: [],
  templateUrl: './current-player.component.html',
})
export class CurrentPlayerComponent {
  readonly bc = inject(BoardConsumerService)
}
