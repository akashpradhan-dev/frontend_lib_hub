import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import Cookies from 'js-cookie'
import { User } from '../services/mutation/login'

interface AuthContextType {
  user: User | null
  login: (userData: User) => void
  logout: () => void
  isLoggedIn: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = Cookies.get('authToken')
    const role = Cookies.get('userRole')

    if (token && role) {
      setUser({
        email: '',
        name: '',
        role: role as 'admin' | 'user',
        token,
      })
    }
  }, [])

  const login = (userData: User) => {
    Cookies.set('authToken', userData.token, { expires: 7, secure: true })
    Cookies.set('userRole', userData.role, { expires: 7, secure: true })
    setUser(userData)
  }

  const logout = () => {
    Cookies.remove('authToken')
    Cookies.remove('userRole')
    setUser(null)
  }

  const isLoggedIn = !!user?.token

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
