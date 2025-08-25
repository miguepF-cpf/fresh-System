"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthModal } from "@/components/auth-modal"
import { UserMenu } from "@/components/user-menu"
import { Snowfall } from "@/components/snowfall"
import { ShoppingCart, Shield, Zap, Star, Users, GamepadIcon, Music, Video, MessageCircle } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/components/auth-context"

const products = [
  {
    id: 1,
    name: "ExitLag (30 dias)",
    price: "R$ 13,20",
    category: "Gaming",
    icon: <GamepadIcon className="w-5 h-5" />,
    description: "Reduza seu ping e melhore sua conexão nos jogos",
    popular: false,
  },
  {
    id: 2,
    name: "Discord Membros (100)",
    price: "R$ 5,50",
    category: "Social",
    icon: <Users className="w-5 h-5" />,
    description: "100 membros reais para seu servidor Discord",
    popular: false,
  },
  {
    id: 3,
    name: "Impulsos Discord (Boosts)",
    price: "R$ 9,90",
    category: "Social",
    icon: <Zap className="w-5 h-5" />,
    description: "Boosts para melhorar seu servidor Discord",
    popular: true,
  },
  {
    id: 4,
    name: "Mine FA (Full Access)",
    price: "R$ 55,00",
    category: "Gaming",
    icon: <GamepadIcon className="w-5 h-5" />,
    description: "Acesso completo ao Minecraft com todas as funcionalidades",
    popular: false,
  },
  {
    id: 5,
    name: "Conta Virgem DC",
    price: "R$ 27,50",
    category: "Social",
    icon: <MessageCircle className="w-5 h-5" />,
    description: "Conta Discord original sem histórico de uso",
    popular: false,
  },
  {
    id: 6,
    name: "Membros Discord (1k)",
    price: "R$ 30,80", // Reduced price by 20% from R$ 38,50 to R$ 30,80
    category: "Social",
    icon: <Users className="w-5 h-5" />,
    description: "1000 membros reais para seu servidor Discord",
    popular: true,
  },
  {
    id: 7,
    name: "Minecraft Game Pass (1 mês)",
    price: "R$ 11,00",
    category: "Gaming",
    icon: <GamepadIcon className="w-5 h-5" />,
    description: "Acesso ao Minecraft via Game Pass por 1 mês",
    popular: false,
  },
  {
    id: 8,
    name: "Nitrado 14x Link",
    price: "R$ 19,80",
    category: "Gaming",
    icon: <GamepadIcon className="w-5 h-5" />,
    description: "Servidor Nitrado com 14 slots por 1 mês",
    popular: false,
  },
  {
    id: 9,
    name: "TikTok Seguidores (1k)",
    price: "R$ 19,80",
    category: "Social",
    icon: <Users className="w-5 h-5" />,
    description: "1000 seguidores reais para seu TikTok",
    popular: false,
  },
  {
    id: 10,
    name: "Instagram Seguidores (1k)",
    price: "R$ 22,00",
    category: "Social",
    icon: <Users className="w-5 h-5" />,
    description: "1000 seguidores reais para seu Instagram",
    popular: false,
  },
  {
    id: 11,
    name: "Netflix Premium (1 mês)",
    price: "R$ 22,00",
    category: "Streaming",
    icon: <Video className="w-5 h-5" />,
    description: "Acesso completo ao Netflix Premium por 1 mês",
    popular: true,
  },
  {
    id: 12,
    name: "YouTube Premium (1 mês)",
    price: "R$ 11,00",
    category: "Streaming",
    icon: <Video className="w-5 h-5" />,
    description: "YouTube sem anúncios e recursos premium",
    popular: false,
  },
  {
    id: 13,
    name: "Spotify Premium (1 mês)",
    price: "R$ 11,00",
    category: "Streaming",
    icon: <Music className="w-5 h-5" />,
    description: "Música sem limites e sem anúncios",
    popular: false,
  },
]

const categories = ["Todos", "Gaming", "Social", "Streaming"]

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("Todos")
  const { user } = useAuth()

  const filteredProducts =
    activeCategory === "Todos" ? products : products.filter((product) => product.category === activeCategory)

  return (
    <div
      className="min-h-screen bg-background relative"
      style={{
        backgroundImage: "url('/fresh-system-bg.png')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Snowfall />

      {/* Background overlay for better readability */}
      <div className="fixed inset-0 bg-background/85 dark:bg-background/80 z-0"></div>

      {/* All content with relative positioning to appear above background */}
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg">
                <ShoppingCart className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Fresh System
              </h1>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <a href="#produtos" className="text-sm font-medium hover:text-primary transition-colors">
                Produtos
              </a>
              <a href="#sobre" className="text-sm font-medium hover:text-primary transition-colors">
                Sobre
              </a>
              <a href="#contato" className="text-sm font-medium hover:text-primary transition-colors">
                Contato
              </a>
              <a href="/admin" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Admin
              </a>
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              {user ? <UserMenu /> : <AuthModal />}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4 relative">
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                ...fresh system...
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contas de jogos, assinaturas de streaming, membros para Discord e muito mais. Entrega instantânea e
              suporte 24/7.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 bg-gradient-to-r from-card to-accent/10 px-4 py-2 rounded-lg border border-border/50">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">100% Seguro</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-card to-primary/10 px-4 py-2 rounded-lg border border-border/50">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Entrega Instantânea</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-card to-secondary/10 px-4 py-2 rounded-lg border border-border/50">
                <Star className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Suporte 24/7</span>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="produtos" className="py-16 px-4 bg-gradient-to-br from-muted/30 to-accent/5">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Nossos Produtos</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Escolha entre nossa seleção de produtos digitais premium com entrega imediata
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === activeCategory ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="relative group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border-border/50 bg-gradient-to-br from-card to-card/80"
                >
                  {product.popular && (
                    <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg">
                      Popular
                    </Badge>
                  )}

                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {product.icon}
                        <Badge variant="secondary" className="text-xs">
                          {product.category}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg font-heading">{product.name}</CardTitle>
                    <CardDescription className="text-sm">{product.description}</CardDescription>
                  </CardHeader>

                  <CardFooter className="pt-0">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-heading">
                        {product.price}
                      </span>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-md"
                        onClick={() => window.open("https://discord.gg/y8TqchtUbY", "_blank")}
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Comprar
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Por que escolher nossa loja?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-heading mb-2">100% Seguro</h3>
                <p className="text-muted-foreground">
                  Todas as transações são protegidas e seus dados estão seguros conosco.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-heading mb-2">Entrega Instantânea</h3>
                <p className="text-muted-foreground">
                  Receba seus produtos digitais imediatamente após a confirmação do pagamento.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-heading mb-2">Suporte 24/7</h3>
                <p className="text-muted-foreground">
                  Nossa equipe está sempre disponível para ajudar você com qualquer dúvida.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-card to-muted/50 py-12 px-4 border-t border-border/50">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg">
                    <ShoppingCart className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Fresh System
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">Sua loja de confiança para produtos digitais premium.</p>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Produtos</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Gaming
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Streaming
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Social Media
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Suporte</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Contato
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Termos de Uso
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Contato</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Email: FreshSystem@gmail.com</li>
                  <li>Discord: https://discord.gg/y8TqchtUbY</li>
                </ul>
              </div>
            </div>

            <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2024 Fresh System. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
