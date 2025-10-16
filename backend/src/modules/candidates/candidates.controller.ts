import type { Request, Response } from 'express';
import { CandidateService } from './candidates.service';
import type { SearchCandidateInput } from './candidates.dto';

export class CandidateController {
  private candidateService = new CandidateService();  

  public searchScore= async(req: Request<{},{}, {},SearchCandidateInput['query']>, res: Response):Promise<void> =>{
    try {
    
      const {registrationNumber} = req.query;
      const registrationScore = await this.candidateService.searchScore(registrationNumber);
      
      res.status(200).json({
        success: true,
        message: 'Search score successfully',
        data: registrationScore,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to Search score',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }
  


};