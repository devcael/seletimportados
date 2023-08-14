import { BtnAscent } from "@/components/buttons";
import { DivColumn } from "@/components/styled-components/directions"
import Clientes from "@/domain/models/Clientes";
import useModal from "@/hooks/useModal";
import usePaginatedClientes from "@/hooks/usePaginatedClientes";
import { useClientesContext } from "@/provider/clientes_provider";
import { useProductContext } from "@/provider/produto_provider";
import Modal from 'react-modal';
import {
    TableData,
    TableHead,
    TableBody,
    TableHeaderBlue,
    Table,
    TableRow
} from "@components/styled-components/table-data-styles";
import styled from "styled-components";
import ModalCadastroDeClientes from "./modal-cadastro-fornecedores";
import { useState } from "react";
import EmptyListContainer from "@/components/empty_list";
import { LoadingSpinnerWithLabel } from "@/components/simple_loading_container";



export default function ClientesTable() {
    const { modalIsOpen, openModal, closeModal, modalStyles } = useModal();
    const { clientesData } = useClientesContext();
    const [currCliente, setCliente] = useState<Clientes | null>(null);
    const handleEdit = async (cliente: Clientes) => {

        console.log("Produto editado: ", cliente);

        setCliente(cliente);
        openModal();

    }


    let listClientes = (): React.ReactNode[] => {
        return clientesData.data.map((cliente: Clientes, index: number) => {
            return (<TableRow key={index}>
                <TableData ><strong>{cliente.nome}</strong></TableData>
                <TableData>{cliente.cpfcnpj}</TableData>
                <TableData >{cliente.telefone}</TableData>
                <TableData style={{ display: "flex", justifyContent: "end" }} ><BtnAscent onClick={() => handleEdit(cliente)} >Editar</BtnAscent></TableData>
            </TableRow>)
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

                {clientesData.loading ? <LoadingSpinnerWithLabel label="Carregando..." ></LoadingSpinnerWithLabel> :
                    <TableBody> {clientesData.data.length > 0 ? listClientes() : <EmptyListContainer label="Lista Vazia" ></EmptyListContainer>} </TableBody>
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
                    <ModalCadastroDeClientes onRequestClose={closeModal} cliente={currCliente} />
                </Modal>
            </div>
        </>
    );
}
