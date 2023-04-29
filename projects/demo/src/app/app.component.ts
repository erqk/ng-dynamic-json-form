import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'NgDynamicJsonForm Demo';

  links: {
    route: string;
    label: string;
  }[] = [
    {
      route: 'getting-started',
      label: 'Getting started'
    },
    {
      route: 'api',
      label: 'API'
    },
    {
      route: 'styling',
      label: 'Styling'
    },
    {
      route: 'playground',
      label: 'Playground'
    }
  ]
}
