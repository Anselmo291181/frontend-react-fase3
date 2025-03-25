import { Link } from "react-router-dom";
import styled from "styled-components";

const Options = styled.ul`
  display: flex;
  height: 100%;
  margin: 0;
  padding: 0;
`;

const Option = styled.li`
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  padding: 0 5px;
  cursor: pointer;
  min-width: 120px;
  list-style: none;
`;

const OptionLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  padding: 10px 0;

  &:hover {
    color: #007bff;
  }
`;

function OptionsHeader({ authenticated }) {
  const options = authenticated ? ["POSTAGEM", "AUTOR", "PERFIL"] : [];

  return (
    <Options>
      {options.map((text, index) => (
        <Option key={index}>
          <OptionLink to={`/${text.toLowerCase()}`}>
            <p>{text}</p>
          </OptionLink>
        </Option>
      ))}
    </Options>
  );
}

export default OptionsHeader;
