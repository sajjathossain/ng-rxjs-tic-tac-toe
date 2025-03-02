import { BoardService } from '#shared/services';
import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-current-player',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, NgIf],
  providers: [AsyncPipe],
  templateUrl: './current-player.component.html',
})
export class CurrentPlayerComponent {
  readonly bs = inject(BoardService)
}
