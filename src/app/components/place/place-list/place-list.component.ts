import {Component, OnInit} from '@angular/core';
import {PlaceService} from '../../../services/Place/place.service';
import {MessageService} from '../../../services/Message/message.service';
import {Place} from '../../../models/Place.model';
import {EditPlaceButtonComponent} from './edit-place-button.component';
import {DeletePlaceButtonComponent} from './delete-place-button.component';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {

  places: Place[];
  tableSettings = {};


  constructor(private placeService: PlaceService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.placeService.getAllPlaces().subscribe(
      data => {
        this.places = data;
        console.log(this.places);
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
        placeId: {
          title: 'ID',
          editable: false,
          width: '10%'
        },
        name: {
          title: 'Nazwa',
          editable: false,
          width: '60%'
        },
        edit: {
          title: '',
          type: 'custom',
          filter: false,
          sort: false,
          width: '15%',
          renderComponent: EditPlaceButtonComponent
        },
        delete: {
          title: '',
          type: 'custom',
          filter: false,
          sort: false,
          width: '15%',
          renderComponent: DeletePlaceButtonComponent,
          onComponentInitFunction: (instance) => {
            instance.deletedItem.subscribe(placeId => {
              this.handleDelete(placeId);
            });
          }
        }
      },
      actions: {
        add: false,
        delete: false,
        edit: false
      },
      noDataMessage: 'Nie odnaleziono danych'
    };
  }

  private handleDelete(placeId: number) {
    this.places = this.places.filter(place => place.placeId !== placeId);
  }
}
