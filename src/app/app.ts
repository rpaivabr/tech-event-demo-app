import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { AttendeeList } from './components/attendee-list/attendee-list';

@Component({
  imports: [RouterOutlet, Header, AttendeeList],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  title = 'world!';
}
