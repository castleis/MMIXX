import { useState } from "react";
import styled from "styled-components";
import xIcon from "assets/reset-search.png";
import searchIcon from "assets/search.png";

const MusicSearchBar = ({ setQuery, searchText, setSearchText }) => {
  const [focus, setFocus] = useState(false);
  // const [input, setInput] = useState("");
  // const [show, setShow] = useState(false);
  const onChange = (event) => {
    // setInput(event.target.value);
    setSearchText(event.target.value);
    // event.target.value === "" ? setShow(false) : setShow(true);
  };
  const resetInput = () => {
    // setInput("");
    setSearchText("");
    // setShow(false);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    // console.log(query);
    // if (input === "" || input.replace(/\s/g, "") === "") return;

    // setQuery(input);
    setQuery(searchText);
  };
  const onFocus = () => {
    // console.log("focus!");
    setFocus(true);
  };
  const onBlur = () => {
    // console.log("blur!");
    setFocus(false);
  };
  return (
    <Form onSubmit={onSubmit} focus={focus}>
      <img src={searchIcon} alt='' width='14'></img>
      <Input onFocus={onFocus} onBlur={onBlur} type='text' value={searchText} onChange={onChange} placeholder='곡 제목으로 검색' />
      <IconBtn type='button' onClick={resetInput} show={searchText !== ""}>
        <img src={xIcon} alt='' width='10'></img>
      </IconBtn>
    </Form>
  );
};
const Form = styled.form`
  background-color: ${({ theme }) => theme.palette.darkgray};
  color: ${({ theme }) => theme.palette.light};
  padding: 10px 20px;
  border: 1.6px solid ${({ theme }) => theme.palette.light};
  ${({ focus, theme }) =>
    focus &&
    `
    border: 1.6px solid ${theme.palette.secondary};
  `};
  border-radius: 27px;
  // margin: 5px auto;
  height: 20px;
  // text-align: left;
  display: flex;
  align-items: center;
  width: 400px;
  transition: all 0.1s ease-in-out;
`;

const Input = styled.input`
  background-color: transparent;
  border: 0 solid transparent;
  font-size: 14px;
  font-weight: 200;
  font-family: "Heebo", sans-serif;
  color: ${({ theme }) => theme.palette.light};
  margin-left: 10px;
  width: 90%;
  &: focus {
    outline: none;
  }
`;

const IconBtn = styled.button`
  background: transparent;
  width: 20px;
  height: 20px;
  border: 1.1px solid transparent;
  border-radius: 50%;
  &: hover {
    background-color: ${({ theme }) => theme.palette.hover};
  }
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
`;

export default MusicSearchBar;
