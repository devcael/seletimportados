"use client"
import "@view/styles/dashboard.css"
import "@view/styles/fonts.css"
import "@view/styles/common.css"
import NavBar from "@view/components/navbar";
import { Inter } from "next/font/google";
import styled from "styled-components";
import { DivColumn, DivRow } from "@/view/components/Directions";

const inter = Inter({ subsets: ['latin'] })

const BodyContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  flex: 1;
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
  width: 100%;
  flex: 1;
  padding: 0px 20px;
`

const ResumeSession = styled(DivRow)`
  justify-content: space-between;
  width: 100%;
  gap: 15px;
  height: 120px;
  padding: 15px 0px;
`

const ActionSession = styled(DivRow)`
  
`

const ResumeCard = styled(DivRow)`
  position: relative;
  flex: 1;
  height: 100%;
  background-color: #ffffff;
  border-radius: 10px;
`

const ActionButtons = styled.button`
`

const CardIcon = styled.div`
  
`




export default function Home() {

  const arrayCount = [0, 0, 0, 0];

  return (
    <body className={inter.className}>
      <NavBar />
      <BodyContainer>
        <AppBar>
        </AppBar>
        <Body>
          <ResumeSession>
            <ResumeCard>
            </ResumeCard>
            <ResumeCard>
            </ResumeCard>
            <ResumeCard>
            </ResumeCard>
            <ResumeCard>
            </ResumeCard>
          </ResumeSession>
        </Body>
      </BodyContainer>
    </body>
  )
}
