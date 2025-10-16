import { CandidateRepository } from "./candidates.repository";
export class CandidateService {
  private candidateRepository = new CandidateRepository();

  public async searchScore(registrationNumber: string): Promise<any> {
    try {
      const candidate = await this.candidateRepository.getCandidateByIndexing(
        registrationNumber
      );
      if (candidate) {
        return candidate;
      }
      throw Error(" No candidate found with that registration number");
    } catch (error) {
      console.error("Error fetching candidate:", error);
      throw error;
    }
  }
}
