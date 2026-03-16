import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Button } from '@our/ui';

@Component({
  imports: [Button, RouterOutlet, TranslateModule],
  selector: 'app-settings-entry',
  templateUrl: './entry.html',
  styleUrl: './entry.scss',
})
export class RemoteEntry {}
