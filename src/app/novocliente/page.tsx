"use client"
import "@styles/home.css"
import "@styles/fonts.css"
import { Input } from "@components/inputs"
import { Inter } from 'next/font/google'
import { SubmitHandler, useForm } from "react-hook-form"



const inter = Inter({ subsets: ['latin'] })

type NovoClienteFormInputs = {
    nomeCompleto: string;
}



export default function Home() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<NovoClienteFormInputs>()
    const onSubmit: SubmitHandler<NovoClienteFormInputs> = (data) => console.log(data)

    return (
        <div className="container">
            <header>
                <h3>FORMULARIO DE NOVO CLIENTE</h3>
                <p>Nossas boas-vindas! Este é um espaço seguro para você compartilhar seus dados e da sua empresa conosco.</p>
            </header>
            <Input></Input>
            <div className="separator"></div>
            <div className="data-label">
                <h3>Dados Basicos</h3>
                <p>Informações básicas sobre a pessoa e a empresa.</p>
            </div>
            <div className="image-container">
                <a href=""><div className="image"></div></a>
                <div className="image-info">
                    <h3>Imagem de Perfil</h3>
                    <p>Selecione uma foto quadrada. Você pode usar tanto uma foto como uma logo, fique a vontade!</p>
                </div>
            </div>
        </div>
    )
}
