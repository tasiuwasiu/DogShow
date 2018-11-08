import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Place} from '../../models/Place.model';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private httpClient: HttpClient) {
  }

  addPlace(newPlace: Place) {
    return this.httpClient.post(`${environment.apiUrl}place/create`, newPlace);
  }

  editPlace(placeId: number, placeName: string) {

  }

  getPlaceName(placeId: number) {

  }

  getAllPlaces() {

  }
}
