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



export default function ProductsTable() {

    return (
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
            <TableBody>
                <TableRow>
                    <TableData scope="row" >Sim</TableData>
                    <TableData >Iphone 14 Pro Max Vermelho</TableData>
                    <TableData>12345678901</TableData>
                    <TableData ><strong>R$200,00</strong></TableData>
                    <TableData style={{ display: "flex", justifyContent: "end" }} ><BtnAscent>Editar</BtnAscent><BtnAscent style={{ background: "red", marginLeft: "10px" }}>Excluir</BtnAscent></TableData>
                </TableRow>            <TableRow>
                    <TableData scope="row" >Sim</TableData>
                    <TableData >Iphone 14 Pro Max Vermelho</TableData>
                    <TableData>12345678901</TableData>
                    <TableData ><strong>R$200,00</strong></TableData>
                    <TableData style={{ display: "flex", justifyContent: "end" }} ><BtnAscent>Editar</BtnAscent><BtnAscent style={{ background: "red", marginLeft: "10px" }}>Excluir</BtnAscent></TableData>
                </TableRow>            <TableRow>
                    <TableData scope="row" >Sim</TableData>
                    <TableData >Iphone 14 Pro Max Vermelho</TableData>
                    <TableData>12345678901</TableData>
                    <TableData ><strong>R$200,00</strong></TableData>
                    <TableData style={{ display: "flex", justifyContent: "end" }} ><BtnAscent>Editar</BtnAscent><BtnAscent style={{ background: "red", marginLeft: "10px" }}>Excluir</BtnAscent></TableData>
                </TableRow>            <TableRow>
                    <TableData scope="row" >Sim</TableData>
                    <TableData >Iphone 14 Pro Max Vermelho</TableData>
                    <TableData>12345678901</TableData>
                    <TableData ><strong>R$200,00</strong></TableData>
                    <TableData style={{ display: "flex", justifyContent: "end" }} ><BtnAscent>Editar</BtnAscent><BtnAscent style={{ background: "red", marginLeft: "10px" }}>Excluir</BtnAscent></TableData>
                </TableRow>
            </TableBody>
        </Table>);
}
