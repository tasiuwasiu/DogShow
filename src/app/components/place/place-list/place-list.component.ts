import {Component, OnInit} from '@angular/core';
import {PlaceService} from '../../../services/Place/place.service';
import {MessageService} from '../../../services/Message/message.service';
import {Place} from '../../../models/Place.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {

  places: Place[];

  constructor(private placeService: PlaceService,
              private messageService: MessageService,
              private router: Router) {
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
  }

  editPlace(placeId: number) {
    this.router.navigate(['/place', placeId]);
  }

}
