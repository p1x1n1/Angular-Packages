import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PackagesComponent } from './packages/packages.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PackagesComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'packages-client';
}
