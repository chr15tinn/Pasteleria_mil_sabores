import { createContext, useContext, useEffect, useState } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = authService.getCurrentUser()

    if (savedUser) {
      setUser(savedUser)
    }

    setLoading(false)
  }, [])

  async function login(email, password) {
    const result = await authService.authenticate(
      email,
      password
    )

    if (result.success) {
      setUser(result.user)
    }

    return result
  }

  function logout() {
    authService.logout()
    setUser(null)
  }

  const isAuthenticated =
    Boolean(user && authService.getToken())

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}