import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SideNavigationPaneService {
  h2$ = new BehaviorSubject<Element[]>([]);
}
