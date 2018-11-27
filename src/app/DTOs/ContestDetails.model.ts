import {BreedInfo} from './BreedInfo.model';
import {ParticipationInfo} from './ParticipationInfo.model';

export interface ContestDetails {
  contestTypeId: number;
  contestId: number;
  name: string;
  isEnterable: boolean;
  placeId: number;
  placeName: string;
  startDate: string;
  endDate: string;
  allowedBreeds: BreedInfo[];
  participants: ParticipationInfo[];
}
