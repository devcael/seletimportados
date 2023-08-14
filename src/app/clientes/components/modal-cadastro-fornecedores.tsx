import { BtnAscent } from "@/components/buttons";
import { Icon } from "@/components/input-with-icon";
import DropDown from "@/components/simple-dropdown";
import { SimpleInput, SimpleDropdown } from "@/components/simple-input";
import { SimpleDropDownWithLabel } from "@/components/simple-input-with-label";
import Fornecedor from "@/domain/models/Fornecedor";
import MoedaConversao from "@/domain/models/MoedaConversao";
import Produto from "@/domain/models/Produto";
import AppUtil from "@/domain/services/Utils";
import ProdutoUseCase from "@/domain/usecases/produto_usecase";
import useMoedasFetcher from "@/hooks/useMoedasFetch";
import moedas from "@/pages/api/moedas_conversao/moedas";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { DropOptions } from "sequelize";
import styled from "styled-components";
import { useProductContext } from "../../../provider/produto_provider";
import { Container, Form, Header, Leading, ModalCloseButton, ModalContainer, SessionRow } from "@/components/modal-components";
import FornecedorUseCase from "@/domain/usecases/fornecedores_use_case";
import { useFornecedorContext } from "@/provider/fornecedor_provider";
import Clientes from "@/domain/models/Clientes";
import ClientesUseCase from "@/domain/usecases/clientes_use_case";
import { useClientesContext } from "@/provider/clientes_provider";





type ModalProps = {
    onRequestClose?: () => void;
    cliente: Clientes | undefined | null;
}

type ClientesProps = {
    id: number;
    nome: string;
    cpfcnpj: string | null;
    telefone: string | null;
    email: string | null;
    tipo: 'PF' | 'PJ' | null;
    endereco: string | null;
    cep: string | null;
    numero: string | null;
    complemento: string | null;
    cidade: string | null;
    estado: string | null;
}

export default function ModalCadastroDeClientes(props: ModalProps) {
    const { clientesData } = useClientesContext();

    function closeModal() {
        props.onRequestClose?.();
    }

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<ClientesProps>({
        defaultValues: {
            id: props.cliente?.id,
            nome: props.cliente?.nome,
            cpfcnpj: props.cliente?.cpfcnpj,
            telefone: props.cliente?.telefone,
            email: props.cliente?.email,
            tipo: props.cliente?.tipo,
            endereco: props.cliente?.endereco,
            cep: props.cliente?.cep,
            numero: props.cliente?.numero,
            complemento: props.cliente?.complemento,
            cidade: props.cliente?.cidade,
            estado: props.cliente?.estado,
        }
    })

    const onSubmit = (data: any) => props.cliente == null ? handleSave(data) : handleUpdate(data);

    const handleSave = async (data: any) => {


        let novoCliente: Clientes = new Clientes(
            1,
            data.nome,
            data.cpfcnpj,
            data.telefone,
            data.email,
            "PF",
            data.endereco,
            data.cep,
            data.numero,
            data.complemento,
            data.cidade,
            data.estado,

        )

        try {
            await ClientesUseCase.criarNovoCliente(novoCliente);
        } catch (error) {
            console.log(error);
        }

        clientesData.fetchData(0, 10, "");
        console.log('save', data);
        console.log(data);
        closeModal();
    }

    const handleUpdate = async (data: any) => {
        console.log('update', data);
        console.log(data);

        try {
            await ClientesUseCase.updateCliente(props.cliente?.id ?? 0, data);
        } catch (error) {

        }

        clientesData.fetchData(0, 10, "");

        closeModal();
    }



    return (
        <ModalContainer>
            <Header>
                <h3>{props.cliente == null ? "Cadastrar Novo Cliente" : "Alterar Cliente"}</h3>
                <Leading>

                    <ModalCloseButton onClick={closeModal}>
                        <Icon className="fa-solid fa-xmark"></Icon>
                    </ModalCloseButton>
                </Leading>
            </Header>
            <Container>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <SessionRow>
                        <SimpleInput

                            inputType='text'
                            label="Nome"
                            register={register("nome", { required: true })}
                        />
                    </SessionRow>
                    <SessionRow>
                        <SimpleInput

                            inputType='text'
                            label="Cnpj"
                            register={register("cpfcnpj")}
                        />

                    </SessionRow>
                    <SessionRow>
                        <SimpleInput

                            inputType='text'
                            label="Telefone"
                            register={register("telefone")}
                        />
                        <SimpleInput

                            inputType='text'
                            label="Email"
                            register={register("email")}
                        />
                    </SessionRow>

                    <label><strong>Endereço</strong></label>
                    <SessionRow>
                        <SimpleInput
                            inputType='text'
                            label="CEP"
                            register={register("cep")}
                        />
                        <SimpleInput
                            inputType='text'
                            label="Estado"
                            register={register("estado")}
                        />

                    </SessionRow>
                    <SessionRow>
                        <SimpleInput
                            inputType='text'
                            label="Cidade"
                            register={register("cidade")}
                        />
                        <SimpleInput
                            inputType='text'
                            label="Endereço"
                            register={register("endereco")}
                        />
                    </SessionRow>
                    <SessionRow>
                        <SimpleInput
                            inputType='text'
                            label="Numero"
                            register={register("numero")}
                        />
                        <SimpleInput
                            inputType='text'
                            label="Complemento"
                            register={register("complemento")}
                        />
                    </SessionRow>
                    {
                        props.cliente == null ? <BtnAscent type="submit" >Salvar</BtnAscent> : <BtnAscent type="submit" >Alterar</BtnAscent>
                    }
                </Form>
            </Container>
        </ModalContainer>
    );

}
