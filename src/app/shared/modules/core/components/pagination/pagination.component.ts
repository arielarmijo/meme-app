import { Component, EventEmitter, Input, Output } from '@angular/core';

// https://blog.bitsrc.io/component-reusability-techniques-with-angular-727a6c603ad2
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: [ './pagination.component.css']
})
export class PaginationComponent {

  @Input() itemsLength!: number;
  @Input() itemsPerPage!: number;
  @Input() currentPage!: number;

  @Output() pageChanged = new EventEmitter<number>();

  constructor() { }

  get pages() {
    const size = Math.ceil(this.itemsLength/this.itemsPerPage);
    const pages = new Array(size);
    return pages.fill(0).map((e, i) => i);
  }

}