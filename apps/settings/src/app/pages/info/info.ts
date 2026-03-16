import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-info',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="info-layout">
      <h1>Info</h1>
      <nav class="info-nav">
        <a routerLink="./" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Overview</a>
        <a routerLink="team" routerLinkActive="active">Team</a>
        <a routerLink="contact" routerLinkActive="active">Contact</a>
      </nav>
      <div class="info-content">
        <router-outlet />
      </div>
    </div>
  `,
  styles: `
    .info-layout { padding: 1.5rem; }
    .info-layout h1 { margin: 0 0 1rem; font-size: 1.5rem; }
    .info-nav {
      display: flex;
      gap: 0.25rem;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
    }
    .info-nav a {
      padding: 0.5rem 1rem;
      text-decoration: none;
      color: #555;
      font-size: 0.875rem;
      border-bottom: 2px solid transparent;
      transition: color 0.15s, border-color 0.15s;
    }
    .info-nav a:hover { color: #1f2937; }
    .info-nav a.active {
      color: #4f46e5;
      border-bottom-color: #4f46e5;
    }
    .info-content { padding-top: 0.5rem; }
  `,
})
export class InfoComponent {}
