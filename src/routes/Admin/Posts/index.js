import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getPosts, deletePost } from "../../../services/posts";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const AdminContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #002f52;
`;

const PostList = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const PostCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostInfo = styled.div`
  flex: 1;
`;

const PostTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #326589;
`;

const PostContent = styled.p`
  color: #666;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostAuthor = styled.span`
  font-size: 0.9rem;
  color: #888;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const EditButton = styled(ActionButton)`
  background-color: #326589;
  color: white;

  &:hover {
    background-color: #254d6b;
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: #dc3545;
  color: white;

  &:hover {
    background-color: #bb2d3b;
  }
`;

const CreateButton = styled(Link)`
  display: inline-block;
  background-color: #28a745;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  margin-bottom: 2rem;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: #218838;
    transform: translateY(-2px);
  }
`;

function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getPosts();
        setPosts(postsData);
      } catch (error) {
        console.error("Erro ao carregar posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = (postId) => {
    confirmAlert({
      title: "Confirmar exclusão",
      message: "Tem certeza que deseja excluir este post?",
      buttons: [
        {
          label: "Sim",
          onClick: async () => {
            try {
              await deletePost(postId);
              setPosts(posts.filter((post) => post._id !== postId));
            } catch (error) {
              console.error("Erro ao excluir post:", error);
            }
          },
        },
        {
          label: "Não",
          onClick: () => {},
        },
      ],
    });
  };

  if (loading) {
    return <AdminContainer>Carregando posts...</AdminContainer>;
  }

  return (
    <AdminContainer>
      <Title>Administração de Posts</Title>
      <CreateButton to="/postagem">Criar Novo Post</CreateButton>

      <PostList>
        {posts.map((post) => (
          <PostCard key={post._id}>
            <PostInfo>
              <PostTitle>{post.titulo}</PostTitle>
              <PostContent>{post.conteudo}</PostContent>
              <PostAuthor>
                Autor: {post.autor?.nome || "Desconhecido"}
              </PostAuthor>
            </PostInfo>

            <Actions>
              <EditButton as={Link} to={`/postagem/editar/${post._id}`}>
                Editar
              </EditButton>
              <DeleteButton onClick={() => handleDelete(post._id)}>
                Excluir
              </DeleteButton>
            </Actions>
          </PostCard>
        ))}
      </PostList>
    </AdminContainer>
  );
}

export default AdminPosts;
