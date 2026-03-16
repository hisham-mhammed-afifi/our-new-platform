import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-playground-entry',
  imports: [TranslateModule],
  template: `
    <h2>{{ 'playground.title' | translate }}</h2>
    <p>{{ 'playground.desc' | translate }}</p>
  `,
})
export class RemoteEntry {}
