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





type ModalProps = {
    onRequestClose?: () => void;
    fornecedor: Fornecedor | undefined | null;
}

type FornecedorProps = {
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
    pais: string | null;
    crt: string | null;
}

export default function ModalCadastroDeFornecedores(props: ModalProps) {

    const { fornecedorData } = useFornecedorContext();

    function closeModal() {
        props.onRequestClose?.();
    }

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<FornecedorProps>({
        defaultValues: {
            nome: props.fornecedor?.nome,
            cpfcnpj: props.fornecedor?.cpfcnpj,
            telefone: props.fornecedor?.telefone,
            email: props.fornecedor?.email,

            endereco: props.fornecedor?.endereco,
            cep: props.fornecedor?.cep,
            numero: props.fornecedor?.numero,
            complemento: props.fornecedor?.complemento,
            cidade: props.fornecedor?.cidade,
            estado: props.fornecedor?.estado,
            pais: props.fornecedor?.pais,
            crt: props.fornecedor?.crt,
        }
    })

    const onSubmit = (data: any) => props.fornecedor == null ? handleSave(data) : handleUpdate(data);

    const handleSave = async (data: any) => {


        let novoFornecedor: Fornecedor = new Fornecedor(
            1,
            data.nome,
            data.cpfcnpj,
            data.telefone,
            data.email,
            "PJ",
            data.endereco,
            data.cep,
            data.numero,
            data.complemento,
            data.cidade,
            data.estado,
            data.pais,
            data.crt
        );

        try {
            await FornecedorUseCase.criarNovoFornecedor(novoFornecedor);

            await fornecedorData.fetchData(0, 10, "");
        } catch (error) {

        }

        console.log('save', data);
        console.log(data);
        closeModal();
    }

    const handleUpdate = async (data: any) => {
        console.log('update', data);
        console.log(data);

        try {
            await FornecedorUseCase.updateFornecedor(props.fornecedor?.id ?? 0, data);
            await fornecedorData.fetchData(0, 10, "");
        } catch (error) {

        }

        closeModal();
    }



    return (
        <ModalContainer>
            <Header>
                <h3>{props.fornecedor == null ? "Cadastrar Novo Fornecedor" : "Alterar Fornecedor"}</h3>
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
                    <SessionRow>
                        <SimpleInput

                            inputType='text'
                            label="CRT"
                            register={register("crt")}
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
                        <SimpleInput
                            inputType='text'
                            label="Pais"
                            register={register("pais")}
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
                        props.fornecedor == null ? <BtnAscent type="submit" >Salvar</BtnAscent> : <BtnAscent type="submit" >Alterar</BtnAscent>
                    }
                </Form>
            </Container>
        </ModalContainer>
    );

}
