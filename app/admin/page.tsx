"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Users, Calendar, Mail, Lock } from "lucide-react"

interface User {
  data: string
  email: string
  senha: string
  nome: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [showPasswords, setShowPasswords] = useState(false)
  const [loading, setLoading] = useState(false)

  // Senha do admin (você pode mudar esta senha)
  const ADMIN_PASSWORD = "freshsystem2024"

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      loadUsers()
    } else {
      alert("Senha incorreta!")
    }
  }

  const loadUsers = async () => {
    console.log("[v0] Carregando usuários...")
    setLoading(true)
    try {
      const response = await fetch("/api/get-users")
      console.log("[v0] Resposta da API:", response.status)
      if (response.ok) {
        const userData = await response.json()
        console.log("[v0] Dados recebidos:", userData)
        setUsers(userData)
      } else {
        console.log("[v0] Erro na resposta:", response.statusText)
      }
    } catch (error) {
      console.error("[v0] Erro ao carregar usuários:", error)
    }
    setLoading(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Área Administrativa</CardTitle>
            <CardDescription>Digite a senha para acessar os dados dos usuários</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Senha do Administrador</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Digite a senha..."
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              <Lock className="w-4 h-4 mr-2" />
              Entrar
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <p className="text-muted-foreground">Gerencie os usuários cadastrados no Fresh System</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setShowPasswords(!showPasswords)} size="sm">
              {showPasswords ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showPasswords ? "Ocultar" : "Mostrar"} Senhas
            </Button>
            <Button onClick={loadUsers} size="sm">
              Atualizar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cadastros Hoje</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter((user) => new Date(user.data).toDateString() === new Date().toDateString()).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Último Cadastro</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium">
                {users.length > 0 ? formatDate(users[users.length - 1].data) : "Nenhum"}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Usuários Cadastrados</CardTitle>
            <CardDescription>Lista completa de todos os usuários registrados</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Carregando...</div>
            ) : users.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">Nenhum usuário cadastrado ainda</div>
            ) : (
              <div className="space-y-4">
                {users.map((user, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">#{index + 1}</Badge>
                        <span className="font-medium">{user.nome}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{formatDate(user.data)}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Email: </span>
                        <span className="font-mono">{user.email}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Senha: </span>
                        <span className="font-mono">{showPasswords ? user.senha : "••••••••"}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
