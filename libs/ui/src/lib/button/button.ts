import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-button',
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input(false);
  variant = input<'primary' | 'secondary' | 'outline'>('primary');
  href = input<string>();
  routerLink = input<string | any[]>();
  target = input<string>();
}
