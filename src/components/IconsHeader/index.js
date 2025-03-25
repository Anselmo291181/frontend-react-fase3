import perfil from "../../images/perfil.svg";
import styled from "styled-components";

const Icon = styled.li`
  margin-right: 40px;
  width: 25px;
  list-style: none;
`;

const Icons = styled.ul`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
`;

function IconsHeader({ children }) {
  return (
    <Icons>
      {children}
      <Icon>
        <img src={perfil} alt="Perfil"></img>
      </Icon>
    </Icons>
  );
}

export default IconsHeader;
