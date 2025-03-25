import logo from "../../images/educonnect_custom_logo.svg";
import styled from "styled-components";

const LogoContainer = styled.div`
  display: flex;
  font-size: 30px;
`;

const LogoImg = styled.img`
  margin-right: 10px;
`;

function Logo() {
  return (
    <LogoContainer>
      <LogoImg src={logo} alt="logo" />
      <p>
        <strong>Edu</strong>Connect
      </p>
    </LogoContainer>
  );
}

export default Logo;
