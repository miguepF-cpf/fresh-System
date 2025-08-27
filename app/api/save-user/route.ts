import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    // Pega o corpo da requisição
    const body = await req.json()
    const { name, email, password } = body

    // Faz a chamada para o Google Apps Script
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwASOtt9o1IlsXbvm2sl4oe3zIbQSQNCRQVjw1dPSPRch8AzDi5z5dCGBxVbo-b67c3/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      }
    )

    // Pega a resposta do script
    const data = await response.json()

    // Retorna para o navegador
    return NextResponse.json(data)
  } catch (err) {
    console.error("❌ Erro API save-user:", err)
    return NextResponse.json(
      { error: "Erro ao salvar usuário" },
      { status: 500 }
    )
  }
}
