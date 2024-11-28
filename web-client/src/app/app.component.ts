import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    // Use Renderer2 to append an element to the html element
    const newElement = this.renderer.createElement('html');
    this.renderer.appendChild(document.body, newElement);
  }

  title = 'synto';
}
