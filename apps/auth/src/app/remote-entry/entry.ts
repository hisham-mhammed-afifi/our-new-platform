import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-entry',
  imports: [TranslateModule],
  template: `
    <h2>{{ 'auth.title' | translate }}</h2>
    <p>{{ 'auth.desc' | translate }}</p>
  `,
})
export class RemoteEntry {}
