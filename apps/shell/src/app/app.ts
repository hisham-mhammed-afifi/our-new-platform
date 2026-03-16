import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '@our/i18n';

@Component({
  imports: [RouterModule, TranslateModule, LanguageSwitcherComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'shell';
  protected isDark = signal(
    document.documentElement.getAttribute('data-theme') === 'dark' ||
    (!document.documentElement.getAttribute('data-theme') &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  toggleTheme() {
    this.isDark.update((v) => !v);
    document.documentElement.setAttribute('data-theme', this.isDark() ? 'dark' : 'light');
  }
}
