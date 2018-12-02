import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {MessageService} from '../../../services/Message/message.service';
import {ContestService} from '../../../services/Contest/contest.service';
import {AuthorizationService} from '../../../services/Authorization/authorization.service';

@Component({
  selector: 'app-delete-place-button-view',
  template: `
    <button *ngIf="isVisible" type="button" class="btn btn-danger text-white" (click)="onClick()">Usuń</button>
  `,
})
export class DeleteContestButtonComponent implements ViewCell, OnInit {

  constructor(private messageService: MessageService,
              private contestService: ContestService,
              private authorizationService: AuthorizationService) {  }

  @Input() value: string | number;
  @Input() rowData: any;
  isVisible: boolean;

  @Output() deletedItem: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.isVisible = this.authorizationService.hasPermission('2');
  }

  onClick() {
    if (confirm('Czy na pewno chcesz usunąć konkurs: ' + this.rowData.name + ' ?')) {
      this.contestService.deleteContest(this.rowData.contestTypeId).subscribe(
        data => {
          this.messageService.addSuccess('Usunięto!');
          this.deletedItem.emit(this.rowData.contestTypeId);
        },
        error => {
          if (error.error && error.error.message) {
            this.messageService.addError(error.error.message);
          } else if (error.status !== null && error.status === 0) {
            this.messageService.addError('Brak połączenia z serwerem API!');
          } else {
            this.messageService.addError('Błąd usuwania konkursu!');
          }
        }
      );
    }
  }
}
