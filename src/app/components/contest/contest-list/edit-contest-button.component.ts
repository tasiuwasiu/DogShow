import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {Router} from '@angular/router';
import {AuthorizationService} from '../../../services/Authorization/authorization.service';
import {AppStates} from '../../../helpers/AppStates.enum';
import {AppSettingsService} from '../../../services/AppSettings/appsettings.service';

@Component({
  selector: 'app-edit-contest-button-view',
  template: `
    <button *ngIf="isVisible" type="button" class="btn btn-warning  text-white" (click)="onClick()">Edytuj</button>
  `,
})
export class EditContestButtonComponent implements ViewCell, OnInit {

  constructor(private router: Router,
              private authorizationService: AuthorizationService,
              private appSettingsService: AppSettingsService) {}

  @Input() value: string | number;
  @Input() rowData: any;
  isVisible: boolean;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.isVisible = this.authorizationService.hasPermission('2') && this.appSettingsService.appState === AppStates.canEnter
      && this.rowData.contestId !== -1;
  }

  onClick() {
    this.router.navigate(['/contest/edit', this.rowData.contestTypeId]);
  }

}
