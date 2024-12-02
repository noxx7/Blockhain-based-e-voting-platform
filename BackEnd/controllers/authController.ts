import { userModel } from "../models/DbModels"
import { comparePassword } from "../helpers/encrypt"
import { Request, Response } from "express"
import dotenv from "dotenv"
import jwt from 'jsonwebtoken'
import bs58 from "bs58"
import { Connection, Keypair, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js"

dotenv.config({ path: "../../.env" })
const connection = new Connection('https://api.devnet.solana.com')

const getCookieController = async (req: Request, res: Response) => {
    const cookie = req.cookies.token

    const oldCookie = jwt.decode(cookie)
    console.log(oldCookie)

    if (cookie) {
        try {
            jwt.verify(cookie, process.env.JWT_SECRET as string, {}, (err, decode) => {
                if (err) {
                    res.json({ error: 'failed to fetch data' })
                }
                return res.json(decode)
            })
        } catch (error) {
            console.error(error)
        }
    } else {
        res.json({
            error: "unathorized",
            role: "guest",
            isLoggedIn: false
        })
    }
}

const solClaimController = async (req: Request, res: Response): Promise<void> => {
    const { userAddress } = req.body

    if (!userAddress) {
        res.status(400).json({ error: 'Connect your wallet first' })
    }

    const treasuryKp = process.env.TREASURY_WALLET_PK as string
    const encoded = bs58.decode(treasuryKp)
    const signer = Keypair.fromSecretKey(encoded)

    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: signer.publicKey,
            toPubkey: userAddress,
            lamports: 100000000
        })
    )

    await sendAndConfirmTransaction(connection, transaction, [signer])

    res.status(200).json({ success: 'Claimed successfully!' })
}

const voteController = async (req: Request, res: Response): Promise<void> => {
    const currentCookie = req.cookies.token
    const { nim, voted, txhash, txdate } = req.body

    const oldCookie = jwt.decode(currentCookie)

    if (!currentCookie) {
        res.json({ error: 'Failed updating data!' })
    }

    const decoded = JSON.parse(JSON.stringify(oldCookie))

    const updatedCookie = {
        ...decoded,
        voted: voted,
        txhash: txhash,
        txdate: txdate
    }

    await userModel.findOneAndUpdate({ nim }, {
        $set: {
            voted: voted,
            txhash: txhash,
            txdate: txdate
        }
    }, { new: true })

    jwt.sign(updatedCookie, process.env.JWT_SECRET as string, {}, (err, token) => {
        if (err) {
            throw (err)
        }

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        }).json({
            success: 'Vote submitted successfully!'
        })
    })
}

interface User {
    _id: string
    nim: string
    name: string
    role: string
    isLoggedIn: boolean
    password: string
    voted: boolean
    txhash: string
    txdate: string
}

const userLoginController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nim, password } = req.body

        const user = await userModel.findOne({ nim }) as User

        if (!user) {
            res.json({
                error: 'cant found nim'
            })
        }

        const match = await comparePassword(password, user.password)

        if (!match) {
            res.json({ error: 'incorret password!' })
        }

        if (nim && match) {
            jwt.sign({ id: user._id, nim: user.nim, name: user.name, role: user.role, isLoggedIn: true, voted: user.voted, txhash: user.txhash, txdate: user.txdate }, process.env.JWT_SECRET as string, {}, (err, token) => {
                if (err) {
                    throw (err)
                }

                res.cookie('token', token, {
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: process.env.NODE_ENV === 'production',
                }).json({
                    role: user.role,
                    voted: user.voted
                })
            })
        }
    } catch (error) {
        console.error(error)
    }
}

const userLogoutController = async (req: Request, res: Response): Promise<void> => {
    const cookie = req.cookies.token

    if (cookie) {
        res.clearCookie("token", {
            path: "/",
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true
        }).json({ message: 'logout successfullly' })


    } else {
        res.json({ error: 'no session found' })
    }
}

export { userLoginController, userLogoutController, solClaimController, getCookieController, voteController }