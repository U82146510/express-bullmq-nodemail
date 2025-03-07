import nodemailer from 'nodemailer';
import {logger} from '../middleware/logger';
export const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'',
        pass:''
    }
});

transporter.on('error',(error)=>{
    logger.error(error);
    process.exit(1);
});
