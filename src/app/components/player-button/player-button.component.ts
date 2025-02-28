import { BoardService } from '#shared/services';
import { TPlayer } from '#shared/types';
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

@Component({
  selector: 'app-player-button',
  standalone: true,
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './player-button.component.html',
})
export class PlayerButtonComponent {
  readonly item = input<TPlayer | null>(null);
  readonly index = input(0);

  private readonly bs = inject(BoardService)

  protected addValue() {
    this.bs.addValue$.next(this.index())
  }
}
