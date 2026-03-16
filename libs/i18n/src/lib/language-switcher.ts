import { Component, inject } from '@angular/core';
import { LanguageService } from './language.service';

@Component({
  selector: 'lib-language-switcher',
  standalone: true,
  template: `
    <button class="lang-toggle" (click)="lang.toggle()" [attr.aria-label]="'Switch language'">
      {{ lang.currentLang() === 'en' ? 'AR' : 'EN' }}
    </button>
  `,
  styles: `
    .lang-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 2.25rem;
      padding: 0;
      border: 1px solid var(--ds-color-border);
      border-radius: 0.5rem;
      background-color: var(--ds-color-surface);
      color: var(--ds-color-text-muted);
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      cursor: pointer;
      transition: color var(--ds-transition-fast, 150ms ease),
                  background-color var(--ds-transition-fast, 150ms ease),
                  border-color var(--ds-transition-fast, 150ms ease);
    }

    .lang-toggle:hover {
      color: var(--ds-color-text);
      background-color: var(--ds-color-surface-hover);
      border-color: var(--ds-color-border-strong);
    }

    .lang-toggle:focus-visible {
      outline: 2px solid var(--ds-color-focus);
      outline-offset: 2px;
    }
  `,
})
export class LanguageSwitcherComponent {
  protected lang = inject(LanguageService);
}
