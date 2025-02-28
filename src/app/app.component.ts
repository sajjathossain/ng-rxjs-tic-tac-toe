import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { NotificationComponent } from '#components/notification/notification.component';
import { PlayerButtonComponent } from '#components/player-button/player-button.component';
import { CurrentPlayerComponent } from "./components/current-player/current-player.component";
import { BoardService } from '#shared/services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NotificationComponent, PlayerButtonComponent, CurrentPlayerComponent, NgIf, NgFor, AsyncPipe],
  providers: [BoardService, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
})
export class AppComponent {
  readonly bs = inject(BoardService)
  readonly ap = inject(AsyncPipe)
  readonly isXWinner = this.ap.transform(this.bs.isXWinner$)
  readonly isOWinner = this.ap.transform(this.bs.isOWinner$)
}

