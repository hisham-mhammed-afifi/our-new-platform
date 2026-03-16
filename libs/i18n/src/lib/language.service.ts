import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private translate = inject(TranslateService);

  /** Reactive signal for the current language code. */
  currentLang = signal(this.translate.defaultLang || 'en');

  constructor() {
    this.applyDir(this.currentLang());
  }

  /**
   * Switch the active language across the entire application.
   * Updates the translate service, HTML dir attribute, and lang attribute.
   */
  switchLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLang.set(lang);
    this.applyDir(lang);
  }

  /** Toggle between 'en' and 'ar'. */
  toggle(): void {
    this.switchLanguage(this.currentLang() === 'en' ? 'ar' : 'en');
  }

  private applyDir(lang: string): void {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }
}
