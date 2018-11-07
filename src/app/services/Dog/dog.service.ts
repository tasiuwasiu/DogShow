import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Dog} from '../../models/Dog.model';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(private httpClient: HttpClient) { }

  getDogByID(id: number) {
    return this.httpClient.get<Dog>(`${environment.apiUrl}dog/get/${id}`);
  }

}
