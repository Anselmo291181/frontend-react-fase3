import { posts } from "./recentPostsData";
import { Title } from "../Title";
import RecommendationCard from "../RecommendationCard";
import bookImage from "../../images/livro2.png";
import styled from "styled-components";

const RecentPostsData = styled.section`
  background-color: #ebecee;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const NewPostContainer = styled.div`
  margin-top: 30px;
  display: flex;
  width: 100%;
  justify-content: center;
  cursor: pointer;
`;

function RecentPosts() {
  return (
    <RecentPostsData>
      <Title color="#eb9b00" fontSize="36px">
        POSTAGENS RECENTES
      </Title>
      <NewPostContainer>
        {posts.map((post) => (
          <img src={post.src} />
        ))}
      </NewPostContainer>
      <RecommendationCard
        title={"Recado importante..."}
        subtitle={"Prazo final para entrega de atividades!"}
        description={
          "Não se esqueçam que o prazo para envio das atividades termina nesta sexta-feira às 23h59. Evitem atrasos!"
        }
        img={bookImage}
      />
    </RecentPostsData>
  );
}

export default RecentPosts;
