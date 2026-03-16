import { Component } from '@angular/core';

@Component({
  selector: 'app-info-contact',
  template: `
    <section class="contact">
      <h2>Contact Us</h2>

      <div class="contact-grid">
        <div class="contact-card">
          <h3>Email</h3>
          <p>support&#64;our-platform.dev</p>
        </div>
        <div class="contact-card">
          <h3>Office</h3>
          <p>123 Tech Street, San Francisco, CA 94105</p>
        </div>
        <div class="contact-card">
          <h3>Working Hours</h3>
          <p>Mon – Fri, 9:00 AM – 6:00 PM (PST)</p>
        </div>
      </div>
    </section>
  `,
  styles: `
    .contact h2 { margin-bottom: 1rem; }
    .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
    .contact-card {
      padding: 1.25rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      background: #fafafa;
    }
    .contact-card h3 { margin: 0 0 0.5rem; font-size: 0.95rem; color: #4f46e5; }
    .contact-card p { margin: 0; color: #555; font-size: 0.875rem; }
  `,
})
export class ContactComponent {}
