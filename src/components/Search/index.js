import Input from "../Input";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getPosts } from "../../services/posts";
// import { posts } from "./postData";

const SearchContainer = styled.section`
  background-image: linear-gradient(90deg, #002f52 35%, #326589 165%);
  color: #fff;
  text-align: center;
  padding: 85px 0;
  height: 270px;
  width: 100%;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 36px;
  text-align: center;
  width: 100%;
`;

const SubTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 40px;
`;

function Search() {
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const postsFromApi = await getPosts();
    setPosts(postsFromApi);
  }

  return (
    <SearchContainer>
      <Title>Quer pesquisar pela descrição dos posts?</Title>
      <SubTitle>Encontre pela postagem na listagem dos posts.</SubTitle>
      <Input
        placeholder="Escreva pela postagem que procura"
        onBlur={(event) => {
          const typedPost = event.target.value;
          const searchResult = posts.filter((post) =>
            post.titulo.includes(typedPost)
          );
          setSearchedPosts(searchResult);
        }}
      />
      {searchedPosts.map((post) => (
        <div>
          <p>{post.titulo}</p>
          <p>{post.conteudo}</p>
          {/* <p>{post.autor}</p> */}

          {/* <p>{post.title}</p>
          <p>{post.content}</p>
          <p>{post.author}</p>
          <img src={post.src} /> */}
        </div>
      ))}
    </SearchContainer>
  );
}

export default Search;
