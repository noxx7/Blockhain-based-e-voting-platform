import express from "express"
import cors from "cors"
import { userLoginController, userLogoutController, getCookieController, solClaimController, voteController } from "../controllers/authController.js"

const router = express.Router()

router.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

router.post('/api/login', userLoginController)
router.post('/api/logout', userLogoutController)
router.get('/api/fetch-cookie', getCookieController)
router.post('/api/vote', voteController)
router.post('/api/claim-sol', solClaimController)

export { router }
