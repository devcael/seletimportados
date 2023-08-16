import { BtnAscent } from "@/components/buttons";
import { DivColumn } from "@/components/styled-components/directions"
import CabecalhoVenda from "@/domain/models/CabecalhoVenda";
import { useVendaContext } from "@/provider/venda_prodiver";
import {
    TableData,
    TableHead,
    TableBody,
    TableHeaderBlue,
    Table,
    TableRow
} from "@components/styled-components/table-data-styles";
import { useEffect } from "react";
import styled from "styled-components";



export default function SalesTable() {

    const { vendaData } = useVendaContext();

    let listOfSales = (): React.ReactNode[] => {
        return vendaData.data.map((venda: CabecalhoVenda, index: number) => {
            return <TableRow key={index}>
                <TableData ><strong>{venda.id}</strong></TableData>
                <TableData><strong>{venda?.nome}</strong></TableData>
                <TableData >{venda.situacao}</TableData>
                <TableData >{venda.data}</TableData>
                <TableData><strong>{venda.totalvenda}</strong></TableData>
                <TableData style={{ display: "flex", justifyContent: "end" }} ><BtnAscent>Editar</BtnAscent></TableData>
            </TableRow>
        });
    }

    useEffect(() => {
        console.log("cabecalhosVenda", vendaData.data)
    }, [vendaData]);


    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeaderBlue scope="col" style={{ maxWidth: "80px", width: "100px" }}>N°</TableHeaderBlue>
                    <TableHeaderBlue scope="col" style={{ flex: 10 }} >Cliente</TableHeaderBlue>
                    <TableHeaderBlue scope="col" style={{ flex: 2 }}>Status</TableHeaderBlue>
                    <TableHeaderBlue scope="col" style={{ flex: 2 }}>Data pedido</TableHeaderBlue>
                    <TableHeaderBlue scope="col" style={{ width: "fit-content" }}>Valor Total</TableHeaderBlue>
                    <TableHeaderBlue scope="col" style={{ width: "fit-content" }}></TableHeaderBlue>
                </TableRow>
            </TableHead>
            <TableBody>
                {listOfSales()}
            </TableBody>
        </Table>);
}
