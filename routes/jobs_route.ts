import { Router } from "express";
import {send_mail,get_jobs,get_job} from '../controllers/job_controller';

export const router:Router = Router();

router.post('/add',send_mail);
router.get('/get',get_jobs);
router.get('/get/:id',get_job);