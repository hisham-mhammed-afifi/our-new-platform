import { Component } from '@angular/core';
import { Button } from '@our/ui';

@Component({
  selector: 'app-info-overview',
  template: `
    <section class="overview">
      <lib-button routerLink="/">Home</lib-button>
      <h2>About Our Platform</h2>
      <p>
        A modern micro-frontend platform built with Angular and Module
        Federation. Designed for scalability, each feature runs as an
        independent remote application.
      </p>

      <div class="cards">
        <div class="card">
          <h3>Modular</h3>
          <p>Each feature is independently deployable and maintainable.</p>
        </div>
        <div class="card">
          <h3>Scalable</h3>
          <p>Add new remotes without touching the shell or other apps.</p>
        </div>
        <div class="card">
          <h3>Fast</h3>
          <p>Lazy-loaded routes ensure users only download what they need.</p>
        </div>
      </div>
    </section>
  `,
  styles: `
    .overview {
      max-width: 720px;
    }
    .overview h2 {
      margin-bottom: 0.5rem;
    }
    .overview > p {
      color: #555;
      margin-bottom: 1.5rem;
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
    }
    .card {
      padding: 1.25rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      background: #fafafa;
    }
    .card h3 {
      margin: 0 0 0.5rem;
      font-size: 1rem;
    }
    .card p {
      margin: 0;
      color: #666;
      font-size: 0.875rem;
    }
  `,
  imports: [Button],
})
export class OverviewComponent {}
