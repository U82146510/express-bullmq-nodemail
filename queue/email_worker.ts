import { Worker } from "bullmq";
import {logger} from '../middleware/logger';
import {transporter} from '../middleware/send_mail';

const redis_connection={
    host:"127.0.0.1",
    port:6379
};



const email_worker = new Worker("email_queue",async(job)=>{
    try {
        const { recipient, subject, body } = job.data;
        const info = await transporter.sendMail({
            from:'noreply@info.com',
            to:recipient,
            subject:subject,
            text:body,
        });
        return {success:true,messageId:info.messageId}
    } catch (error) {
        console.error(error);
        throw error;
    }
},{
    connection:redis_connection,
    concurrency:5
});

email_worker.on('completed',(job)=>{
    logger.info(`Job ${job.id} completed successfully`);
});

email_worker.on('error',(err)=>{
    logger.error(`Job failed: ${err.message}`)
})