import express,{type Application} from 'express';
import cors from 'cors';
import { logger } from './middleware/logger';
import {router} from './routes/jobs_route';

const app:Application = express();
const port:number = 3000;

app.use(express.json());
app.use(cors({
    methods:["GET","POST","PUT","DELETE0"]
}));


app.use('/',router);

const start = async ()=>{
    try {
        app.listen(port,()=>logger.info('server on'));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();