import { ReactNode } from "react"
import styled from "styled-components"

const Icon = styled.i`
 
`
const InputIcon = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  background-color: transparent;
  padding: 4px;
  position: absolute;
  box-sizing:border-box;
  top:50%;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 15px;
  transform: translateY(-50%);
  margin: 0;
  color: var(--gray-color);
`

const Wrapper = styled.label`
 position:relative;
 padding: 5px;

`

const Input = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid  var(--gray-color);
  padding-left: 3rem;
  background: white;
  color: black;
   text-overflow: ellipsis;
   
    &:focus{
    border-color: #007bff; 
  }
   
  &::placeholder{
    color: var(--gray-color);
  }
  
  
 
  
`



export default function InputWithIcon(props: { inputIcon: ReactNode, placeHolder?: string, onChange?: (value: string) => void }) {

  const handleInputChange = (event: any) => {
    const newValue = event.target.value;
    props.onChange?.(newValue);
  };

  return (
    <Wrapper>
      <Input onChange={handleInputChange} placeholder={props.placeHolder ?? ""}></Input>
      <InputIcon>{props.inputIcon}</InputIcon>
    </Wrapper>
  )
}

export {
  Icon
}