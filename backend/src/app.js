import express  from 'express'
import cors from "cors";
import dotenv from "dotenv";
import { pool } from './config/db.js'

const app = express() ;

// middleware
app.use(cors());
app.use(express.json());





export default app ;
