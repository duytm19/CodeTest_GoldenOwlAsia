import { Router } from 'express';
import { CandidateController } from './candidates.controller';
import { validate } from '../../middlewares/validations.middleware';
import { searchCandidateDTO } from './candidates.dto';
const router = Router();
const candidateController = new CandidateController();


router.get('/search',validate(searchCandidateDTO),candidateController.searchScore);

export default router;