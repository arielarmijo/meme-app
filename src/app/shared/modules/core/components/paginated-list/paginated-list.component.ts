import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

// https://blog.bitsrc.io/component-reusability-techniques-with-angular-727a6c603ad2
@Component({
  selector: 'app-paginated-list',
  templateUrl: './paginated-list.component.html',
  styleUrls: [ './paginated-list.component.css' ]
})
export class PaginatedListComponent implements OnInit {

  @Input() items!: any[];
  @Input() itemsPerPage?: number;
  @Input() currentPage = 0;

  @ContentChild('item', { static: false }) itemTemplate!: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
    this.itemsPerPage = this.itemsPerPage ?? this.items.length;
  }

  get start() {
    return this.currentPage * (this.itemsPerPage as number);
  }

  get end() {
    return this.start + (this.itemsPerPage as number);
  }

}