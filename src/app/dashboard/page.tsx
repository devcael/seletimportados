"use client"
import "@styles/dashboard.css"
import "@styles/fonts.css"
import "@styles/common.css"
import NavBar from "@components/navbar";
import { Inter } from "next/font/google";
import styled from "styled-components";
import { DivColumn, DivRow } from "@components/Directions";

const inter = Inter({ subsets: ['latin'] })

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 88vw;
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

const Body = styled(DivColumn)`
  justify-content: start;
  flex-grow: 1;
  padding: 0px 20px;
`

const ResumeSession = styled(DivRow)`
  justify-content: space-between;
  width: 100%;
  gap: 15px;
  height: 120px;
  padding: 15px 0px;
`


const ResumeCard = styled(DivRow)`
  position: relative;
  justify-content: start;
  padding: 15px;
  flex: 1;
  height: 100%;
  background-color: #ffffff;
  border-radius: 10px;
`

const IconWrapper = styled.div`
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
  align-items: start;
  margin: 15px;
`
const LabelSpan = styled.span<{ color: string, size: string }>`
  color: ${props => props.color};
  font-size:  calc(var(--scale-fonts) * ${props => props.size});
`

const ActionsSession = styled.section`
  display: flex;
  width: 100%;
  height: 100px;
  background-color: teal;
`

const TitleH1 = styled.h1``

const ActionButton = styled.button`
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

function listGenerate(length: number): number[] {
  var list: number[] = [0];
  for (let i = 0; i < length; i++) {
    list.push(i);
  }
  return list;
}

export default function Home() {

  const arrayCount = [0, 0, 0, 0];

  return (
    <body className={inter.className}>
      <NavBar></NavBar>
      <BodyContainer>
        <AppBar>
        </AppBar>
        <Body>
          <ResumeSession>
            {listGenerate(4).map((item, index) => (<ResumeCard className="row">
              <IconWrapper key={index} className="row">
                <i className="fa-solid fa-money-bill"></i>
              </IconWrapper>
              <ResumeLabel className="column">
                <LabelSpan color={"grey"} size={"15px"} >Micael</LabelSpan>
                <LabelSpan color={"black"} size={"22px"} ><strong>R$200.00</strong></LabelSpan>
              </ResumeLabel>
            </ResumeCard>))}
          </ResumeSession>
          <DivRow style={{ justifyContent: "start", width: "100%" }}>
            <TitleH1>O que você gostaria de fazer?</TitleH1>
          </DivRow>
          <ActionsSession >
            {/*listGenerate(100).map((item, index) => (
              <ActionButton key={index} className="column" >
                <i style={{ fontSize: "25px", color: "var(--secodary-blue)" }} className="fa-solid fa-money-bill"></i>
                <strong>Gerar Orçamento asd asd asd asdasdasdas a dasd asdasd</strong>
              </ActionButton>
            ))*/}

          </ActionsSession>
        </Body>
      </BodyContainer >
    </body >
  )
}
