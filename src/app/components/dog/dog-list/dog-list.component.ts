import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from '../../../services/Authorization/authorization.service';
import {MessageService} from '../../../services/Message/message.service';
import {Title} from '@angular/platform-browser';
import {DogService} from '../../../services/Dog/dog.service';
import {EditDogButtonComponent} from './edit-dog-button.component';
import {DeleteDogButtonComponent} from './delete-dog-button.component';

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.css']
})
export class DogListComponent implements OnInit {

  userId: number;
  dogs = [];
  tableSettings = {};

  constructor(private authorizationService: AuthorizationService,
              private messageService: MessageService,
              private titleService: Title,
              private dogService: DogService) { }

  ngOnInit() {
    this.titleService.setTitle('Lista moich psów');
    this.userId = this.authorizationService.getCurrentUserID();
    this.dogService.getDogsByUserID(this.userId).subscribe(
      data => {
        this.dogs = data;
      },
      error => {
        if (error.error && error.error.message) {
          this.messageService.addError(error.error.message);
        } else if (error.status !== null && error.status === 0) {
          this.messageService.addError('Brak połączenia z serwerem API!');
        } else {
          this.messageService.addError('Błąd pobierania');
        }
      }
    );
    this.tableSettings = {
      columns: {
        name: {
          title: 'Nazwa',
          editable: false
        },
        chipNumber: {
          title: 'Nr chipu',
          editable: false
        },
        edit: {
          title: '',
          type: 'custom',
          filter: false,
          sort: false,
          width: '15%',
          renderComponent: EditDogButtonComponent
        },
        delete: {
          title: '',
          type: 'custom',
          filter: false,
          sort: false,
          width: '15%',
          renderComponent: DeleteDogButtonComponent,
          onComponentInitFunction: (instance) => {
            instance.deletedItem.subscribe(dogId => {
              this.handleDelete(dogId);
            });
          }
        }
      },
      actions: {
        add: false,
        delete: false,
        edit: false
      }
    };
  }

  private handleDelete(dogId: number) {
    this.dogs = this.dogs.filter(dog => dog.dogId !== dogId);
  }

}
