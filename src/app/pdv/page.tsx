"use client"
import { Leading } from "@/components/app-bar"
import { BtnAscent } from "@/components/buttons"
import styled from "styled-components"
import SalesWidget from "./components/sales-widget"
import SalesWidgetItems from "./components/sales-widget-items"
import { CriarVendaProvider } from "./CriarVenda"
import { GerenciadorVendaProvider } from "./GerenciadorDeVendas"

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 10px 20px;
    width: 100%;
    height: 70px;
    background-color: var(--color-primery-blue);
`
const Container = styled.div`
    display: inline;
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: #00000080;
`
const Body = styled.div`
    position: relative;
    width: 100%;
    height: calc(100% - 70px);
    background-color: var(--gray-color);
    overflow-y : scroll;
    display: flex;
    padding: 10px 20px;
    gap: 10px;

`

const LogoContainer = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    gap: 10px;
    height: 100%;
    border-radius: 10px;
    flex-direction: row;
    overflow: hidden;
    text-align: center;
    color: white;
`



export default function PdvScreen() {
    return (
        <GerenciadorVendaProvider>
            <Container>
                <Header >
                    <LogoContainer >
                        <img style={{ width: "100%", maxWidth: "50px", borderRadius: "10px" }} className="fullwidth-img" src="logo.png" alt="" />
                        <h4 >Pdv SeletImportados</h4>
                    </LogoContainer>
                    <Leading>
                        <BtnAscent>Voltar</BtnAscent>
                    </Leading>
                </Header>
                <Body>
                    <SalesWidget />
                    <SalesWidgetItems />
                </Body>
            </Container>
        </GerenciadorVendaProvider>
    )
}