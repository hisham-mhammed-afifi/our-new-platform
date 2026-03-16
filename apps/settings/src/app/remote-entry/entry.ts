import { Component } from '@angular/core';
import { Button } from '@our/ui';

@Component({
  imports: [Button],
  selector: 'app-settings-entry',
  template: `
    <lib-button>Settings Button</lib-button>
    <p>Settings works!</p>
  `,
})
export class RemoteEntry {}
