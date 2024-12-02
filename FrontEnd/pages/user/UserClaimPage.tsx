import toast from "react-hot-toast";
import "../../styles/user/UserClaimPage.css"
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

function UserClaimPage() {

    const { connected, publicKey } = useWallet()

    const handleClaim = async () => {
        console.log('clicked')
        if (!publicKey) {
            toast.error('Connect your wallet first', {
                style: {
                    fontFamily: 'sans-serif'
                }
            })
            return
        }

        if (connected && publicKey) {
            const loadingId = toast.loading("Claiming SOL...", {
                duration: 12000,
                style: {
                    fontFamily: 'sans-serif'
                }
            })

            const response = await axios.post('/api/claim-sol', {
                userAddress: publicKey.toBase58()
            })

            const result = await response.data

            if (result.error) {
                toast.error(`${result.error}`, {
                    style: {
                        fontFamily: 'sans-serif'
                    }
                })
            } else if (result.success) {
                toast.success('Claim successfully!', {
                    id: loadingId,
                    duration: 3000,
                    style: {
                        fontFamily: 'sans-serif'
                    }
                })
            }
        }
    }

    const WalletConnected = () => {
        return (
            <>
                <h1>Claim SOL token</h1>
                <h3>You will receive 0.1 SOL.</h3>
                <button className="claim-btn" onClick={() => handleClaim()}>claim</button>
            </>
        )
    }

    const WalletNotConnected = () => {
        return (
            <>
                <h1>Claim SOL token</h1>
                <h3>To claim tokens, you need to connect your wallet.</h3>
                <WalletMultiButton />
            </>
        )
    }

    return (
        <div className="claim-page-container">
            {connected ? <WalletConnected /> : <WalletNotConnected />}
        </div>
    )
}

export default UserClaimPage