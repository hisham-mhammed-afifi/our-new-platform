import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Button } from '@our/ui';

@Component({
  selector: 'app-home',
  imports: [Button, RouterLink, TranslateModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {}
