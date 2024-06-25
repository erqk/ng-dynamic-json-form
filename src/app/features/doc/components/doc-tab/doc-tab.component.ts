import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, inject } from '@angular/core';

@Component({
  selector: 'app-doc-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doc-tab.component.html',
  styleUrls: ['./doc-tab.component.scss'],
})
export class DocTabComponent {
  private _el = inject(ElementRef);
  private _renderer2 = inject(Renderer2);
  private _resizeObserver?: ResizeObserver;

  children: HTMLElement[] = [];
  tabs: string[] = [];
  activeTab = '';

  ngAfterViewInit(): void {
    const host = this._el.nativeElement as HTMLElement;
    this.children = Array.from(host.querySelectorAll(':scope > .content > *'));
    this.children.forEach((x, i) => {
      const name = x.getAttribute('name');
      if (!name) return;
      this.tabs.push(name);
      i === 0 && this.toggleTab(name);
    });
    this._listenChildrenMutation();
  }

  ngOnDestroy(): void {
    this._resizeObserver?.disconnect();
  }

  toggleTab(name: string): void {
    this.activeTab = name;
    this.children.forEach((x) => {
      if (!x.getAttribute('name')) return;

      const selectedTab = x.getAttribute('name') === name;

      if (selectedTab) {
        x.classList.add('block');
        x.classList.remove('hidden');
        this._updateContainerHeight();
      } else {
        x.classList.add('hidden');
        x.classList.remove('block');
      }
    });
  }

  private _listenChildrenMutation(): void {

    const resizeCallback: ResizeObserverCallback = () => {
      this._updateContainerHeight();
    };

    this._resizeObserver = new ResizeObserver(resizeCallback);
    this.children.forEach((child) => {
      this._resizeObserver?.observe(child);
    });
  }

  private _updateContainerHeight(): void {
    const hostEl = this._el.nativeElement as HTMLElement;
    const contentEl = hostEl.querySelector('.content');
    const selectedTab = this.children.find(
      (x) => x.getAttribute('name') === this.activeTab
    );

    if (!selectedTab) return;

    this._renderer2.setStyle(
      contentEl,
      'height',
      selectedTab.scrollHeight + 'px'
    );
  }
}
