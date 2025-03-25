import Input from "../Input";
import styled from "styled-components";
import { useState } from "react";
import { createAutor } from "../../services/authors";
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

const ErrorMessage = styled.p`
  color: #ff6b6b;
  margin-top: 10px;
`;

function AutorForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const showSuccessAlert = () => {
    confirmAlert({
      title: "Sucesso!",
      message: "Autor cadastrado com sucesso!",
      buttons: [
        {
          label: "OK",
          onClick: () => {},
        },
      ],
      overlayClassName: "success-overlay",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!nome || !email) {
        throw new Error("Nome e email são obrigatórios");
      }

      await createAutor({ nome, email });

      setNome("");
      setEmail("");
      showSuccessAlert();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Erro ao cadastrar autor"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <Title>Cadastrar Novo Autor</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar Autor"}
        </Button>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </FormContainer>
  );
}

export default AutorForm;
