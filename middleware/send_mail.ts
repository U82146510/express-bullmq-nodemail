import nodemailer from 'nodemailer';
import {logger} from '../middleware/logger';
export const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'maxmadgb@gmail.com',
        pass:'raduP@$$w0rd'
    }
});

transporter.on('error',(error)=>{
    logger.error(error);
    process.exit(1);
});