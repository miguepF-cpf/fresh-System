"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail } from "lucide-react"
import { useAuth } from "./auth-context"

export function AuthModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login, register } = useAuth()

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
