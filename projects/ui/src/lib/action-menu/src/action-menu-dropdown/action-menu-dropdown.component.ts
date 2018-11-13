import {
  Component,
  Input,
  ComponentRef,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  OnDestroy,
  AfterViewInit,
  HostListener
} from '@angular/core';
import { DefaultPositionConfig } from '../action-menu-config';

@Component({
  selector: 'once-action-menu-dropdown',
  templateUrl: './action-menu-dropdown.component.html',
  styleUrls: ['./action-menu-dropdown.component.scss']
})
export class ActionMenuDropdownComponent implements AfterViewInit, OnDestroy {
  constructor(private cdr: ChangeDetectorRef) {}

  @ViewChild('container')
  container: ElementRef;
  @Input()
  hostElement: HTMLElement;
  @Input()
  isVertical: boolean;
  @Input()
  defaultPosition: string;
  @Input()
  items: any;
  @Input()
  actionItem: any;
  @Input()
  timeOutEvent: any;
  @Input()
  componentRef: ComponentRef<ActionMenuDropdownComponent>;
  @Input()
  visible: boolean;
  @Input()
  targetOffset: any;

  @HostListener('window:resize')
  onResize() {
    this.show();
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    this.show();
    this.cdr.detectChanges();
  }

  show(): void {
    if (!this.hostElement) {
      return;
    }
    this.hostElement.classList.add('action-menu-open');

    if (this.container) {
      this.isVertical
        ? this.verticalPosition(this.container.nativeElement, this.targetOffset)
        : this.horizontalPosition(
            this.container.nativeElement,
            this.targetOffset
          );
    }
  }

  private horizontalPosition(element, targetOffset) {
    let right, left, top, bottom;
    const elementOuterWidth = element.offsetWidth;
    const elementOuterHeight = element.clientHeight;
    const viewport = this.getViewport();
    right = targetOffset.left + viewport.left + 'px';
    left = targetOffset.right - elementOuterWidth + viewport.left + 'px';
    top = targetOffset.bottom + viewport.top + 'px';
    bottom = targetOffset.top - elementOuterHeight + viewport.top + 'px';

    switch (this.defaultPosition) {
      case DefaultPositionConfig.left_bottom:
        this.showLeft(targetOffset, elementOuterWidth, element, left, right);
        this.showBottom(
          targetOffset,
          elementOuterHeight,
          viewport,
          element,
          bottom,
          top
        );
        break;
      case DefaultPositionConfig.left_top:
        this.showLeft(targetOffset, elementOuterWidth, element, left, right);
        this.showTop(targetOffset, elementOuterHeight, element, bottom, top);
        break;
      case DefaultPositionConfig.right_bottom:
        this.showRight(
          targetOffset,
          elementOuterWidth,
          viewport,
          element,
          left,
          right
        );
        this.showBottom(
          targetOffset,
          elementOuterHeight,
          viewport,
          element,
          bottom,
          top
        );
        break;
      case DefaultPositionConfig.right_top:
        this.showRight(
          targetOffset,
          elementOuterWidth,
          viewport,
          element,
          left,
          right
        );
        this.showTop(targetOffset, elementOuterHeight, element, bottom, top);
        break;
    }
  }

  private verticalPosition(element, targetOffset) {
    let right, left, top, bottom;
    const elementOuterWidth = element.offsetWidth;
    const elementOuterHeight = element.clientHeight;
    const viewport = this.getViewport();
    right = targetOffset.right + viewport.left + 'px';
    left = targetOffset.left - elementOuterWidth + viewport.left + 'px';
    top = targetOffset.bottom - targetOffset.height + viewport.top + 'px';
    bottom =
      targetOffset.top +
      targetOffset.height -
      elementOuterHeight +
      viewport.top +
      'px';

    switch (this.defaultPosition) {
      case DefaultPositionConfig.left_bottom:
        this.showLeft(targetOffset, elementOuterWidth, element, left, right);
        this.showBottom(
          targetOffset,
          elementOuterHeight,
          viewport,
          element,
          bottom,
          top
        );
        break;
      case DefaultPositionConfig.left_top:
        this.showLeft(targetOffset, elementOuterWidth, element, left, right);
        this.showTop(targetOffset, elementOuterHeight, element, bottom, top);
        break;
      case DefaultPositionConfig.right_bottom:
        this.showRight(
          targetOffset,
          elementOuterWidth,
          viewport,
          element,
          left,
          right
        );
        this.showBottom(
          targetOffset,
          elementOuterHeight,
          viewport,
          element,
          bottom,
          top
        );
        break;
      case DefaultPositionConfig.right_top:
        this.showRight(
          targetOffset,
          elementOuterWidth,
          viewport,
          element,
          left,
          right
        );
        this.showTop(targetOffset, elementOuterHeight, element, bottom, top);
        break;
    }
  }

  private showLeft(targetOffset, elementOuterWidth, element, left, right) {
    const cannotShowOnLeft = this.isVertical
      ? targetOffset.left - elementOuterWidth < 0
      : targetOffset.right - elementOuterWidth < 0;
    if (cannotShowOnLeft) {
      this.showOnRight(element, right);
    } else {
      this.showOnLeft(element, left);
    }
  }

  private showRight(
    targetOffset,
    elementOuterWidth,
    viewport,
    element,
    left,
    right
  ) {
    if (
      targetOffset.left + targetOffset.width + elementOuterWidth >
      viewport.width
    ) {
      this.showOnLeft(element, left);
    } else {
      this.showOnRight(element, right);
    }
  }

  private showBottom(
    targetOffset,
    elementOuterHeight,
    viewport,
    element,
    bottom,
    top
  ) {
    if (targetOffset.top + elementOuterHeight > viewport.height) {
      this.showOnTop(element, bottom);
    } else {
      this.showOnBottom(element, top);
    }
  }

  private showTop(targetOffset, elementOuterHeight, element, bottom, top) {
    if (targetOffset.bottom - elementOuterHeight < 0) {
      this.showOnBottom(element, top);
    } else {
      this.showOnTop(element, bottom);
    }
  }

  private showOnTop(element, bottom) {
    element.style.top = bottom;
  }

  private showOnBottom(element, top) {
    element.style.top = top;
  }

  private showOnLeft(element, left) {
    element.style.left = left;
  }

  private showOnRight(element, right) {
    element.style.left = right;
  }

  private getViewport(): any {
    const win = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      w = win.innerWidth || e.clientWidth || g.clientWidth,
      h = win.innerHeight || e.clientHeight || g.clientHeight,
      l = (win.pageXOffset || e.scrollLeft) - (e.clientLeft || 0),
      t = (win.pageYOffset || e.scrollTop) - (e.clientTop || 0);

    return { width: w, height: h, left: l, top: t };
  }

  onItemClick(event) {
    event.stopPropagation();
    this.destroyActionMenuDropdown();
  }

  actionMenuMouseenter() {
    clearTimeout(this.timeOutEvent);
    this.timeOutEvent = null;
    this.cdr.detectChanges();
  }

  actionMenuMouseleave() {
    this.timeOutEvent = setTimeout(() => {
      this.destroyActionMenuDropdown();
      this.cdr.detectChanges();
    }, 1000);
  }

  destroyActionMenuDropdown() {
    if (this.componentRef) {
      this.visible = false;
      this.componentRef.destroy();
    }
  }

  ngOnDestroy() {
    this.hostElement.classList.remove('action-menu-open');
  }
}
