import { BoardConsumerService } from '#shared/services/board-consumer.service';
import { TPlayer } from '#shared/types';
import { Component, inject, Input } from '@angular/core';

@Component({
  selector: 'app-player-button',
  standalone: true,
  imports: [],
  templateUrl: './player-button.component.html',
})
export class PlayerButtonComponent {
  @Input() item: TPlayer | null = null
  @Input() index = 0

  private readonly bc = inject(BoardConsumerService)

  protected addValue() {
    this.bc.addValue({ idx: this.index, player: this.bc.currentPlayer })
  }
}
