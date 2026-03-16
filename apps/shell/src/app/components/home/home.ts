import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '@our/ui';

@Component({
  selector: 'app-home',
  imports: [Button, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {}
