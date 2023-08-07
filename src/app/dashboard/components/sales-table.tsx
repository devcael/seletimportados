import { BtnAscent } from "@/components/buttons";
import { DivColumn } from "@/components/styled-components/directions"
import {
    TableData,
    TableHead,
    TableBody,
    TableHeaderBlue,
    Table,
    TableRow
} from "@components/styled-components/table-data-styles";
import styled from "styled-components";



export default function SalesTable() {

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
                <TableRow>
                    <TableData ><strong>2</strong></TableData>
                    <TableData><strong>Micael de Santana Prerira</strong></TableData>
                    <TableData >FINALIZADO</TableData>
                    <TableData >23/11/2003</TableData>
                    <TableData><strong>R$20.000,00</strong></TableData>
                    <TableData style={{ display: "flex", justifyContent: "end" }} ><BtnAscent>Editar</BtnAscent></TableData>
                </TableRow>
            </TableBody>
        </Table>);
}
