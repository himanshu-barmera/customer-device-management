import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  // exportAs: 'appDropdown'
})
export class DropdownDirective {

  // @HostBinding('class.d-block') isOpen: boolean = false;
  // constructor(
  //   private eleRef: ElementRef
  // ) { }

  // ngOnInit(): void { }

  // @HostListener('document:click', ['$event'])
  // onClick(event: Event) {

  //   console.log(event)
  //   console.log(this.eleRef.nativeElement)
  //   console.log(this.eleRef.nativeElement.contains(event.target))
  //   this.isOpen = this.eleRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  // }


  constructor(private _elementRef: ElementRef) { }

  @Output()
  clickOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit(event);
    }
  }
}
