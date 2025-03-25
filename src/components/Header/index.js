import Logo from "../Logo";
import IconsHeader from "../IconsHeader";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, removeToken } from "../../services/auth";

const HeaderContainer = styled.header`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  height: 80px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 15px;
  margin-left: 20px;
  transition: all 0.2s;

  &:hover {
    color: #007bff;
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 15px;
  margin-left: 20px;
  transition: all 0.2s;

  &:hover {
    color: #007bff;
    text-decoration: underline;
  }
`;

function Header() {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <HeaderContainer>
      <Link to="/">
        <Logo />
      </Link>

      <IconsHeader>
        {authenticated ? (
          <>
            <NavLink to="/admin/posts">ADMIN</NavLink>
            <NavLink to="/autor">AUTORES</NavLink>
            <LoginButton onClick={handleLogout}>SAIR</LoginButton>
          </>
        ) : (
          <NavLink to="/login">LOGIN</NavLink>
        )}
      </IconsHeader>
    </HeaderContainer>
  );
}

export default Header;
