import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getPostById } from "../services/posts";

const Container = styled.div`
  width: 80%;
  max-width: 800px;
  margin: 50px auto;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const PostTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #002f52;
  text-align: center;
`;

const PostContent = styled.div`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 30px;
  white-space: pre-wrap;
`;

const AuthorInfo = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  font-style: italic;
  text-align: right;
`;

const DateInfo = styled.div`
  color: #666;
  font-size: 14px;
  margin-top: 10px;
`;

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (error) {
        console.error("Erro ao carregar o post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <Container>Carregando post...</Container>;
  }

  if (!post) {
    return <Container>Post não encontrado.</Container>;
  }

  return (
    <Container>
      <PostTitle>{post.titulo}</PostTitle>

      <PostContent>{post.conteudo}</PostContent>

      {post.autor && (
        <AuthorInfo>
          <div>Autor: {post.autor.nome}</div>
          {post.createdAt && (
            <DateInfo>
              Publicado em: {new Date(post.createdAt).toLocaleDateString()}
            </DateInfo>
          )}
        </AuthorInfo>
      )}
    </Container>
  );
}

export default PostDetail;
