import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {Router} from '@angular/router';
import {AuthorizationService} from '../../../services/Authorization/authorization.service';

@Component({
  selector: 'app-grade-contest-button-view',
  template: `
    <button *ngIf="isVisible" type="button" class="btn btn-primary  text-white" (click)="onClick()">Oceń</button>
  `,
})
export class GradeContestButtonComponent implements ViewCell, OnInit {

  constructor(private router: Router,
              private authorizationService: AuthorizationService) {}

  @Input() value: string | number;
  @Input() rowData: any;
  isVisible: boolean;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.isVisible = this.authorizationService.hasPermission('3');
  }

  onClick() {
    this.router.navigate(['/contest/grade', this.rowData.contestTypeId]);
  }

}
