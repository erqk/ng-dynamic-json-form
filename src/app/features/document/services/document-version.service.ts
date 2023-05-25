import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class DocumentVersionService {
  versions = ['3', '2', '1'];

  currentVersion$ = new BehaviorSubject<string>(this.versions[0]);
}
