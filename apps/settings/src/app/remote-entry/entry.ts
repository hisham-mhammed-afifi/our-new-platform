import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from '@our/ui';

@Component({
  imports: [Button, RouterOutlet],
  selector: 'app-settings-entry',
  templateUrl: './entry.html',
  styleUrl: './entry.scss',
})
export class RemoteEntry {}
