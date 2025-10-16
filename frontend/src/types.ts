
export interface Score {
  value: number;
  languageCode: string | null;
  subjectCode: string;
}


export interface CandidateData {
  registrationNumber: string;
  scores: Score[];
}

export interface ApiSuccessResponse {
  success: true;
  message: string;
  data: CandidateData;
}
export interface ApiErrorResponse {
  success: false;
  message: string;
  error: string;
}