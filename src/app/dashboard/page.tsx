"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import "@styles/fonts.css"
import NavBar from "@components/navbar";
import { Inter } from "next/font/google";
import styled from "styled-components";
import { DivColumn, DivRow } from "@/components/styled-components/directions";
import '../globals.css'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AppBar, Leading } from '@/components/app-bar';
import SalesTable from './components/sales-table';
import FilterTableSales from './components/filter-table-sales';
import CardResume from './components/card-resume';
import { BtnAscent } from '@/components/buttons';
import { Icon } from '@/components/input-with-icon';
const inter = Inter({ subsets: ['latin'] })

const BodyContainer = styled.div`
  display: inline;
  width: calc(100vw - var(--navbar-width));
  overflow-y: scroll;
`



const ResumeSession = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 35px;
  height: 120px;
  padding: 15px 30px;
      margin: 10px 0px;
`




const ActionsSession = styled.section`
  display: flex;
  width: 100%;
  gap: 15px;
  overflow-x: scroll;
  padding: 10px;
      margin: 10px 0px;

  &::-webkit-scrollbar{
    height: 5px;
  }
  
  &::-webkit-scrollbar-thumb{
    background: transparent;
    border-radius: 50px;
  }

  &:hover::-webkit-scrollbar-thumb{
      background: var(--gray-color);
  }

`

const TitleH1 = styled.h1``

const ActionButton = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
  padding: 15px;
  border: none;
  border-radius: 8px;
  background-color: white;
  color: black;
  cursor: pointer;
  text-align: left;

  gap: 10px;
  align-items: start;
  padding: 15px 20px;
  
`


const TableContainer = styled.div`
    width: 100%;
    height: 600px;
    border-radius: 10px;
    overflow: hidden;
    overflow-y: auto;
    background-color: white;
    margin: 10px 0px;
    border: 1px solid var(--gray-color);
    
  &::-webkit-scrollbar {
    display: none;
    width: 0.2rem;
    height: 0.5rem;
  }

    
`

const Label = styled.text`
  font-size: 10px;
`

const ColumnForLabel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`




export default function Home() {


  const router = useRouter();

  useEffect(() => {
    const authenticated = document.cookie.includes('authenticated=true');
    if (!authenticated) {
      router.push('/');
    }
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      <NavBar></NavBar>
      <BodyContainer>
        <AppBar style={{ position: "sticky" }}>
          <h3>Dashboard</h3>
          <Leading>
            <ColumnForLabel>
              <p>Cotação Atual:</p>
              <div style={{ display: "flex", gap: "25px", color: "var(--blue-ascent)", fontWeight: 700 }}><h3>DOLAR</h3><h3>R$50,00</h3></div>
            </ColumnForLabel>
            <BtnAscent style={{ background: "var(--color-primary)", display: "flex", gap: "25px", alignItems: "center", justifyContent: "center" }}>
              <ColumnForLabel>
                <p>Trocar</p>
                <h3>Cotação</h3>
              </ColumnForLabel>
              <Icon className={"fa-solid fa-rotate"}>

              </Icon>
            </BtnAscent>
          </Leading>
        </AppBar>
        <ResumeSession>
          <CardResume label='Valor Do Mês' value='R$200,00'></CardResume>
          <CardResume label='Valor Do Mês' value='R$200,00'></CardResume>
          <CardResume label='Valor Do Mês' value='R$200,00'></CardResume>
        </ResumeSession>
        <DivRow style={{ paddingLeft: "20px", margin: "15px 0px", justifyContent: "start", width: "100%" }}>
          <TitleH1>O que você gostaria de fazer?</TitleH1>
        </DivRow>
        <ActionsSession style={{ paddingLeft: "20px" }}>
          <Link href={"/pdv"} >
            <ActionButton  >
              <i style={{ fontSize: "25px", color: "var(--secodary-blue)" }} className="fa-solid fa-money-bill"></i>
              <strong>Criar venda</strong>
            </ActionButton>
          </Link>
          <Link href={"/pdv"} >
            <ActionButton >
              <i style={{ fontSize: "25px", color: "var(--secodary-blue)" }} className="fa-solid fa-money-bill"></i>
              <strong>Gerar Orçamento</strong>
            </ActionButton>
          </Link>
        </ActionsSession>
        <FilterTableSales />
        <div style={{ width: "100%", padding: "0px 15px" }}>
          <TableContainer>
            <SalesTable></SalesTable>
          </TableContainer>
        </div>
      </BodyContainer >
    </div>
  )
}
