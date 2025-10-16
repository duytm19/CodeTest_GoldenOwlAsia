import express from 'express';
import cors from 'cors';
import candidateRouter from './modules/candidates/candidates.routes'


const app = express();


app.use(express.json());
app.use(cors());
app.use('/api/candidates',candidateRouter)

export default app