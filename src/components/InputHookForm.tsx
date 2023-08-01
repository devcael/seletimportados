"use client"
import { type } from "os";
import { Input, InputWithLabelProps } from "./styled-components/inputs"
import { useEffect } from "react";
import { useForm, RegisterOptions } from "react-hook-form";
import { Column } from "./styled-components/column";


function InputHookForm(props: InputWithLabelProps) {
    const { register } = useForm();

    useEffect(() => {
        if (props.hookFormObject) {
            register(props.hookFormObject); // Registra o objeto do RHF para o input
        }
    }, [register, props.hookFormObject]);

    return (

        <Column mainAxisAlignment="start">
            {props.label != null ? <h4>{props.label}</h4> : ""}
            <Input></Input>
        </Column>

    );
}

export { InputHookForm };
