import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ContestType} from '../../models/ContestType.model';
import {Contest} from '../../models/Contest.model';
import {ContestInfo} from '../../DTOs/ContestInfo.model';
import {Participation} from '../../models/Participation.model';
import {DogParticipation} from '../../DTOs/DogParticipation.model';
import {ContestDetails} from '../../DTOs/ContestDetails.model';
import {PlanInfo} from '../../DTOs/PlanInfo.model';
import {Grade} from '../../DTOs/Grade.model';
import {SaveGrade} from '../../DTOs/SaveGrade.model';

@Injectable({
  providedIn: 'root'
})
export class ContestService {

  constructor(private httpClient: HttpClient) { }

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
    return this.httpClient.get<ContestInfo[]>(`${environment.apiUrl}contest/getAvailableByBreed/${breedId}`);
  }

  getAvaiableContestsByDogId (dogId: number) {
    return this.httpClient.get<ContestInfo[]>(`${environment.apiUrl}contest/getAvailableByDog/${dogId}`);
  }

  getNotPlannedContests () {
    return this.httpClient.get<ContestInfo[]>(`${environment.apiUrl}contest/getNotPlanned`);
  }

  participate(participation: Participation) {
    return this.httpClient.post(`${environment.apiUrl}contest/participate`, participation);
  }

  deleteParticipation(participationId: number) {
    return this.httpClient.delete(`${environment.apiUrl}contest/participation/${participationId}`);
  }

  getEntriedContestsByDogId (dogId: number) {
    return this.httpClient.get<DogParticipation[]>(`${environment.apiUrl}contest/getDogParticipation/${dogId}`);
  }

  getContestById (contestId: number) {
    return this.httpClient.get<ContestDetails>(`${environment.apiUrl}contest/${contestId}`);
  }

  getPlan() {
    return this.httpClient.get<PlanInfo[]>(`${environment.apiUrl}contest/getPlan`);
  }

  getAllGrades() {
    return this.httpClient.get<Grade[]>(`${environment.apiUrl}contest/getAllGrades`);
  }

  saveGrade(grade: SaveGrade) {
    return this.httpClient.post(`${environment.apiUrl}contest/saveGrade/${grade.participationId}`, grade);
  }
}
