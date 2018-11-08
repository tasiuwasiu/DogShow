import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContestService {

  constructor(private httpClient: HttpClient) { }

  getAvaiableContests() {

  }

  getAvaiableContestsByDogBreed (breedId: number) {

  }

  getEntriedContestsByDogId (dogId: number) {

  }

  getContestById (contestId: number) {

  }
}
