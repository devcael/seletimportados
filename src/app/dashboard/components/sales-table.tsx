import { BtnAscent } from "@/components/buttons";
import EmptyListContainer from "@/components/empty_list";
import { LoadingSpinnerWithLabel } from "@/components/simple_loading_container";
import { DivColumn } from "@/components/styled-components/directions"
import CabecalhoVenda from "@/domain/models/CabecalhoVenda";
import StrUtil from "@/domain/services/StrUtils";
import AppUtil from "@/domain/services/Utils";
import { useVendaContext } from "@/provider/venda_prodiver";
import {
    TableData,
    TableHead,
    TableBody,
    TableHeaderBlue,
    Table,
    TableRow
} from "@components/styled-components/table-data-styles";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/pt-br';
import { useEffect, useState } from "react";
import styled from "styled-components";
import useModal from "@/hooks/useModal";
import ModalAlterarMoedaDolar from "./modal_alterar_dolar";
import Modal from 'react-modal';
import ModalVisualizarVenda from "./modal-visualizar-venda";


dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('pt-br'); // Defina o local para português do Brasil


import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { PageProps } from "../../../../.next/types/app/layout";

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
    },
    section: {
        flexGrow: 1,
    },
});

const MyDocument = () => {
    return <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Hello World!</Text>
            </View>
            <View style={styles.section}>
                <Text>We're inside a PDF!</Text>
            </View>
        </Page>
    </Document>
};

const PrintPDFPage: React.FC<PageProps> = () => {
    return (
        <div>
            <h1>Impressão de PDF</h1>
            <MyDocument />
        </div>
    );
};

export default function SalesTable() {

    const { modalIsOpen, openModal, closeModal, modalStyles } = useModal();

    const { vendaData } = useVendaContext();

    const [id_venda, setIdVenda] = useState<number>(0);

    let listOfSales = (): React.ReactNode[] => {
        return vendaData.data.map((venda: CabecalhoVenda, index: number) => {
            return <TableRow key={index}>
                <TableData ><strong>{venda.id}</strong></TableData>
                <TableData><strong>{venda?.nome}</strong></TableData>
                <TableData >{venda.tipo}</TableData>
                <TableData >{dayjs(new Date(venda.data)).add(1, 'd').format("DD/MM/YYYY")}</TableData>
                <TableData><strong>{StrUtil.formatadorComSufixoComGarantiaDeDecimal(venda.totalvenda.toString())}</strong></TableData>
                <TableData style={{ display: "flex", gap: "10px", justifyContent: "end" }} ><BtnAscent onClick={() => handleEditVenda(venda.id)}>Editar</BtnAscent><BtnAscent onClick={() => handleImprimirVenda(venda.id)}>Imprimir</BtnAscent></TableData>
            </TableRow>
        });
    }

    const handleEditVenda = (id_venda: number) => {
        setIdVenda(id_venda);
        openModal();
    }

    const handleImprimirVenda = (id_venda: number) => {
        window.open(`http://154.49.246.212:3000/api/gerar_pdf_venda?idvenda=${id_venda}`, '_blank');
    }

    useEffect(() => {
    }, [vendaData, id_venda]);


    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderBlue scope="col" style={{ maxWidth: "80px", width: "100px" }}>N°</TableHeaderBlue>
                        <TableHeaderBlue scope="col" style={{ flex: 10 }} >Cliente</TableHeaderBlue>
                        <TableHeaderBlue scope="col" style={{ flex: 2 }}>Tipo</TableHeaderBlue>
                        <TableHeaderBlue scope="col" style={{ flex: 2 }}>Data pedido</TableHeaderBlue>
                        <TableHeaderBlue scope="col" style={{ width: "fit-content" }}>Valor Total</TableHeaderBlue>
                        <TableHeaderBlue scope="col" style={{ width: "fit-content" }}></TableHeaderBlue>
                    </TableRow>
                </TableHead>


                {vendaData.loading ? <LoadingSpinnerWithLabel label="Carregando..." ></LoadingSpinnerWithLabel> :
                    <TableBody> {vendaData.data.length > 0 ? listOfSales() : <EmptyListContainer label="Lista Vazia" ></EmptyListContainer>} </TableBody>
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
                    <ModalVisualizarVenda
                        id_venda={id_venda}
                        closeModal={closeModal}
                    />
                </Modal>
            </div>

        </>);
}
