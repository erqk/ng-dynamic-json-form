import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-doc-code',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doc-code.component.html',
  styleUrls: ['./doc-code.component.scss'],
})
export class DocCodeComponent implements OnInit {
  private _el = inject(ElementRef);
  private _renderer2 = inject(Renderer2);

  children: HTMLElement[] = [];
  tabs: string[] = [];
  activeTab = '';

  ngOnInit(): void {
    const host = this._el.nativeElement as HTMLElement;
    this.children = Array.from(host.querySelectorAll('* > pre, * > .item'));
    this.children.forEach((x, i) => {
      const name = x.getAttribute('name');
      if (!name) return;
      this.tabs.push(name);
      i === 0 && this.toggleTab(name);
    });
  }

  toggleTab(name: string): void {
    const hostEl = this._el.nativeElement as HTMLElement;
    const contentEl = hostEl.querySelector('.content');

    this.activeTab = name;
    this.children.forEach((x) => {
      const selectedTab = x.getAttribute('name') === name;

      if (selectedTab) {
        x.classList.add('active');
        x.classList.remove('hidden');
        this._renderer2.setStyle(contentEl, 'height', x.scrollHeight + 'px');
      } else {
        x.classList.add('hidden');
        x.classList.remove('active');
      }
    });
  }

  copyToClipboard(): void {
    const target = this.children.find((x) => x.classList.contains('active'));
    const content = target?.innerText;

    if (typeof window === 'undefined') return;
    if (!content) return;

    window.navigator.clipboard.writeText(content);
  }
}
