"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import "@styles/fonts.css"
import NavBar from "@components/navbar";
import { Inter } from "next/font/google";
import styled from "styled-components";
import '../globals.css'

import useModal from '@/hooks/useModal';
import { useEmpresa } from '@/hooks/useEmpresaFetch';
import Empresa from '@/domain/models/Empresa';
import { Form, SessionRow } from '@/components/modal-components';
import { SimpleInput } from '@/components/simple-input';
import { BtnAscent } from '@/components/buttons';
import { useForm } from 'react-hook-form';
const inter = Inter({ subsets: ['latin'] })

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  width: calc(100vw - var(--navbar-width));
  height: 100vh;
  overflow-y: scroll;
`

const AppBar = styled.div`
  position: relative;
  padding: 0px 15px;
  width: 100%;
  height: 80px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  -webkit-box-shadow: 0px 5px 8px -6px rgba(208,223,245,1);
  -moz-box-shadow: 0px 5px 8px -6px rgba(208,223,245,1);
  box-shadow: 0px 5px 8px -6px rgba(208,223,245,1);
  margin-bottom: 10px;
`

function Loading() {

    return (
        <div>Carregando....</div>
    )

}

const CompanyContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 800px;
    gap: 10px;
    padding: 15px;
    background-color: white;
    border-radius: 10px;
    -webkit-box-shadow: 0px 5px 8px -6px rgba(208,223,245,1);
    -moz-box-shadow: 0px 5px 8px -6px rgba(208,223,245,1);
    box-shadow: 0px 5px 8px -6px rgba(208,223,245,1);
`;

type EmpresaProps = {
    nome?: string;
    cpfcnpj?: string | null;
    telefone?: string | null;
    email?: string | null;
    tipo?: 'PF' | 'PJ' | null;
    endereco?: string | null;
    cep?: string | null;
    numero?: string | null;
    complemento?: string | null;
    cidade?: string | null;
    estado?: string | null;
    pais?: string | null;
    crt?: string | null;
}

function CompanyBody(props: { empresa: Empresa, update: (empresa: EmpresaProps) => void }) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<EmpresaProps>({
        defaultValues: {
            nome: props.empresa?.nome ?? "",
            cpfcnpj: props.empresa?.cpfcnpj ?? "",
            telefone: props.empresa?.telefone ?? "",
            email: props.empresa?.email ?? "",
            endereco: props.empresa?.endereco ?? "",
            cep: props.empresa?.cep ?? "",
            numero: props.empresa?.numero ?? "",
            complemento: props.empresa?.complemento ?? "",
            cidade: props.empresa?.cidade ?? "",
            estado: props.empresa?.estado ?? "",
            pais: props.empresa?.pais ?? "",
            crt: props.empresa?.crt ?? "",
        }
    });

    const handleUpdateEmpresa = (data: EmpresaProps) => {
        props.update(data);
    }

    return (<CompanyContainer>
        <Form onSubmit={handleSubmit(handleUpdateEmpresa)} >
            <SessionRow>
                <SimpleInput register={register("nome")} inputType='text' label='Razão' />
            </SessionRow>
            <SessionRow>
                <SimpleInput register={register("cpfcnpj")} inputType='text' label='Cnpj' />
            </SessionRow>
            <SessionRow>
                <SimpleInput register={register("telefone")} inputType='number' label='Celular' />
            </SessionRow>
            <SessionRow>
                <SimpleInput register={register("email")} inputType='text' label='Email' />
            </SessionRow>

            <SessionRow>
                <SimpleInput register={register("endereco")} inputType='text' label='Endereço' />
                <SimpleInput register={register("endereco")} inputType='number' label='Número' />
            </SessionRow>
            <SessionRow>
                <SimpleInput register={register("complemento")} inputType='text' label='Bairro' />
                <SimpleInput register={register("cidade")} inputType='text' label='Cidade' />
            </SessionRow>
            <SessionRow>
                <SimpleInput register={register("estado")} inputType='text' label='Estado' />
                <SimpleInput register={register("cep")} inputType='number' label='Cep' />
            </SessionRow>
            <BtnAscent type='submit'>Alterar</BtnAscent>
        </Form>

    </CompanyContainer>);
}


export default function Home() {
    const { empresa, getEmpresa, loading, updateEmpresa } = useEmpresa();

    const handleUpdateEmpresa = async (data: EmpresaProps) => {
        try {
            await updateEmpresa(data);
            alert("Empresa alterada com sucesso!");
        } catch (error) {
            alert("Erro ao alterar empresa, motivo: " + error ?? "")
        }
    }

    return (
        <main style={{ width: "100vw", height: "100vh", display: "flex" }}>
            <NavBar></NavBar>
            <BodyContainer>
                <AppBar>
                    <h2>Empresa</h2>

                </AppBar>
                {loading ? <Loading /> : <CompanyBody update={handleUpdateEmpresa} empresa={empresa!} />}

            </BodyContainer >
        </main>

    )
}
