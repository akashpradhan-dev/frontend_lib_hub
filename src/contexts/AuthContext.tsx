import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import { User } from '../services/mutation/login'
import { useMeQuery } from '@/services/query/useMeQuery'
import { useQueryClient } from '@tanstack/react-query'
import { PUBLIC_ROUTES } from '@/constants/constant'
import { usePathname } from 'next/navigation'
import Cookie from 'js-cookie'
interface AuthContextType {
  user: User | null
  login: (userData: User) => void
  logout: () => void
  isLoggedIn: boolean
  setProfile: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()

  const isPublicRoute = PUBLIC_ROUTES.some(route => {
    if (route === '/') return pathname === '/'
    return pathname.startsWith(route)
  })

  const queryClient = useQueryClient()
  const [user, setUser] = useState<User | null>(null)
  const { data } = useMeQuery({ enabled: !isPublicRoute && user === null })

  useEffect(() => {
    if (data?.data) {
      setUser(data.data)
    } else {
      setUser(null)
    }
  }, [data])

  const login = (userData: User) => {
    setUser(userData)
    queryClient.invalidateQueries({
      queryKey: ['me'],
    })
  }

  const logout = () => {
    queryClient.invalidateQueries({
      queryKey: ['me'],
    })
    setUser(null)
    Cookie.remove('token')
  }

  const setProfile = (user: User) => {
    setUser(user)
    queryClient.invalidateQueries({
      queryKey: ['me'],
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        setProfile,
        isLoggedIn: !!user,
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
