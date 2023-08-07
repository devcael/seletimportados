"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import "@styles/fonts.css"
import { Inter } from "next/font/google";
import '../globals.css'
import styled from 'styled-components';
import { InputHookForm } from '@/components/InputHookForm';
import { useForm } from 'react-hook-form';
import SimpleInput from '@/components/simple-input';
const inter = Inter({ subsets: ['latin'] })

const Container = styled.div`
    display: inline;
     &::-webkit-scrollbar {
    display: none;
    width: 0.2rem;
    height: 0.5rem;
  }
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    position: relative;
    width: 100%;
    max-width: 800px;
    height: 100%;
    padding: 0px 20px;
`

const Main = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: var(--bg-blue);
`

const WellCome = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 25px 0px;
    border-bottom: 1px solid var(--gray-color);
    text-align: center;
    
`

const SessionTitle = styled.div`
    display: flex;
    flex-direction: column;
    padding: 25px 0px;
`

const InputContinerRow = styled.div`
    display: flex;
    width: 100%;
    align-items: stretch;
    flex-direction: row;
    gap: 15px;
`

const SubmitInput = styled.input`
    width: 100%;
    padding: 10px;
    background-color: var(--secodary-blue);
    outline: none;
    border-radius: 5px;
    border: none;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    
`


export default function NewCliente() {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()
    const onSubmit = (data: object) => console.log(data)

    return (
        <Main>
            <Container>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <WellCome>
                        <h2>Formulario de novo cliente</h2>
                        <p>Nossas boas-vindas! Este é um espaço seguro para você compartilhar seus dados conosco</p>
                    </WellCome>
                    <SessionTitle>
                        <h2>Dados Básicos</h2>
                        <p>Informações básicas sobre a sua pessoa</p>
                    </SessionTitle>
                    <SimpleInput
                        inputType='text'
                        label='Nome completo (*)'
                        register={register("nomecompleto", { required: true })}
                    />
                    <SimpleInput
                        inputType='text'
                        label='Empresa (Opcional)'
                        register={register("empresa", { required: false })}
                    />
                    <SimpleInput
                        inputType='text'
                        label='Email (Opcional)'
                        register={register("email", { required: false })}
                    />
                    <SimpleInput
                        inputType='text'
                        label='Telefone (Opcional)'
                        register={register("email", { required: false })}
                    />
                    <SessionTitle>
                        <h2>Dados Para Documentos</h2>
                        <p>Informações usadas para elaborar propostas, e outros documentos</p>
                    </SessionTitle>
                    <SimpleInput
                        inputType='text'
                        label='CPF/CNPJ'
                        register={register("email", { required: false })}
                    />
                    <SimpleInput
                        inputType='text'
                        label='CEP'
                        register={register("email", { required: false })}
                    />
                    <SimpleInput
                        inputType='text'
                        label='Endereço'
                        register={register("email", { required: false })}
                    />
                    <InputContinerRow>
                        <SimpleInput
                            inputType='text'
                            label='Número'
                            register={register("email", { required: false })}
                        /> <SimpleInput
                            inputType='text'
                            label='Complemento ( Opcional )'
                            register={register("email", { required: false })}
                        />
                    </InputContinerRow>
                    <InputContinerRow>
                        <SimpleInput
                            inputType='text'
                            label='Cidade'
                            register={register("email", { required: false })}
                        /> <SimpleInput
                            inputType='text'
                            label='Estado'
                            register={register("email", { required: false })}
                        />
                    </InputContinerRow>
                    <SubmitInput type="submit" value={"Enviar Dados"} />
                </Form>
            </Container>
        </Main>
    )
}