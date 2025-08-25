interface User {
  id: number
  data: string
  email: string
  senha: string
  nome: string
  criadoEm: string
}

// Armazenamento global em memória
let usersInMemory: User[] = []

export function addUser(user: User) {
  usersInMemory.push(user)
  console.log("[v0] Usuário adicionado à memória:", user)
  console.log("[v0] Total de usuários na memória:", usersInMemory.length)
}

export function getUsers(): User[] {
  console.log("[v0] Buscando usuários da memória, total:", usersInMemory.length)
  return usersInMemory
}

export function clearUsers() {
  usersInMemory = []
}
