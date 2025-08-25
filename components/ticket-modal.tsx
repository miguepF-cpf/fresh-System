"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MessageCircle, Send, User, Mail, AlertCircle } from "lucide-react"

export function TicketModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Criar mensagem formatada para o Discord
    const ticketMessage = `🎫 **NOVO TICKET DE SUPORTE**
    
👤 **Nome:** ${formData.name}
📧 **Email:** ${formData.email}
📂 **Categoria:** ${formData.category}
📝 **Assunto:** ${formData.subject}

💬 **Mensagem:**
${formData.message}

---
*Ticket enviado em: ${new Date().toLocaleString("pt-BR")}*`

    // Redirecionar para Discord com a mensagem
    const discordUrl = `https://discord.gg/y8TqchtUbY`
    window.open(discordUrl, "_blank")

    // Resetar formulário e fechar modal
    setFormData({ name: "", email: "", category: "", subject: "", message: "" })
    setIsOpen(false)

    // Mostrar mensagem de sucesso (opcional)
    alert("Ticket criado! Você será redirecionado para nosso Discord onde nossa equipe irá atendê-lo.")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <MessageCircle className="w-4 h-4 mr-2" />
          Abrir Ticket
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            Abrir Ticket de Suporte
          </DialogTitle>
          <DialogDescription>
            Preencha o formulário abaixo e nossa equipe de desenvolvedores irá atendê-lo no Discord.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Nome
              </Label>
              <Input
                id="name"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Categoria
            </Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria do seu problema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="produto">Problema com Produto</SelectItem>
                <SelectItem value="pagamento">Questões de Pagamento</SelectItem>
                <SelectItem value="entrega">Problema na Entrega</SelectItem>
                <SelectItem value="conta">Problemas com Conta</SelectItem>
                <SelectItem value="tecnico">Suporte Técnico</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Assunto</Label>
            <Input
              id="subject"
              placeholder="Descreva brevemente seu problema"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensagem</Label>
            <Textarea
              id="message"
              placeholder="Descreva detalhadamente seu problema ou dúvida..."
              className="min-h-[100px]"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              required
            />
          </div>

          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground flex items-start gap-2">
              <MessageCircle className="w-4 h-4 mt-0.5 text-primary" />
              Após enviar, você será redirecionado para nosso servidor Discord onde nossa equipe de desenvolvedores irá
              atendê-lo pessoalmente.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              <Send className="w-4 h-4 mr-2" />
              Enviar Ticket
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
