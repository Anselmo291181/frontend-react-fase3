import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getPosts } from "../../services/posts";
import PostItem from "./PostItem";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const ListContainer = styled.section`
  background-color: #f7f7f7;
  padding: 30px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
`;

function PostList() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getPosts();
        setPosts(postsData);
      } catch (error) {
        console.error("Erro ao carregar posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.conteudo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ListContainer>
      <Title>Lista de Posts</Title>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {filteredPosts.map((post) => (
        <Link
          key={post._id}
          to={`/postagem/${post._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <PostItem post={post} />
        </Link>
      ))}
    </ListContainer>
  );
}

export default PostList;
