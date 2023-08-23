"use client"
import "@styles/fonts.css"
import React, { useRef } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { styled } from "styled-components"
const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
       overflow: scroll;
&::-webkit-scrollbar{
        display: none;
    }
`

const PdfContainer = styled.div`
    width: 100%;
    height: 100%;
    max-width: 900px;
    padding: 100px;
    background-color: white;
    display: inline;
    justify-content: center;
    height: 100%; 
    margin: 0 !important;
    overflow: hidden;
    border-radius: 5px;

    &::-webkit-scrollbar{
        display: none;
    }
`

const PdfHeader = styled.div`
    width: 100%;
    height: 40px;
    padding: 25px;
    
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`

const CompanyInfo = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    overflow: hidden;
`

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: #000;
    margin: 10px 0;
`

const ClientInfoContainer = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
    overflow: hidden;

`

const ClienteInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    overflow: hidden;
`

const InvoiceInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;
    overflow: hidden;
`

const Table = styled.table`
margin-top:  10px;
    width: 100%;

    padding: 10px;
            border-collapse: collapse;
            border-spacing: 0;
            overflow: hidden;
            border-radius: 5px;
`

const Td = styled.td`
 border-bottom: 1px solid #ccc;
            padding: 8px;
            text-align: left;
`

const Th = styled.th`
 background-color: #5c9dff9a;
            color: #0d3a7d;
            text-align: left;
`

const ResumeContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: end;
    overflow: hidden;

    margin: 15px 0px;
    align-self: flex-end;
    
    h3 {
        margin: 0;
        padding: 0;
    }
`

const ResumeInfo = styled.div`
    width: 60%;
    padding: 3px 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
    overflow: hidden;
`

class ComponentToPrint extends React.PureComponent {
    render() {
        return (
            <PdfContainer>
                <PdfHeader>INVOICE #21</PdfHeader>
                <CompanyInfo>
                    <h2>Selet Importados</h2>
                    <h3>Av. Brasil, 1234</h3>
                    <h3>CEP: 12345-678</h3>
                    <h3>Telefone: (11) 1234-5678</h3>
                    <h3>CNPJ: 12.345.678/0001-90</h3>
                </CompanyInfo>
                <Divider />
                <ClientInfoContainer>
                    <ClienteInfo>
                        <h3>Cliente: Fulano de Tal</h3>
                        <h3>Endereço: Av. Brasil, 1234</h3>
                        <h3>CEP: 12345-678</h3>
                        <h3>Telefone: (11) 1234-5678</h3>
                        <h3>CNPJ: 12.345.678/0001-90</h3>
                    </ClienteInfo>
                    <InvoiceInfo>
                        <h3>Invoice Date: 01/01/2021</h3>
                        <h3>Due Date: 01/01/2021</h3>
                    </InvoiceInfo>
                </ClientInfoContainer>
                <div className="container">
                    <Table>
                        <thead>
                            <tr>

                                <Th>Produto</Th>
                                <Th>IMEI</Th>
                                <Th>Qnt</Th>
                                <Th>Preco Dolar</Th>
                                <Th>Preco Real</Th>
                                <Th>Total</Th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <Td>Dado 2</Td>
                                <Td>Dado 2</Td>
                                <Td>Dado 2</Td>
                                <Td>Dado 2</Td>
                                <Td>Dado 2</Td>
                                <Td>Dado 2</Td>
                            </tr>

                        </tbody>
                    </Table>
                </div>
                <ResumeContainer>
                    <ResumeInfo>
                        <h3>Sub total:</h3>
                        <h3>R$300,00</h3>
                    </ResumeInfo>
                    <ResumeInfo>
                        <h3>Desconto:</h3>
                        <h3>R$300,00</h3>
                    </ResumeInfo>

                    <ResumeInfo>
                        <h3>Acrescimo:</h3>
                        <h3>R$300,00</h3>
                    </ResumeInfo>

                    <ResumeInfo>
                        <h3>Valor total:</h3>
                        <h3>R$300,00</h3>
                    </ResumeInfo>
                </ResumeContainer>

            </PdfContainer>
        );
    }
}



export default function Example() {
    const componentRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <Container>
            <button onClick={() => handlePrint()}>Click</button>
            <ComponentToPrint ref={componentRef} />
        </Container>

    );
}