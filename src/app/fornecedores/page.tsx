"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import "@styles/fonts.css"
import NavBar from "@components/navbar";
import { Inter } from "next/font/google";
import styled from "styled-components";
import { DivColumn, DivRow } from "@/components/styled-components/directions";
import '../globals.css'
import { Leading } from '@/components/app-bar';
import { BtnAscent, BtnWithBorder } from '@/components/buttons';
import TableFilterFornecedores from './components/filter-table-fornecedores';
import { TableContainer } from '@/components/styled-components/table-data-styles';
import FornecedoresTable from './components/fornecedores-table';
const inter = Inter({ subsets: ['latin'] })

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: calc(100vw - var(--navbar-width));
  height: 100vh;
`

const AppBar = styled.div`
  position: relative;
  padding: 0px 15px;
  width: 100%;
  height: 80px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  -webkit-box-shadow: 0px 5px 8px -6px rgba(208,223,245,1);
  -moz-box-shadow: 0px 5px 8px -6px rgba(208,223,245,1);
  box-shadow: 0px 5px 8px -6px rgba(208,223,245,1);
  margin-bottom: 10px;
`


export default function Home() {

    const arrayCount = [0, 0, 0, 0];

    return (
        <main style={{ width: "100vw", height: "100vh", display: "flex" }}>
            <NavBar></NavBar>
            <BodyContainer>
                <AppBar>
                    <h2>Fornecedores</h2>
                    <Leading>
                        <BtnAscent>Novo Fornecedor</BtnAscent>
                    </Leading>
                </AppBar>
                <TableFilterFornecedores />
                <div style={{ width: "100%", padding: "0px 15px" }}>
                    <TableContainer>
                        <FornecedoresTable></FornecedoresTable>
                    </TableContainer>
                </div>
            </BodyContainer >
        </main>
    )
}
