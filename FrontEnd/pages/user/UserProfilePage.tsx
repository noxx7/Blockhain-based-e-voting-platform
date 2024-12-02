import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import "../../styles/user/UserProfile.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDataContext } from "../../context/DataContext";
import { useProgramContext } from "../../context/ProgramContext";

function UserProfile() {
    const { authData, checkUserAuth } = useDataContext()
    const { publicKey, connected, disconnect } = useWallet()
    const { connection } = useProgramContext()

    const [balance, setBalance] = useState<number | null>(null)
    const [voted] = useState<boolean | undefined>(authData?.voted)
    const [cuttedHash, setCuttedHash] = useState<string | undefined>(authData?.txhash)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchBalance = async () => {
            if (connected && publicKey) {
                try {
                    const lamports = await connection.getBalance(publicKey)
                    const sol = lamports / LAMPORTS_PER_SOL

                    setBalance(sol)
                } catch (error) {
                    console.error("error fetching balance", error)
                }
            } else {
                setBalance(null)
            }
        }

        fetchBalance()
    }, [connected, publicKey, connection])

    const handleLogout = async () => {
        try {
            await axios.post('/api/logout')
            await checkUserAuth()
            await disconnect()
            navigate('/login')
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (authData?.txhash) {
            const cuttedHash = authData?.txhash.substring(0, 22)
            setCuttedHash(cuttedHash)
        }
    }, [authData?.txhash])

    return (
        <div className="profile-container">
            <div className="welcome-user">
                <span className="welcome">Welcome</span>
                <span className="user-name">{authData?.name}.</span>
            </div>
            <div className="profile-content-container">
                <div className="user-detail">
                    <span className="detail">Nim</span>
                    <span className="detail-info">{authData?.nim}</span>
                </div>

                <div className="wallet-container">
                    <div className="wallet-container-header">
                        <span className="detail">Wallet</span>
                        <span className="wallet-balance">{balance !== null ? `${balance} SOL` : ''}</span>
                    </div>
                    <div className="wallet-connect">
                        <div className="wallet-address">
                            <span className="address"> {publicKey ? `${publicKey}` : 'wallet not connected'}</span>
                        </div>
                        <WalletMultiButton />
                    </div>
                    <span> <Link to="/user/claim">Need fees?</Link></span>
                </div>

                <div className="user-vote-container">
                    <span className="detail">Votes history</span>
                    <div className="vote-container-body">
                        {voted ?
                            <>
                                <span style={{ color: 'white' }}>tx: <a href={`https://explorer.solana.com/tx/${authData?.txhash}?cluster=devnet`} target="_blank" className="vote-direct-link">{cuttedHash}...</a></span>
                                <span className="history-date">at {authData?.txdate}</span>
                            </>
                            :
                            <>
                                <span className="no-data">No data.</span>
                            </>
                        }
                    </div>
                </div>

                <div className="logout-btn-container">
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default UserProfile