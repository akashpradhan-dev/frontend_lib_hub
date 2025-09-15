import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { User } from '../services/mutation/login'
import { useMeQuery } from '@/services/query/useMeQuery'

interface AuthContextType {
  user: User | null
  login: (userData: User) => void
  logout: () => void
  isLoggedIn: boolean
  setProfile: (user: User) => void
  isAuthResolved: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthResolved, setAuthResolved] = useState(false)

  const { data, status } = useMeQuery()

  useEffect(() => {
    if (status === 'success' && data?.data) {
      setUser(data.data)
    }
    if (status === 'error') {
      setUser(null)
    }
    if (status !== 'pending') {
      setAuthResolved(true)
    }
  }, [status, data])

  const login = (userData: User) => setUser(userData)
  const logout = () => setUser(null)
  const setProfile = (user: User) => setUser(user)

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        setProfile,
        isLoggedIn: !!user,
        isAuthResolved,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
