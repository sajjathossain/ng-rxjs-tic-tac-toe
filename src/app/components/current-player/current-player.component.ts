import { BoardService } from '#shared/services';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-current-player',
  standalone: true,
  imports: [],
  templateUrl: './current-player.component.html',
})
export class CurrentPlayerComponent {
  private readonly bs = inject(BoardService)
  get currentPlayer() {
    return this.bs.currentPlayer()
  }

}
