import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";

type SimpleInputProps = {
    placeHolder?: string;
    label?: string;
    inputType: string;

    register?: object;
}

const Input = styled.input`
    width: 100%;
    border-radius: 5px;
    background: white;
    border: 1px solid var(--gray-color);
    padding: 8px;
    color: black;
    box-shadow: 0 0 0 0;
    outline: 0;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`

export default function SimpleInput(props: SimpleInputProps) {
    return (
        <InputContainer>
            {props.label != null ? <p>{props.label ?? ""}</p> : ""}
            <Input type={props.inputType} placeholder={props.placeHolder ?? ""} {...props.register}></Input>
        </InputContainer>
    );
}