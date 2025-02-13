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
  @Input() item: TPlayer | null = null
  @Input() index: number = 0
  protected readonly bs = inject(BoardService)
}
