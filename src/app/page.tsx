"use client"
import { InputHookForm } from '@/components/InputHookForm';
import './globals.css'
import "@styles/fonts.css"
import "@styles/teste.css"
import { Inter } from "next/font/google";
import styled from "styled-components";
const inter = Inter({ subsets: ['latin'] })

const Body = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: white;
`

const InputForm = styled.input`
  position: relative;
  width: 100%;
  background: white;
  color: black;
  border-radius: 5px;
  border: 1px solid var(--gray-color);
  padding: 12px 5px;
`

const TitleH5 = styled.h5`
  
`

const CustomImg = styled.img`
  width: 100vw;
  height: 100vh;
  position: absolute;
`

const GlassDiv = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background: rgba(255, 255, 255, 0.13);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`

const LoginContainer = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 100vw;
  height: 100vh;
  max-width: 600px;
  max-height: 800px;
  background-color: red;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`

function InputWithLabel() {
  return (<div></div>)
}



export default function Home() {

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "red" }} >
      <CustomImg width={100} className="fullwidth-img" src="wallpaper-fundo-iphone.jpg" alt="" />
      <GlassDiv></GlassDiv>
      <LoginContainer>
        <div style={{ width: 100, borderRadius: 5, height: "100px", overflow: "hidden", position: "relative" }}>
          <img style={{ height: "100%", position: "relative" }} className="fullwidth-img" src="logo.png" alt="" />
        </div>
        <div>
          <h1>SELET IMPORTADOS</h1>
        </div>

        <div>
          <h3>BEM VINDOS</h3>
          <h5>GERENCIADOR DE VENDAS</h5>
        </div>
      </LoginContainer>
    </div>
  )
}
