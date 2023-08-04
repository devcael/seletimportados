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

const ResumeSession = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 35px;
  height: 120px;
  padding: 15px 30px;
`


const ResumeCard = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  justify-content: start;
  padding: 15px;
  height: 100%;
  background-color: white;
  border-radius: 10px;
`

const IconWrapper = styled.div`
  display: flex;
  position: relative;
  width: fit-content;
  padding: 20px;
  height: 100%;
  background-color: teal;
  color: white;
  align-items: center;
  border-radius: 10px;
`


const ResumeLabel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin: 0px 15px;
`
const LabelSpan = styled.span<{ color: string, size: string }>`
  color: ${props => props.color};
  font-size:  calc(var(--scale-fonts) * ${props => props.size});
`

const ActionsSession = styled.section`
  display: flex;
  width: 100%;
  gap: 15px;
  overflow-x: scroll;
  padding: 10px;

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
  width: 250px;
  padding: 15px;
  border: none;
  border-radius: 8px;
  background-color: white;
  color: black;
  cursor: pointer;
  text-align: left;
  font-size: 20px;
  gap: 20px;
  align-items: start;
  padding: 30px 20px;
  
`


const TableFiltersContainer = styled.div`
  width: 100%;
  height: 100px; 
  background-color: red;
  padding: 10px 0px;
`

function CardResume(props: { label: string, value: string }) {
  return (<ResumeCard>
    <IconWrapper  >
      <i className="fa-solid fa-money-bill"></i>
    </IconWrapper>
    <ResumeLabel >
      <LabelSpan color={"grey"} size={"15px"} >{props.label}</LabelSpan>
      <LabelSpan color={"black"} size={"22px"} ><strong>{props.value}</strong></LabelSpan>
    </ResumeLabel>
  </ResumeCard>);
}


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
        <AppBar>
        </AppBar>
        <ResumeSession>
          <CardResume label='Valor Do Mês' value='R$200,00'></CardResume>
          <CardResume label='Valor Do Mês' value='R$200,00'></CardResume>
          <CardResume label='Valor Do Mês' value='R$200,00'></CardResume>
          <CardResume label='Valor Do Mês' value='R$200,00'></CardResume>
        </ResumeSession>
        <DivRow style={{ paddingLeft: "20px", margin: "15px 0px", justifyContent: "start", width: "100%" }}>
          <TitleH1>O que você gostaria de fazer?</TitleH1>
        </DivRow>
        <ActionsSession style={{ paddingLeft: "20px" }}>
          <Link href={"/clientes"} >
            <ActionButton  >
              <i style={{ fontSize: "25px", color: "var(--secodary-blue)" }} className="fa-solid fa-money-bill"></i>
              <strong>Criar venda</strong>
            </ActionButton>
          </Link>
          <Link href={"/clientes"} >
            <ActionButton >
              <i style={{ fontSize: "25px", color: "var(--secodary-blue)" }} className="fa-solid fa-money-bill"></i>
              <strong>Gerar Orçamento</strong>
            </ActionButton>
          </Link>
        </ActionsSession>
        <TableFiltersContainer>
          <h2>Filtros</h2>
        </TableFiltersContainer>
      </BodyContainer >
    </div>
  )
}
