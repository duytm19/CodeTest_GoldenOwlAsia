import prisma from "../../services/prisma-client";

interface SubjectGroupByResult {
  subjectCode: string;
  _count: { subjectCode: number };
  _avg: { value: number | null };
  _max: { value: number | null };
  _min: { value: number | null };
}
export class CandidateRepository {
 public async getCandidateByIndexing(registrationNumber: string): Promise<any> {
    const candidate = await prisma.candidate.findUnique({
      where: {
        registrationNumber: registrationNumber,
      },
      include: {
        scores: true,
      },
    });

    return candidate; 
  }

  public async statistic():Promise<SubjectGroupByResult[]>{
    const stats = await prisma.score.groupBy({
        by: ['subjectCode'], 
        _count: {
          subjectCode: true, 
        },
        _avg: {
          value: true, 
        },
        _max: {
          value: true, 
        },
        _min: {
          value: true, 
        },
      });
      return stats
  }
}
