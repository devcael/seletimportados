"use client"
import { Input, InputWithLabelProps } from "./inputs"
import { useEffect } from "react";
import { useForm, RegisterOptions } from "react-hook-form";
import { styled } from "styled-components";

type Aligment = {
    mainAxisAlignment?: string;
    crossAxisAlignment?: string;
}


const Column = styled.div<Aligment>`
    display: flex;
    width: 100%;
    align-items: ${props => (props.mainAxisAlignment ?? 'center')};
    justify-content: ${props => (props.crossAxisAlignment ?? "center")};
    flex-direction: column;
    
`;

const Row = styled.div<Aligment>`
    display: flex;
    width: 100%;
    align-items: ${props => (props.mainAxisAlignment ?? 'center')};
    justify-content: ${props => (props.crossAxisAlignment ?? "center")};
    flex-direction: row;
    
`;



function InputHookForm(props: InputWithLabelProps) {
    const { register } = useForm();

    useEffect(() => {
        if (props.hookFormObject) {
            register(props.hookFormObject); // Registra o objeto do RHF para o input
        }
    }, [register, props.hookFormObject]);

    return (

        <Column mainAxisAlignment="start">
            <h4>{props.label}</h4>
            <Input></Input>
        </Column>

    );
}

export { InputHookForm };