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
  setProfile: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const role = Cookies.get('userRole')

    if (role) {
      setUser({
        email: '',
        name: '',
        role: role as 'admin' | 'user',
      })
    }
  }, [])

  const login = (userData: User) => {
    Cookies.set('userRole', userData.role, { expires: 7, secure: true })
    setUser(userData)
  }

  const logout = () => {
    Cookies.remove('userRole')
    setUser(null)
  }

  const setProfile = (user: User) => {
    setUser(user)
  }

  const isLoggedIn = !!user?.role

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isLoggedIn, setProfile }}
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
