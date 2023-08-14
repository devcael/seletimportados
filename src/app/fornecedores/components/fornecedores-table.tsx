import { BtnAscent } from "@/components/buttons";
import EmptyListContainer from "@/components/empty_list";
import { LoadingSpinnerWithLabel } from "@/components/simple_loading_container";
import { DivColumn } from "@/components/styled-components/directions"
import Fornecedor from "@/domain/models/Fornecedor";
import useModal from "@/hooks/useModal";
import Modal from 'react-modal';
import { useFornecedorContext } from "@/provider/fornecedor_provider";
import {
    TableData,
    TableHead,
    TableBody,
    TableHeaderBlue,
    Table,
    TableRow
} from "@components/styled-components/table-data-styles";
import { useState } from "react";
import styled from "styled-components";
import ModalCadastroDeFornecedores from "./modal-cadastro-de-fornecedor";



export default function FornecedoresTable() {
    const { modalIsOpen, openModal, closeModal, modalStyles } = useModal();
    const [currFornecedor, setCurrFornecedor] = useState<Fornecedor | null>(null);

    const { fornecedorData } = useFornecedorContext();

    const handleEdit = async (fornecedor: Fornecedor) => {

        console.log("Produto editado: ", fornecedor);

        setCurrFornecedor(fornecedor);
        openModal();

    }

    let listFornecedores = (): React.ReactNode[] => {
        return fornecedorData.data.map((fornecedor: Fornecedor, index: number) => {
            return <TableRow key={index}>
                <TableData ><strong>{fornecedor.nome}</strong></TableData>
                <TableData>{fornecedor.cpfcnpj}</TableData>
                <TableData >{fornecedor.telefone}</TableData>
                <TableData style={{ display: "flex", justifyContent: "end" }} ><BtnAscent onClick={() => handleEdit(fornecedor)} >Editar</BtnAscent></TableData>
            </TableRow>
        });
    }

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderBlue scope="col" style={{ flex: 10 }} >Nome</TableHeaderBlue>
                        <TableHeaderBlue scope="col" style={{ flex: 2 }}>Cpf/Cnpj</TableHeaderBlue>
                        <TableHeaderBlue scope="col" style={{ flex: 2 }}>Telefone</TableHeaderBlue>
                        <TableHeaderBlue scope="col" style={{ width: "fit-content" }}></TableHeaderBlue>
                    </TableRow>
                </TableHead>

                {fornecedorData.loading ? <LoadingSpinnerWithLabel label="Carregando..." ></LoadingSpinnerWithLabel> :
                    <TableBody> {fornecedorData.data.length > 0 ? listFornecedores() : <EmptyListContainer label="Lista Vazia" ></EmptyListContainer>} </TableBody>
                }

            </Table>
            <div>
                <Modal
                    shouldCloseOnEsc={true}
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={modalStyles}
                    ariaHideApp={false}
                    contentLabel="Example Modal"
                >
                    <ModalCadastroDeFornecedores onRequestClose={closeModal} fornecedor={currFornecedor} />
                </Modal>
            </div>
        </>);
}
