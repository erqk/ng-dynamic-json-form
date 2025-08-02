import {
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs';

@Directive({
  selector: '[activeRouteHighlight]',
  standalone: true,
})
export class ActiveRouteHighlightDirective implements OnInit {
  private destroyRef = inject(DestroyRef);
  private el = inject(ElementRef);
  private router = inject(Router);

  private mutationObserver?: MutationObserver;

  ngOnInit(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.mutationObserver = new MutationObserver(() => {
      this.highlightActiveRoute();
    });

    this.mutationObserver.observe(this.el.nativeElement, {
      childList: true,
    });

    this.router.events
      .pipe(
        filter((x) => x instanceof NavigationEnd),
        tap(() => this.highlightActiveRoute()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private highlightActiveRoute(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const host = this.el.nativeElement as HTMLElement;
    const routeClean = this.router.url.split('?')[0].split('#')[0];
    const links = Array.from(
      host.querySelectorAll('.docs-index-container a'),
    ) as HTMLAnchorElement[];

    links.forEach((el) => {
      const activeLink =
        el.href.split('/').pop() === routeClean.split('/').pop();

      activeLink ? el.classList.add('active') : el.classList.remove('active');
    });
  }
}
