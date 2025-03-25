import React from "react";
import styled from "styled-components";

const PostContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  font-size: 24px;
  color: #002f52;
`;

const Author = styled.p`
  font-size: 16px;
  color: #326589;
  margin-top: 5px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 10px;
`;

function PostItem({ post }) {
  return (
    <PostContainer>
      <Title>{post.titulo}</Title>
      <Author>Autor: {post.autor.nome}</Author>
      <Description>{post.conteudo.slice(0, 100)}...</Description>{" "}
    </PostContainer>
  );
}

export default PostItem;
