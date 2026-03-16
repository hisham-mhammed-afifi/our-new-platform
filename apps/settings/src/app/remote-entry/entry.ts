import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Button } from '@our/ui';

@Component({
  imports: [Button, RouterLink, RouterOutlet],
  selector: 'app-settings-entry',
  template: `
    <lib-button>Settings Button</lib-button>
    <p>Settings works!</p>
    <a routerLink="info">Go to Info</a>
    <router-outlet />
  `,
})
export class RemoteEntry {}
