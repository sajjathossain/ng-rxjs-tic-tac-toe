import { BoardConsumerService } from '#shared/services/board-consumer.service';
import { TPlayer } from '#shared/types';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

@Component({
  selector: 'app-player-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './player-button.component.html',
})
export class PlayerButtonComponent {
  readonly item = input<TPlayer | null>(null);
  readonly index = input(0);

  private readonly bc = inject(BoardConsumerService)

  protected addValue() {
    this.bc.addValue({ idx: this.index(), player: this.bc.currentPlayer })
  }
}
