import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-info',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './info.html',
  styleUrl: './info.scss',
})
export class InfoComponent {}
