/* eslint-disable react-refresh/only-export-components */
import React, {
    useState,
    useEffect,
    createContext,
    useContext,
    ReactNode,
} from "react"
import axios from "axios"
import Loading from "../components/Loading"

interface AuthData {
    nim: string
    name: string
    role: string
    isLoggedIn: boolean
    voted: boolean
    txhash: string
    txdate: string
}

interface DataContextType {
    authData: AuthData | null
    checkUserAuth: () => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

interface DataContextProviderProps {
    children: ReactNode
}

const DataContextProvider: React.FC<DataContextProviderProps> = ({
    children,
}) => {
    const [authData, setAuthData] = useState<AuthData | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const checkUserAuth = async () => {
        try {
            const response = await axios.get('/api/fetch-cookie')
            const result = await response.data
            setAuthData(result)
        } catch (error) {
            console.error("Error fetching auth data:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkUserAuth()
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <DataContext.Provider value={{ authData, checkUserAuth }}>
            {children}
        </DataContext.Provider>
    )
}

const useDataContext = (): DataContextType => {
    const context = useContext(DataContext)
    if (!context) {
        throw new Error("useDataContext must be used within a DataContextProvider")
    }
    return context
}

export { DataContext, DataContextProvider, useDataContext }
