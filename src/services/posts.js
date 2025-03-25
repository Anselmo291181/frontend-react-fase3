import api from "./api";

async function getPosts() {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    throw error;
  }
}

async function getPostById(id) {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar post:", error);
    throw error;
  }
}

async function createPost(postData) {
  try {
    console.log("Enviando dados para criar post:", postData);
    const response = await api.post("/posts", postData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar post:", error.response?.data || error.message);
    throw error;
  }
}

async function updatePost(id, postData) {
  try {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    throw error;
  }
}

async function deletePost(id) {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar post:", error);
    throw error;
  }
}

export { getPosts, createPost, getPostById, updatePost, deletePost };
