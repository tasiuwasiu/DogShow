import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {MessageService} from '../../../services/Message/message.service';
import {ContestService} from '../../../services/Contest/contest.service';

@Component({
  selector: 'app-delete-participation-button-view',
  template: `
    <button type="button" class="btn btn-danger text-white" (click)="onClick()">Usuń</button>
  `,
})
export class DeleteParticipationButtonComponent implements ViewCell, OnInit {

  constructor(private messageService: MessageService,
              private contestService: ContestService) {  }

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() deletedItem: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  onClick() {
    if (confirm('Czy na pewno chcesz wypisać psa z konkursu?')) {
      this.contestService.deleteParticipation(this.rowData.participationId).subscribe(
        data => {
          this.messageService.addSuccess('Usunięto!');
          this.deletedItem.emit(this.rowData.participationId);
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
