import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: '[upper]'
})
export class UppercaseDirective {
  constructor(
    private _el: ElementRef
  ) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    this._el.nativeElement.value = this._el.nativeElement.value.toUpperCase();
  }
}
