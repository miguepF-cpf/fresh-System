import { type NextRequest, NextResponse } from "next/server"
import { addUser } from "@/lib/users-storage"

export async function POST(request: NextRequest) {
  try {
    const { email, name, password, date } = await request.json()

    const novoUsuario = {
      id: Date.now(),
      data: date,
      email,
      senha: password,
      nome: name,
      criadoEm: new Date().toISOString(),
    }

    // Adicionar à memória
    addUser(novoUsuario)

    console.log("[v0] Usuário salvo com sucesso:", novoUsuario)

    return NextResponse.json({
      success: true,
      message: "Usuário salvo com sucesso",
      user: novoUsuario,
    })
  } catch (error) {
    console.error("[v0] Erro ao salvar usuário:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao salvar usuário",
      },
      { status: 500 },
    )
  }
}
