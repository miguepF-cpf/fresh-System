"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  provider: "email" | "google" | "discord"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; message: string }>
  loginWithProvider: (userData: User) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

async function saveUserToFile(email: string, password: string, name: string) {
  try {
    const currentDate = new Date().toLocaleDateString("pt-BR")

    const response = await fetch("/api/save-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
        date: currentDate,
      }),
    })

    const result = await response.json()
    console.log("[v0] Resposta do salvamento:", result)

    return result.success
  } catch (error) {
    console.error("[v0] Erro ao salvar usuário:", error)
    return false
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("freshsystem_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    const existingUsers = JSON.parse(localStorage.getItem("freshsystem_users") || "[]")
    const foundUser = existingUsers.find((user: any) => user.email === email && user.password === password)

    if (!foundUser) {
      return { success: false, message: "Email ou senha incorretos!" }
    }

    const userData: User = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      provider: foundUser.provider || "email",
    }

    setUser(userData)
    localStorage.setItem("freshsystem_user", JSON.stringify(userData))

    return { success: true, message: "Login realizado com sucesso!" }
  }

  const loginWithProvider = (userData: User) => {
    setUser(userData)
    localStorage.setItem("freshsystem_user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("freshsystem_user")
  }

  const register = async (
    email: string,
    password: string,
    name: string,
  ): Promise<{ success: boolean; message: string }> => {
    const existingUsers = JSON.parse(localStorage.getItem("freshsystem_users") || "[]")
    const emailExists = existingUsers.some((user: any) => user.email === email)

    if (emailExists) {
      return { success: false, message: "Este email já está cadastrado!" }
    }

    const fileSaved = await saveUserToFile(email, password, name)
    if (!fileSaved) {
      console.warn("[v0] Falha ao salvar no arquivo, mas continuando com cadastro local")
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      provider: "email",
    }

    const updatedUsers = [...existingUsers, { ...newUser, password }]
    localStorage.setItem("freshsystem_users", JSON.stringify(updatedUsers))

    setUser(newUser)
    localStorage.setItem("freshsystem_user", JSON.stringify(newUser))

    return { success: true, message: "Cadastro realizado com sucesso!" }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loginWithProvider, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
