import "./styles/App.css";
import {
    Routes,
    Route,
    Navigate,
    useLocation,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { ProtectedRoutes, LoginAuthRoute } from "./components/ProtectedRoutes";
import Navbar from "./components/Navbar";
import PageNotFound from "./pages/PageNotFound";
import { useMemo } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    ConnectionProvider,
    WalletProvider
} from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import UserClaimPage from "./pages/user/UserClaimPage";
import Unauthorized from "./pages/Unauthorized";
import { useDataContext } from "./context/DataContext";
import UserVotePage from "./pages/user/UserVotePage";
import UserProfile from "./pages/user/UserProfilePage";
import { ProgramContextProvider } from "./context/ProgramContext";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {

    const { authData } = useDataContext()

    const [nav, setNav] = useState<string | null>(null);
    const [role, setRole] = useState<"guest" | "user">("guest")
    const location = useLocation()

    useEffect(() => {
        if (location.pathname !== "/login") {
            setNav("active");
        } else {
            setNav(null);
        }
    }, [location]);

    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(() => [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter()
    ], []);

    useEffect(() => {
        setRole(authData?.role === "guset" ? "guest" : "user")
    }, [authData?.role])

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <ProgramContextProvider>
                        <div className="App">
                            {nav === "active" && <Navbar />}
                            <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
                            <div className="main-container">
                                <Routes>
                                    <Route path="*" element={<PageNotFound />} />
                                    <Route path="/unauthorized" element={<Unauthorized />} />

                                    <Route path="/" element={<LoginAuthRoute isLoggedIn={authData?.isLoggedIn || null} role={role} />}>
                                        <Route path="/login" element={<LoginPage />} />
                                    </Route>

                                    <Route path="user" element={<ProtectedRoutes isLoggedIn={authData?.isLoggedIn || null} requiredRole='user' role={role} />}>
                                        <Route index element={<Navigate to="/user/vote" />} />
                                        <Route path="profile" element={<UserProfile />} />
                                        <Route path="claim" element={<UserClaimPage />} />
                                        <Route path="vote" element={<UserVotePage />} />
                                        <Route path="*" element={<Navigate to="/user/vote" />} />
                                    </Route>
                                </Routes>
                            </div>
                        </div>
                    </ProgramContextProvider>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>

    );
}

export default App;