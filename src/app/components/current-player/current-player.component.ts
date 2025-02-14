import { BoardConsumerService } from '#shared/services/board-consumer.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-current-player',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './current-player.component.html',
})
export class CurrentPlayerComponent {
  readonly bc = inject(BoardConsumerService)
}
