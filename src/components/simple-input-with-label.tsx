import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components"

const Input = styled.input`
  margin: 0px;
  padding: 0px;
  background-color: white;
  color: black;
  border: 1px solid var(--gray-color);
  padding: 10px;
  border-radius: 5px;
  outline: none;
  position: relative;
  width: 100%;
  
  &:focus{
    border: 1px solid var( --blue-ascent);
  }
`

function SimpleInputWithLabel(props: { label: string, description: string, type: string, register?: {} }) {
  return (
    <div style={{ width: "100%", margin: "0px", padding: "0px" }}>
      <p style={{ margin: "0px", padding: "0px" }}>{props.label}</p>
      <Input {...props.register} type={props.type} placeholder={props.description}></Input>
    </div>
  )
}

function SimpleDropDownWithLabel(props: { label: string, description: string, type: string, register?: {} }) {
  return (
    <div style={{ width: "100%", margin: "0px", padding: "0px" }}>
      <p style={{ margin: "0px", padding: "0px" }}>{props.label}</p>
      <Input {...props.register} type={props.type} placeholder={props.description}></Input>
    </div>
  )
}

export { SimpleInputWithLabel, SimpleDropDownWithLabel };