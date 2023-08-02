"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components";
import NavBar from '@/components/navbar';
import './globals.css'
import '@styles/fonts.css'


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
  width: 40vw;
  height: 100vh;
  border-radius: 0px 16px 16px 0px;
  position: relative;
`


const LoginContainer = styled.div`
  display: flex;
  padding: 0px 280px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  width: 60vw;
  height: 100vh;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`

const IconWrapper = styled.div`
  position: relative;
  padding: 10px 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoginButton = styled.a`
  width: 100%;
  max-width: 500px;
  background: var(--blue-ascent);
  padding: 10px 0px;
  border: none;
  border-radius: 5px;
  text-align: center;
  color: white;
  font-weight: 500;
`

function InputWithLabel() {
  return (<div></div>)
}



export default function Home() {

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "start", justifyContent: "start" }} >

      <CustomImg width={100} className="fullwidth-img" src="login_background.png" alt="" />
      <LoginContainer>
        <div style={{ width: 100, borderRadius: 5, height: "100px", overflow: "hidden", position: "relative" }}>
          <img style={{ height: "100%", position: "relative" }} className="fullwidth-img" src="logo.png" alt="" />
        </div>
        <div style={{ textAlign: "center", margin: "20px 0px" }}>
          <h1 style={{ color: "teal" }}>SELET</h1>
          <h3>IMPORTADOS</h3>
        </div>
        <IconWrapper>
          <div style={{ flexGrow: "1", maxWidth: "150px", height: "3px", borderRadius: "50px", backgroundColor: "grey" }}></div>
          <i style={{ margin: "0px 15px" }} className="fa-solid fa-globe"></i>
          <div style={{ flexGrow: "1", maxWidth: "150px", height: "3px", borderRadius: "50px", backgroundColor: "grey" }}></div>
        </IconWrapper>
        <div style={{ textAlign: "center", margin: "10px 0px" }}>
          <h3>BEM VINDOS</h3>
          <p>GERENCIADOR DE VENDAS</p>
        </div>
        <LoginButton href="/dashboard">LOGIN</LoginButton>
      </LoginContainer>
    </div>
  )
}


