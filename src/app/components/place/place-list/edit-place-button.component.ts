import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {Router} from '@angular/router';


@Component({
  selector: 'app-edit-place-button-view',
  template: `
    <button type="button" class="btn btn-warning  text-white" (click)="onClick()">Edytuj</button>
  `,
})
export class EditPlaceButtonComponent implements ViewCell, OnInit {

  constructor(private router: Router) {}

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  onClick() {
    this.router.navigate(['/place/edit', this.rowData.placeId]);
  }

}
