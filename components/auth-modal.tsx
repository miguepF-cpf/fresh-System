"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Chrome, Mail } from "lucide-react"
import { useAuth } from "./auth-context"

export function AuthModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("") // Added error state for displaying validation messages
  const { login, register, loginWithProvider } = useAuth()

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const userData = {
      id: `google_${Date.now()}`,
      name: "Usuário Google",
      email: "usuario@gmail.com",
      avatar: `https://ui-avatars.com/api/?name=Usuario+Google&background=8b5cf6&color=fff`,
      provider: "google" as const,
    }

    loginWithProvider(userData)
    setIsLoading(false)
    setIsOpen(false)
  }

  const handleDiscordLogin = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const userData = {
      id: `discord_${Date.now()}`,
      name: "Usuário Discord",
      email: "usuario@discord.com",
      avatar: `https://ui-avatars.com/api/?name=Usuario+Discord&background=5865f2&color=fff`,
      provider: "discord" as const,
    }

    loginWithProvider(userData)
    setIsLoading(false)
    setIsOpen(false)
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password || (!isLogin && !name)) return

    setIsLoading(true)
    setError("")

    try {
      if (isLogin) {
        const result = await login(email, password)

        if (!result.success) {
          setError(result.message)
          setIsLoading(false)
          return
        }

        setIsOpen(false)
      } else {
        const result = await register(email, password, name)

        if (!result.success) {
          setError(result.message)
          setIsLoading(false)
          return
        }

        setIsOpen(false)
      }

      // Reset form
      setEmail("")
      setPassword("")
      setName("")
    } catch (err) {
      setError("Erro ao processar solicitação")
    }

    setIsLoading(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-transparent">
          <User className="w-4 h-4 mr-2" />
          Entrar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-heading">
            {isLogin ? "Entre na Fresh System" : "Crie sua conta"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="text-sm text-red-500 text-center bg-red-50 dark:bg-red-950/20 p-2 rounded">{error}</div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              <Mail className="w-4 h-4 mr-2" />
              {isLoading ? "Carregando..." : isLogin ? "Entrar" : "Criar conta"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Ou continue com</span>
            </div>
          </div>

          <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
          >
            <Chrome className="w-5 h-5 mr-2" />
            {isLoading ? "Carregando..." : "Continuar com Google"}
          </Button>

          <Button
            onClick={handleDiscordLogin}
            disabled={isLoading}
            className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            {isLoading ? "Carregando..." : "Continuar com Discord"}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin)
                setError("")
              }}
              className="text-sm text-muted-foreground hover:text-primary underline"
            >
              {isLogin ? "Não tem conta? Criar uma" : "Já tem conta? Fazer login"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
