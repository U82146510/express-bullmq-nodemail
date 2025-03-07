import { Queue } from 'bullmq';
import {logger} from '../middleware/logger';

const redis_connection={
    host:"127.0.0.1",
    port:6379
};
export const email_queue = new Queue("email_queue",{connection:redis_connection});

email_queue.on('error',(error)=>{
    logger.error(error);
    process.exit(1);
});