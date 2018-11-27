import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BreedGroup} from '../../models/BreedGroup.model';
import {environment} from '../../../environments/environment';
import {ContestType} from '../../models/ContestType.model';
import {Contest} from '../../models/Contest.model';
import {ContestInfo} from '../../DTOs/ContestInfo.model';

@Injectable({
  providedIn: 'root'
})
export class ContestService {

  constructor(private httpClient: HttpClient) { }

  getAvailableContests() {
    return this.httpClient.get<ContestType[]>(`${environment.apiUrl}contest/getAvailable`);
  }

  planContest(newContest: Contest) {
    return this.httpClient.post(`${environment.apiUrl}contest/plan`, newContest);
  }

  addContest(contest: ContestType) {
    return this.httpClient.post(`${environment.apiUrl}contest/add`, contest);
  }

  getContests() {
    return this.httpClient.get<ContestInfo[]>(`${environment.apiUrl}contest/getAll`);
  }

  deleteContest(contestTypeId: number) {
    return this.httpClient.delete(`${environment.apiUrl}contest/${contestTypeId}`);
  }

  getAvaiableContestsByDogBreed (breedId: number) {

  }

  getEntriedContestsByDogId (dogId: number) {

  }

  getContestById (contestId: number) {

  }
}
