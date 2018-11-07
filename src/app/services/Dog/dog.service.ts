import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Dog} from '../../models/Dog.model';
import {DogBreed} from '../../models/DogBreed.model';
import {BreedGroup} from '../../models/BreedGroup.model';
import {BreedSection} from '../../models/BreedSection.model';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(private httpClient: HttpClient) {
  }

  getDogByID(id: number) {
    return this.httpClient.get<Dog>(`${environment.apiUrl}dog/get/${id}`);
  }


  getBreedsInSection(sectionID: number) {
    return this.httpClient.get<DogBreed[]>(`${environment.apiUrl}dog/getBreedsInSection/${sectionID}`);
  }

  getSectionsInGroup(groupID: number) {
    return this.httpClient.get<BreedSection[]>(`${environment.apiUrl}dog/getSectionsInGroup/${groupID}`);
  }

  getAllGroups() {
    return this.httpClient.get<BreedGroup[]>(`${environment.apiUrl}dog/getGroups`);
  }


}
