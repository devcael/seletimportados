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
                    <TableHeaderBlue scope="col" style={{ flex: 10 }} >Nome</TableHeaderBlue>
                    <TableHeaderBlue scope="col" style={{ flex: 2 }}>Cpf/Cnpj</TableHeaderBlue>
                    <TableHeaderBlue scope="col" style={{ flex: 2 }}>Telefone</TableHeaderBlue>
                    <TableHeaderBlue scope="col" style={{ width: "fit-content" }}></TableHeaderBlue>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableData ><strong>Micael de Santana Prerira</strong></TableData>
                    <TableData>087.866.415.73</TableData>
                    <TableData >(75) 83534877</TableData>
                    <TableData style={{ display: "flex", justifyContent: "end" }} ><BtnAscent>Editar</BtnAscent><BtnAscent style={{ background: "red", marginLeft: "10px" }}>Excluir</BtnAscent></TableData>
                </TableRow>
            </TableBody>
        </Table>);
}
