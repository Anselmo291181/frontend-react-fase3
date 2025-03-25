import styled from "styled-components";
import PostList from "../components/PostList/PostList";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(90deg, #002f52 35%, #326589);

  li {
    list-style: none;
  }
`;

function Home() {
  return (
    <AppContainer>
      <PostList />
    </AppContainer>
  );
}

export default Home;
