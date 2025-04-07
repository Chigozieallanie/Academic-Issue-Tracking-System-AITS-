import styled, { css } from "styled-components";



const Button =styled.button`

  background: linear-gradient(135deg, #1abc9c, #16a085);
  color: #fff;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  ${props=>props.type==="save"&&css`
    background-color: red;


`}
${props=>props.type==="submit"&&css`
    background-color: blue;


`}
  &:hover{
  
   background: linear-gradient(135deg, #16a085, #1abc9c);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(26, 188, 156, 0.3);
  }
`

export default Button