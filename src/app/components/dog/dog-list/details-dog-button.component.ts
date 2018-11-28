import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {Router} from '@angular/router';


@Component({
  selector: 'app-details-dog-button-view',
  template: `
    <button type="button" class="btn btn-success  text-white" (click)="onClick()">Szczegóły</button>
  `,
})
export class DetailsDogButtonComponent implements ViewCell, OnInit {

  constructor(private router: Router) {}

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  onClick() {
    this.router.navigate(['/dog/details', this.rowData.dogId]);
  }

}
