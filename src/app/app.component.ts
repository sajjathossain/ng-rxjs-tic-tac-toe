import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NotificationComponent } from '#components/notification/notification.component';
import { PlayerButtonComponent } from '#components/player-button/player-button.component';
import { CurrentPlayerComponent } from "./components/current-player/current-player.component";
import { BoardConsumerService } from '#shared/services/board-consumer.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NotificationComponent, PlayerButtonComponent, CurrentPlayerComponent],
  providers: [BoardConsumerService, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
})
export class AppComponent {
  readonly bc = inject(BoardConsumerService)
}

