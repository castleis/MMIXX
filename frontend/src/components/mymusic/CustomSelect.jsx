import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import LightOutlineBtn from "./LightOutlineBtn";

const CustomSelect = ({ options, selectKind, setSelect }) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(selectKind);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function onClickOutside(event) {
      if (!show) return;
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShow(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [wrapperRef, show]);

  const onClick = () => {
    setShow((current) => !current);
  };

  const onSelect = (event) => {
    onClick();
    setSelected(event.target.innerText.replace(/^\s*/, ""));
    setSelect(event.target.getAttribute("value"));
    // goSearch(true);
  };

  return (
    <Section ref={wrapperRef}>
      <LightOutlineBtn onClick={onClick} active={show}>
        {selected}
      </LightOutlineBtn>
      <Ul show={show}>
        {options.map((option, index) =>
          option[0] === "optgroup" ? (
            <OptGroup key={index}>{option[1]}</OptGroup>
          ) : (
            <Li key={index} value={option[0]} onClick={onSelect}>
              {option[1]}
            </Li>
          )
        )}
      </Ul>
    </Section>
  );
};
const Section = styled.section`
  display: block;
  margin-left: 20px;
  // padding: 0;
  // position: relative;
`;

const Ul = styled.ul`
  // background-color: ${({ theme }) => theme.palette.darkgray};
  background-color: rgb(36, 39, 40);
  border: 1.6px solid ${({ theme }) => theme.palette.secondary};
  padding: 10px 10px;
  border-radius: 10px;
  // margin: 5px auto;
  font-size: 14px;
  // height: 40px;
  width: 100px;
  text-align: left;
  font-family: "Heebo", sans-serif;
  // align-items: center;
  list-style-type: none;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  // display: ${(props) => (props.show ? "block" : "none")};
  position: absolute;
  // top: 100%;
  z-index: 1;
`;
// flex-direction: column;
const Li = styled.li`
  padding: 1px 0px 1px 0px;
  cursor: pointer;
  &: hover {
    background-color: ${({ theme }) => theme.palette.hover};
  }
`;

const OptGroup = styled.li`
  color: ${({ theme }) => theme.palette.secondary};
`;
export default CustomSelect;
