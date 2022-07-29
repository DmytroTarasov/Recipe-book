import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    // here, we want to add an 'open' class to the dropdown when we click on this dropdown and remove it when we click on it again
    @HostBinding('class.open') isOpen = false;

    // the class 'open' will be attached and detached to the dropdown when we click on it 
    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }

    constructor() { }

}
