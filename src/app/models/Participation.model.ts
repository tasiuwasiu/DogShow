export interface Participation {
  participationId: number;
  dogId: number;
  contestId: number;
  gradeId?: number;
  place?: number;
  description: string;
}
