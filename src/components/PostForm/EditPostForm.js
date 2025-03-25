import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getPostById, updatePost } from "../../services/posts";
import { getAutores } from "../../services/authors";

const FormContainer = styled.section`
  background-image: linear-gradient(90deg, #002f52 35%, #326589 165%);
  color: #fff;
  text-align: center;
  padding: 50px 20px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  border-radius: 8px;
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
  min-height: 150px;
  resize: vertical;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  background-color: #326589;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;

  &:hover {
    background-color: #254d6b;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
`;

function EditPostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [autorId, setAutorId] = useState("");
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [postData, autoresData] = await Promise.all([
          getPostById(id),
          getAutores(),
        ]);

        setTitulo(postData.titulo);
        setConteudo(postData.conteudo);
        setAutorId(postData.autor?._id || "");
        setAutores(autoresData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setError("Erro ao carregar dados do post");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await updatePost(id, { titulo, conteudo, autor: autorId });
      navigate(`/postagem/${id}`);
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
      setError(error.response?.data?.message || "Erro ao atualizar post");
    }
  };

  if (loading) {
    return <FormContainer>Carregando...</FormContainer>;
  }

  return (
    <FormContainer>
      <Title>Editar Post</Title>
      <Form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <TextArea
          placeholder="Conteúdo"
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          required
        />

        <Select
          value={autorId}
          onChange={(e) => setAutorId(e.target.value)}
          required
        >
          <option value="">Selecione o autor</option>
          {autores.map((autor) => (
            <option key={autor._id} value={autor._id}>
              {autor.nome}
            </option>
          ))}
        </Select>

        <Button type="submit">Salvar Alterações</Button>
      </Form>
    </FormContainer>
  );
}

export default EditPostForm;
