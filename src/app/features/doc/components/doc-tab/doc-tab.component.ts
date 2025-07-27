import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'app-doc-tab',
  imports: [CommonModule],
  templateUrl: './doc-tab.component.html',
  styleUrls: ['./doc-tab.component.scss'],
})
export class DocTabComponent {
  private el = inject(ElementRef);
  private resizeObserver?: ResizeObserver;

  children: HTMLElement[] = [];
  tabs: string[] = [];
  activeTab = '';

  ngOnInit(): void {
    const host = this.el.nativeElement as HTMLElement;
    this.children = Array.from(host.querySelectorAll(':scope > .content > *'));
    this.children.forEach((x, i) => {
      const name = x.getAttribute('name');
      if (!name) return;
      this.tabs.push(name);
      i === 0 && this.toggleTab(name);
    });
    this.listenChildrenMutation();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  toggleTab(name: string): void {
    this.activeTab = name;
    this.children.forEach((x) => {
      if (!x.getAttribute('name')) return;

      const selectedTab = x.getAttribute('name') === name;

      if (selectedTab) {
        x.classList.add('block');
        x.classList.remove('hidden');
        this.updateContainerHeight();
      } else {
        x.classList.add('hidden');
        x.classList.remove('block');
      }
    });
  }

  private listenChildrenMutation(): void {
    const resizeCallback: ResizeObserverCallback = () => {
      this.updateContainerHeight();
    };

    this.resizeObserver = new ResizeObserver(resizeCallback);
    this.children.forEach((child) => {
      this.resizeObserver?.observe(child);
    });
  }

  private updateContainerHeight(): void {
    const hostEl = this.el.nativeElement as HTMLElement;
    const contentEl = hostEl.querySelector('.content') as HTMLElement | null;
    const selectedTab = this.children.find(
      (x) => x.getAttribute('name') === this.activeTab,
    );

    if (!selectedTab) return;

    contentEl?.style.setProperty('height', selectedTab.scrollHeight + 'px');
  }
}
