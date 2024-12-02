import React from "react"
import "../../styles/user/UserVote.css"
import { useProgramContext } from "../../context/ProgramContext"
import { setProvider } from "@coral-xyz/anchor"
import { useWallet } from "@solana/wallet-adapter-react"
import toast from "react-hot-toast"
import { useDataContext } from "../../context/DataContext"
import axios from "axios"

interface CandidateVoteProps {
    id: number
    img: string
    name: string
    voted: boolean
    votes: number
    votesPercentage: number
}

const Candidate: React.FC<CandidateVoteProps> = ({ id, img, name, voted, votes, votesPercentage }) => {
    const { connected, publicKey } = useWallet();
    const { program, provider, voteAccountAddress } = useProgramContext()
    setProvider(provider)
    const { authData, checkUserAuth } = useDataContext()

    const voteBtnHandler = async (candidateId: number) => {
        if (!connected) {
            toast.error("Connect your wallet first", {
                style: {
                    fontFamily: 'sans-serif'
                }
            })
        }

        if (connected && publicKey) {
            if (voteAccountAddress) {
                voteCandidate(candidateId)
            } else {
                toast.error("Error: wallet is undefined", {
                    style: {
                        fontFamily: "sans-serif"
                    }
                })
            }
        }
    }

    const formatDate = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        const hours = String(date.getHours()).padStart(1, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    const date = new Date()
    const getDate = formatDate(date)

    const voteCandidate = async (candidateId: number) => {

        const toastId = toast.loading('Sending transaction..', {
            duration: 20000,
            style: {
                fontFamily: 'sans-serif'
            }
        })

        try {
            const initializeVote = await program.methods
                .vote(candidateId)
                .accounts({
                    voteAccount: voteAccountAddress
                })
                .rpc()

            toast.success('Vote submitted!', {
                duration: 2000,
                id: toastId,
                style: {
                    fontFamily: 'sans-serif'
                }
            })

            try {
                const response = await axios.post('/api/vote', {
                    nim: authData?.nim,
                    voted: true,
                    txhash: initializeVote,
                    txdate: getDate
                }, { withCredentials: true })

                const result = response.data

                if (result.success) {
                    checkUserAuth()
                }

                if (result.error) {
                    toast.error(result.error, {
                        duration: 2000,
                        id: toastId,
                        style: {
                            fontFamily: 'sans-serif'
                        }
                    })
                }
            } catch (error) {
                console.error(error)
                toast.error(`${error}`, {
                    id: toastId,
                    duration: 2000,
                    style: { fontFamily: "sans-serif" }
                })
            }

        } catch (error) {
            console.error(error)
            toast.error("Action canceled", {
                id: toastId,
                duration: 2000,
                style: { fontFamily: "sans-serif" }
            })
        }
    }

    return (
        <>
            <img src={img} alt="candidate" />
            <h3>{name}</h3>
            <p className="candidate-background">A passionate leader known for creativity and impact.</p>
            <button className="vote-btn" disabled={voted} onClick={() => voteBtnHandler(id)}>
                Vote
            </button>

            <div className="vote-percentage">
                <span className="candidate1-total-vote total-vote">votes: {votes}</span>
                <span className="percentage candidate1-percentage">{votesPercentage}%</span>
            </div>
        </>
    )
}

export default Candidate