// src/entities/all.ts
export type UserType = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role?: string;
};

export const User = {
  async me(): Promise<UserType> {
    // aqui você busca o usuário logado
    return {
      id: "1",
      name: "Usuário Teste",
      email: "teste@email.com",
      avatarUrl: "",
      role: "usuario"
    };
  },

  async logout() {
    // aqui você limpa token, sessão etc.
    console.log("Usuário desconectado");
  }
};
