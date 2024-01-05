import express from "express";
import cors from 'cors'
import morgan from "morgan";
import connect from "./Database/Connect.js";
import router from "./Router/route.js";
import dotenv from "dotenv";
const app = express();


// MiddleWares
dotenv.config();// for env connect file 
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hacker know about our stack... Hide Headers 

// Port

const Port = 8080;

/** HTTP GET Request */

app.get('/', (req, res) => {
    res.status(200).json('Home Requested')
})





/** Api Route */
app.use('/api', router)








/** Start Server Only Valid Connection Otherwise Is Give Errors */


connect().then(() => {
    try {
        app.listen(Port, () => {
            console.log(`Server Is Connected On http://localhost:${Port}`)
        })
    } catch (error) {
        console.log('Cannot Connect To The Server...')
    }
}).catch((error) => {
    console.log('Invalid Connection Sorry For Not Connected...')
})










