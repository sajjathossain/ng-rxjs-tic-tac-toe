import { BoardService } from '#shared/services';
import { TPlayer } from '#shared/types';
import { Component, inject, Input } from '@angular/core';

@Component({
  selector: 'app-player-button',
  standalone: true,
  imports: [],
  templateUrl: './player-button.component.html',
})
export class PlayerButtonComponent {
  @Input("item") item: TPlayer | null = null
  @Input("index") index: number = 0

  private readonly bs = inject(BoardService)

  protected addValue() {
    this.bs.addValue$.next({ idx: this.index, player: this.bs.currentPlayer() })
  }
}
