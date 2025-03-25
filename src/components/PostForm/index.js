import Input from "../Input";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { createPost } from "../../services/posts";
import { getAutores } from "../../services/authors";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

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

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  transition: 0.3s;
  width: 100%;

  &:focus {
    border-color: #326589;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  margin-top: 10px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
  min-height: 100px;
  resize: vertical;
`;

function PostForm() {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [autorId, setAutorId] = useState("");
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAutores = async () => {
      try {
        setLoading(true);
        const autoresData = await getAutores();
        setAutores(autoresData);
      } catch (error) {
        console.error("Erro ao carregar autores:", error);
        setError("Erro ao carregar autores");
      } finally {
        setLoading(false);
      }
    };

    fetchAutores();
  }, []);

  const showSuccessAlert = () => {
    confirmAlert({
      title: "Sucesso",
      message: "Post criado com sucesso!",
      buttons: [
        {
          label: "OK",
          onClick: () => {
            setTitulo("");
            setConteudo("");
            setAutorId("");
          },
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!titulo || !conteudo || !autorId) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    try {
      setLoading(true);
      await createPost({
        titulo,
        conteudo,
        autor: autorId,
      });
      showSuccessAlert();
    } catch (error) {
      console.error("Erro ao criar post:", error);
      setError(
        error.response?.data?.message || error.message || "Erro ao criar post"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <Title>Criar Novo Post</Title>
      <Form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Input
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
          disabled={loading && autores.length === 0}
        >
          <option value="">Selecione o autor</option>
          {autores.map((autor) => (
            <option key={autor._id} value={autor._id}>
              {autor.nome}
            </option>
          ))}
        </Select>

        <Button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Criar Post"}
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PostForm;
