import prisma from "../../services/prisma-client";

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
}
