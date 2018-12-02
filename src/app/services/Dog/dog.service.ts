import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Dog} from '../../models/Dog.model';
import {DogBreed} from '../../models/DogBreed.model';
import {BreedGroup} from '../../models/BreedGroup.model';
import {BreedSection} from '../../models/BreedSection.model';
import {DogClass} from '../../models/DogClass.model';
import {BreedGroupInfo} from '../../DTOs/BreedGroupInfo.model';
import {DogDetails} from '../../DTOs/DogDetails.model';
import {DogInfo} from '../../DTOs/DogInfo.model';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(private httpClient: HttpClient) {
  }

  getDogByID(id: number) {
    return this.httpClient.get<Dog>(`${environment.apiUrl}dog/${id}`);
  }

  getDogDetailsByID(id: number) {
    return this.httpClient.get<DogDetails>(`${environment.apiUrl}dog/details/${id}`);
  }

  getDogsByUserID(userId: number) {
    return this.httpClient.get<DogInfo[]>(`${environment.apiUrl}dog/getByUserId/${userId}`);
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

  getGroupSectionFromBreed(breedId: number) {
    return this.httpClient.get<BreedGroupInfo>(`${environment.apiUrl}dog/getGroupSectionFromBreed/${breedId}`);
  }

  editDog(dogId: number, newDog: Dog) {
    return this.httpClient.put(`${environment.apiUrl}dog/edit/${dogId}`, newDog);
  }

  deleteDog(dogId: number) {
    return this.httpClient.delete(`${environment.apiUrl}dog/${dogId}`);
  }

  getBreedById(breedId: number) {
    return this.httpClient.get<DogBreed>(`${environment.apiUrl}dog/getBreed/${breedId}`);
  }
}
