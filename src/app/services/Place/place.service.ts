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
    return this.httpClient.post<Place>(`${environment.apiUrl}place/create`, newPlace);
  }

  editPlace(placeId: number, place: Place) {
    return this.httpClient.put<Place>(`${environment.apiUrl}place/${placeId}`, place);
  }

  getPlace(placeId: number) {
    return this.httpClient.get<Place>(`${environment.apiUrl}place/${placeId}`);
  }

  getAllPlaces() {
    return this.httpClient.get<Place[]>(`${environment.apiUrl}place`);
  }

  deletePlace(placeId: number) {
    return this.httpClient.delete(`${environment.apiUrl}place/${placeId}`);
  }
}
