import { CandidateRepository } from "./candidates.repository";

const subjectNames: { [key: string]: string } = {
  toan: 'Mathematics',
  ngu_van: 'Literature',
  ngoai_ngu: 'Foreign Language',
  lich_su: 'History',
  dia_li: 'Geography',
  gdcd: 'Civic Education',
  vat_li: 'Physics',
  hoa_hoc: 'Chemistry',
  sinh_hoc: 'Biology',
};

interface FormattedStat {
  subjectCode: string;
  subjectName: string;
  studentCount: number;
  averageScore: number | null;
  highestScore: number | null;
  lowestScore: number | null;
}
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


 public async getSubjectStatistics(): Promise<FormattedStat[]> { 
    try {
      const stats = await this.candidateRepository.statistic();
      const formattedStats = stats.map(stat => ({
        subjectCode: stat.subjectCode,
        subjectName: subjectNames[stat.subjectCode] || stat.subjectCode,
        studentCount: stat._count.subjectCode,
        averageScore: stat._avg.value,
        highestScore: stat._max.value,
        lowestScore: stat._min.value,
      }));

      return formattedStats;

    } catch (error) {
      console.error("Error calculating statistics:", error);
      throw error;
    }
  }
}
