import { BoardService } from '#shared/services';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-current-player',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  providers: [AsyncPipe],
  templateUrl: './current-player.component.html',
})
export class CurrentPlayerComponent {
  readonly bs = inject(BoardService)
  readonly ap = inject(AsyncPipe)
  readonly currentPlayer = this.bs.isXNext() ? "X" : "O"
}
