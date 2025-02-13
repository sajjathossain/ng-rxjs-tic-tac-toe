import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe, } from '@angular/common';
import { BoardService } from './board.service';
import { NotificationComponent } from './notification/notification.component';
import { PlayerButtonComponent } from './player-button/player-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, NotificationComponent, PlayerButtonComponent],
  providers: [BoardService],
  templateUrl: './app.component.html',
})
export class AppComponent {
  protected readonly bs = inject(BoardService)
}

