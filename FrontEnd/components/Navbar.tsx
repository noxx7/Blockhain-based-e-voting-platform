import "../styles/Navbar.css"
import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useDataContext } from "../context/DataContext"

function Navbar() {

    const location = useLocation()

    const [active, setActive] = useState<string | boolean>(location.pathname)

    const { authData } = useDataContext()

    useEffect(() => {
        if (active !== 'user') {
            setActive(false)
        }

        if (active !== 'votes') {
            setActive(false)
        }

    }, [location, active])

    const UserNavbar = () => {
        return (
            <>
                <div className="user-nav-group">
                    <li className={active === "profile" || location.pathname === `/user/profile` ? "selected" : ""} ><Link to="/user/profile">Profile</Link></li>
                    <li className={active === "vote" || location.pathname === `/user/vote` ? "selected" : ""} ><Link to="/user/vote">Vote</Link></li>
                </div>
            </>
        )
    }

    return (
        <div className="navbar">
            <nav>
                <ul>
                    {authData?.role === 'user' && <UserNavbar />}
                    <WalletMultiButton />
                </ul>
            </nav>
        </div>
    )
}

export default Navbar