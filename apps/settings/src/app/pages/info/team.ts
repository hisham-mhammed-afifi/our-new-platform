import { Component } from '@angular/core';

@Component({
  selector: 'app-info-team',
  templateUrl: './team.html',
  styleUrl: './team.scss',
})
export class TeamComponent {
  members = [
    { name: 'Alice Johnson', initials: 'AJ', role: 'Tech Lead', color: '#4f46e5' },
    { name: 'Bob Smith', initials: 'BS', role: 'Frontend Engineer', color: '#0891b2' },
    { name: 'Carol Lee', initials: 'CL', role: 'UX Designer', color: '#c026d3' },
    { name: 'Dan Brown', initials: 'DB', role: 'Backend Engineer', color: '#16a34a' },
  ];
}
