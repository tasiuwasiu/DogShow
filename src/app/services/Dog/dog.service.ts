import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Dog} from '../../models/Dog.model';
import {DogBreed} from '../../models/DogBreed.model';
import {BreedGroup} from '../../models/BreedGroup.model';
import {BreedSection} from '../../models/BreedSection.model';
import {DogClass} from '../../models/DogClass.model';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(private httpClient: HttpClient) {
  }

  getDogByID(id: number) {
    return this.httpClient.get<Dog>(`${environment.apiUrl}dog/get/${id}`);
  }

  getDogsByUserID(userId: number) {
    return this.httpClient.get<Dog[]>(`${environment.apiUrl}dog/getByUserId/${userId}`);
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

  getClasses() {
    return this.httpClient.get<DogClass[]>(`${environment.apiUrl}dog/getClasses`);
  }

  addDog(newDog: Dog) {
    return this.httpClient.post(`${environment.apiUrl}dog/add`, newDog);
  }

  editDog(dogId: number, newDog: Dog) {
    return this.httpClient.put(`${environment.apiUrl}dog/edit/${dogId}`, newDog);
  }
}
