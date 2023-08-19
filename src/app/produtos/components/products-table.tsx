import { BtnAscent } from "@/components/buttons";
import { DivColumn } from "@/components/styled-components/directions"
import Produto from "@/domain/models/Produto";
import {
    TableData,
    TableHead,
    TableBody,
    TableHeaderBlue,
    Table,
    TableRow
} from "@components/styled-components/table-data-styles";
import styled from "styled-components";
import { useProductContext } from "../../../provider/produto_provider";
import { LoadingSpinnerWithLabel } from "@/components/simple_loading_container";
import EmptyListContainer from "@/components/empty_list";
import ProdutoUseCase from "@/domain/usecases/produto_usecase";
import { Utils } from "sequelize";
import AppUtil from "@/domain/services/Utils";
import { useState } from "react";
import Modal from 'react-modal';
import ModalCadastroDeProdutos from "./modal-cadastro-produtos";
import { set } from "react-hook-form";
import useMoedasFetcher from "@/hooks/useMoedasFetch";


export default function ProductsTable() {
    const { productData } = useProductContext();

    const { moedas } = useMoedasFetcher();

    const [currProduto, setCurrProduto] = useState<Produto | null>(null);



    const [modalIsOpen, setIsOpen] = useState(false);


    const modalStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)'
        },
        content: {
            padding: '0px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    }

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
    }


    const handleDesativar = async (id: number) => {

        try {
            await ProdutoUseCase.updateProduto(id, { ativo: false });
            productData.fetchData(0, 10, '');
        } catch (err) {
            console.log(err)
        }

        console.log("Produto deletado: ", id)
    }

    const handleAtivar = async (id: number) => {

        try {
            await ProdutoUseCase.updateProduto(id, { ativo: true });
            productData.fetchData(0, 10, '');
        } catch (err) {
            console.log(err)
        }

        console.log("Produto deletado: ", id)
    }

    const handleEdit = async (produto: Produto) => {

        console.log("Produto editado: ", produto);

        setCurrProduto(produto);
        openModal();

    }

    let listProducts = (): React.ReactNode[] => {
        return productData.data.map((produto: Produto, index: number) => {
            return <TableRow key={index} >
                <TableData scope="row" >{produto.ativo ? "SIM" : "NAO"}</TableData>
                <TableData >{produto.nome}</TableData>
                <TableData>{produto.ean}</TableData>
                <TableData ><strong>{AppUtil.formatarMoeda(produto.preco, produto.getSimboloMoedaPreco())}</strong></TableData>
                <TableData style={{ display: "flex", justifyContent: "end" }} >
                    <BtnAscent onClick={async () => await handleEdit(produto)}>Editar</BtnAscent>
                    {produto.ativo ? null : <BtnAscent style={{ background: "teal", marginLeft: "10px" }} onClick={async () => await handleAtivar(produto.id)}>Ativar</BtnAscent>}
                    {!produto.ativo ? null : <BtnAscent onClick={async () => await handleDesativar(produto.id)} style={{ background: "red", marginLeft: "10px" }}>Desativar</BtnAscent>}</TableData>
            </TableRow>
        });
    }

    return (
        <>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderBlue scope="col" style={{ maxWidth: "80px", width: "100px" }}>Ativo</TableHeaderBlue>
                        <TableHeaderBlue scope="col" style={{ flex: 10 }} >Nome</TableHeaderBlue>
                        <TableHeaderBlue scope="col" style={{ flex: 2 }}>Cod.Barras (EAN)</TableHeaderBlue>
                        <TableHeaderBlue scope="col" style={{ flex: 2 }}>Preço</TableHeaderBlue>
                        <TableHeaderBlue scope="col" style={{ width: "fit-content" }}></TableHeaderBlue>
                    </TableRow>
                </TableHead>

                {productData.loading ? <LoadingSpinnerWithLabel label="Carregando..." ></LoadingSpinnerWithLabel> :
                    <TableBody> {productData.data.length > 0 ? listProducts() : <EmptyListContainer label="Lista Vazia" ></EmptyListContainer>} </TableBody>
                }

            </Table>

            <Modal
                shouldCloseOnEsc={true}
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={modalStyles}
                ariaHideApp={false}
                contentLabel="Example Modal"
            >
                <ModalCadastroDeProdutos
                    moedas={moedas}
                    onRequestClose={closeModal}
                    produto={currProduto}
                />
            </Modal>

        </>);
}
