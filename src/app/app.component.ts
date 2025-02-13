import { Component, inject } from '@angular/core';
import { AsyncPipe, } from '@angular/common';
import { BoardService } from './shared/';
import { NotificationComponent } from './components/notification/notification.component';
import { PlayerButtonComponent } from './components/player-button/player-button.component';

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

