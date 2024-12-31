import express from  'express'
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.routes.js';
import applicationRoute from './routes/application.route.js';


dotenv.config({});
const app = express();

app.get("/",(req, res) => {
    return res.status(200).json({
        message: " Welcome to the API",
        timestamp: new Date().toISOString(),
        success:true,
    });
});

// middle ware 

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions= {
    origin: ["http://localhost:5121"],
    credentials:true,
};


app.use(cors(corsOptions));


const PORT = process.env.PORT || 5001;

// All APIs 

app.use("/api/users",userRoute);
app.use("/api/company",companyRoute);
app.use("/api/job",jobRoute);
app.use("/api/application",applicationRoute);
//http://localhost:5011/api/users/register
//http://localhost:5011/api/users/login
//http://localhost:5011/api/users/update
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});

