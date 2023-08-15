import Utils from "@/domain/services/Utils";
import { ChangeEvent, use, useEffect, useState } from "react";
import { UseFormRegisterReturn, useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import DropDown, { OptionProps } from "./simple-dropdown";

type SimpleInputProps = {
    placeHolder?: string;
    style?: object;
    readonly?: boolean;
    label?: string;
    inputType: string;
    register?: object;
    defaultValue?: string;
    formatterFunction?: (value: string) => string;
    onInput?: (input: HTMLInputElement) => void;
    onChange?: (value: string) => void;
}

type SimpleDropDownProps = {
    label?: string;
    items: OptionProps[]

    style?: object;
    onChange?: (value: string) => void;
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


const StyledInput = styled.input`
  padding: 8px;
  font-size: 16px;
`;


function InputWithLabelAndFormatter(props: SimpleInputProps) {
    const { control, handleSubmit } = useForm();

    function formatador(valor: string): string {
        if (!valor) return "";
        if (props.formatterFunction != undefined || props.formatterFunction != null) {
            return props.formatterFunction(valor);
        }
        return valor;
    }


    return (

        <Controller
            name="valor"
            control={control}
            defaultValue={props.defaultValue ?? "0.00"}
            render={({ field }) => (

                <InputContainer>
                    {props.label != null ? <p>{props.label ?? ""}</p> : ""}
                    <Input
                        readOnly={props.readonly ?? false}
                        {...field}
                        value={formatador(field.value)}
                        onChange={(e) => {
                            const valor = e.target.value.replace(/[^\d]/g, '');
                            field.onChange(valor);
                            props.onChange?.(formatador(e.target.value));

                        }}
                        type={props.inputType}
                        placeholder={props.placeHolder ?? ""}
                        {...props.register} />
                </InputContainer>
            )}
        />
    );
}





function SimpleInput(props: SimpleInputProps) {

    const [inputValue, setInputValue] = useState(props.defaultValue ?? "");


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setInputValue(event.target.value);
        const newValue = event.target.value;
        props.onChange?.(newValue);
    };


    return (
        <InputContainer>
            {props.label != null ? <p>{props.label ?? ""}</p> : ""}
            <Input readOnly={props.readonly ?? false} style={props.style ?? {}} onChange={handleInputChange} type={props.inputType} placeholder={props.placeHolder ?? ""} {...props.register} ></Input>
        </InputContainer>
    );
}

function SimpleDropdown(props: SimpleDropDownProps) {

    const handleInputChange = (value: string) => {
        props.onChange?.(value);
    };


    return (
        <InputContainer>
            {props.label != null ? <p>{props.label ?? ""}</p> : ""}
            <DropDown style={props.style ?? {}} items={props.items} onChange={handleInputChange} />
        </InputContainer>
    );
}

export {
    SimpleInput, SimpleDropdown,
    InputWithLabelAndFormatter
}