import api from "./api";

async function createAutor(autorData) {
  try {
    const response = await api.post("/autores", {
      nome: autorData.nome,
      email: autorData.email,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao cadastrar autor:",
      error.response?.data || error.message
    );
    throw error;
  }
}

async function getAutores() {
  try {
    const response = await api.get("/autores");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar autores:", error);
    throw error;
  }
}

export { createAutor, getAutores };
