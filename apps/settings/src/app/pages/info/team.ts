import { Component } from '@angular/core';

@Component({
  selector: 'app-info-team',
  template: `
    <section class="team">
      <h2>Our Team</h2>
      <div class="members">
        @for (member of members; track member.name) {
          <div class="member-card">
            <div class="avatar">{{ member.initials }}</div>
            <h3>{{ member.name }}</h3>
            <p class="role">{{ member.role }}</p>
          </div>
        }
      </div>
    </section>
  `,
  styles: `
    .team h2 { margin-bottom: 1rem; }
    .members { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem; }
    .member-card {
      text-align: center;
      padding: 1.5rem 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      background: #fafafa;
    }
    .avatar {
      width: 48px; height: 48px;
      margin: 0 auto 0.75rem;
      border-radius: 50%;
      background: #4f46e5;
      color: #fff;
      display: flex; align-items: center; justify-content: center;
      font-weight: 600; font-size: 0.875rem;
    }
    .member-card h3 { margin: 0 0 0.25rem; font-size: 0.95rem; }
    .role { margin: 0; color: #888; font-size: 0.8rem; }
  `,
})
export class TeamComponent {
  members = [
    { name: 'Alice Johnson', initials: 'AJ', role: 'Tech Lead' },
    { name: 'Bob Smith', initials: 'BS', role: 'Frontend Engineer' },
    { name: 'Carol Lee', initials: 'CL', role: 'UX Designer' },
    { name: 'Dan Brown', initials: 'DB', role: 'Backend Engineer' },
  ];
}
