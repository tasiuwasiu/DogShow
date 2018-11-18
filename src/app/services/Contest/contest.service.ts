import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BreedGroup} from '../../models/BreedGroup.model';
import {environment} from '../../../environments/environment';
import {ContestType} from '../../models/ContestType.model';
import {Contest} from '../../models/Contest.model';

@Injectable({
  providedIn: 'root'
})
export class ContestService {

  constructor(private httpClient: HttpClient) { }

  getAvailableContests() {
    return this.httpClient.get<ContestType[]>(`${environment.apiUrl}contest/getAvailable`);
  }

  addContest(newContest: Contest) {
    return this.httpClient.post(`${environment.apiUrl}contest/add`, newContest);
  }

  getAvaiableContestsByDogBreed (breedId: number) {

  }

  getEntriedContestsByDogId (dogId: number) {

  }

  getContestById (contestId: number) {

  }
}
