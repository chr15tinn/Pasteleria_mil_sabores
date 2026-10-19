import {
  createContext,
  useContext,
  useState
} from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {

    const storedUser =
      localStorage.getItem('usuarioActual')

    return storedUser
      ? JSON.parse(storedUser)
      : null
  })


  function login(userData) {

    localStorage.setItem(
      'usuarioActual',
      JSON.stringify(userData)
    )

    setUser(userData)
  }


  function logout() {

    localStorage.removeItem(
      'usuarioActual'
    )

    setUser(null)
  }


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >

      {children}

    </AuthContext.Provider>
  )
}


export function useAuth() {
  return useContext(AuthContext)
}