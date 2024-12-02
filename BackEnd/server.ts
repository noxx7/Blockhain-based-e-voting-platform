import express from "express"
import mongoose from "mongoose";
import "dotenv/config"
import cookieParser from "cookie-parser";
import { router } from "./routes/authRoutes";
import cors from "cors"

mongoose.connect(process.env.MONGO_URL as string)
    .then(() => {
        console.log('database connected!')
    })
    .catch((error) => {
        console.log('database not connected', error)
    })

const app = express()

const corsOption = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOption))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

const port = 3000;

app.use("/", router)

app.listen(port, () => {
    console.log(`server is runnin on port ${port}`)
})

