import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {MessageService} from '../../../services/Message/message.service';
import {DogService} from '../../../services/Dog/dog.service';

@Component({
  selector: 'app-delete-dog-button-view',
  template: `
    <button type="button" class="btn btn-danger text-white" (click)="onClick()">Usuń</button>
  `,
})
export class DeleteDogButtonComponent implements ViewCell, OnInit {

  constructor(private messageService: MessageService,
              private dogService: DogService) {  }

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() deletedItem: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  onClick() {
    if (confirm('Czy na pewno chcesz usunąć psa: ' + this.rowData.name + ' ?')) {
      this.dogService.deleteDog(this.rowData.dogId).subscribe(
        data => {
          this.messageService.addSuccess('Usunięto!');
          this.deletedItem.emit(this.rowData.dogId);
          },
        error => {
          if (error.error && error.error.message) {
            this.messageService.addError(error.error.message);
          } else if (error.status !== null && error.status === 0) {
            this.messageService.addError('Brak połączenia z serwerem API!');
          } else {
            this.messageService.addError('Błąd usuwania psa!');
          }
        }
      );
    }
  }
}
