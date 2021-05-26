import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  @Output() pageChanged = new EventEmitter<number>();
  @Input() totalCount!: number;
  @Input() pageSize!: number;

  constructor() { }

  ngOnInit(): void {
  }

  onPagerChange(event: any)
  {
     this.pageChanged.emit(event.page);
  }

}
