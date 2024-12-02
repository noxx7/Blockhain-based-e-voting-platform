/* eslint-disable react-refresh/only-export-components */
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import React, { createContext, ReactNode, useContext, useMemo } from "react";
import { IDL, VotingProgram } from "../../idl/idl";

interface ProgramContextType {
    provider: AnchorProvider
    program: Program<VotingProgram>
    connection: Connection
    voteAccountAddress: PublicKey
}

interface ProgramContextProviderProps {
    children: ReactNode
}

const ProgramContext = createContext<ProgramContextType | undefined>(undefined)

const ProgramContextProvider: React.FC<ProgramContextProviderProps> = ({
    children
}) => {
    const wallet = useAnchorWallet() as AnchorWallet

    const connection = useMemo(() => {
        return new Connection('https://api.devnet.solana.com', { "commitment": "confirmed" })
    }, [])

    const provider = useMemo(() => {
        return new AnchorProvider(connection, wallet)
    }, [connection, wallet])

    const program = useMemo(() => {
        return new Program<VotingProgram>(IDL, provider)
    }, [provider])

    const voteAccountAddress = useMemo(() => {
        return new PublicKey('Ds9yxa7sS3MFzkujJw5qqze8y6CFncVhwiPJfM9eUb9o')
    }, [])

    return (
        <ProgramContext.Provider value={{ program, provider, connection, voteAccountAddress }}>
            {children}
        </ProgramContext.Provider>
    )
}

const useProgramContext = (): ProgramContextType => {
    const context = useContext(ProgramContext)
    if (!context) {
        throw new Error("useProgramContext must be used within a ProgramContextProvider")
    }

    return context
}

export { useProgramContext, ProgramContextProvider }