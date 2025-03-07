import { type Request,type Response,type NextFunction } from "express";
import {email_queue} from '../queue/email_queue';
import {logger} from '../middleware/logger';
import {Job } from "bullmq";


export const send_mail = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {recipient,subject,body} = req.body
        const job = await email_queue.add('sendmail',{recipient,subject,body},{
            attempts:3,
            backoff:{
                type:'exponential',
                delay:5000,
            },
            priority:1
        });
        logger.info(`Job added ${job.id} for ${recipient}`);
        res.status(201).json({message:'Email job added',jobId:job.id})
    } catch (error) {
        console.error(error)
        next(error);
    }
};

export const get_jobs = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const waiting = await email_queue.getWaiting();
        const active = await email_queue.getActive();
        const completed = await email_queue.getCompleted();
        const failed = await email_queue.getFailed();
        res.status(201).json({waiting,active,completed,failed});
    } catch (error) {
        console.error(error)
        next(error);
    }
};

export const get_job = async(req:Request,res:Response,next:NextFunction)=>{
    const {id} = req.params;
    try {
        const job:Job | null = await email_queue.getJob(id);
        if(!job){
            res.status(404).json({message:'Job not found'});
            return;
        }
        res.status(201).json({
            id: job.id,
            name: job.name,
            data: job.data,
            status: await job.getState(),
            result: await job.returnvalue,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};