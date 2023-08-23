"use client"
import "@styles/fonts.css"
import React, { useEffect, useRef, useState } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { styled } from "styled-components"
import { BtnAscent } from "@/components/buttons";
import { useRouter, withRouter } from "next/router";
import "../../app/globals.css";
import "./invoice.css";
import useVendaDetails from "@/hooks/useGetVendaById";
import Venda from "@/domain/models/Venda";
import StrUtil from "@/domain/services/StrUtils";
import ItemVenda from "@/domain/models/ItemVenda";
import VendaUseCase from "@/domain/usecases/venda_usecase";
import { set } from "react-hook-form";


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

const HeaderButtons = styled.div`
    width: 100%;
    padding: 10px;
    margin:10px 10px;
    max-width: 900px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
    overflow: hidden;
    background-color: white;
    border-radius: 5px;
`

const PdfContainer = styled.div`
    width: 100%;
    height: 100%;

    max-width: 900px;
    padding: 10px;
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

const Tr = styled.tr``

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
interface ComponentToPrintProps {
    currVenda: Venda | null; // Defina o tipo da propriedade customString
}


class ComponentToPrint extends React.PureComponent<ComponentToPrintProps> {
    render() {

        const { currVenda } = this.props;


        let total = 0;
        return (
            <PdfContainer>

                <PdfHeader>INVOICE #{currVenda?.id ?? 0}</PdfHeader>
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
                        <h3>Cliente: {currVenda?.cliente?.nome}</h3>
                        <h3>Endereço: {currVenda?.cliente?.endereco}, {currVenda?.cliente?.numero}</h3>
                        <h3>CEP: {currVenda?.cliente?.cep}</h3>
                        <h3>Telefone: {currVenda?.cliente?.telefone}</h3>
                        <h3>CPF: {currVenda?.cliente?.cpfcnpj}</h3>
                    </ClienteInfo>
                    <InvoiceInfo>
                        <h3>Invoice Date: {currVenda?.data}</h3>
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
                            {currVenda?.listItems.map((item: ItemVenda, index: number) => <Tr key={index} >
                                <Td>{item.nome_produto}</Td>
                                <Td>{item.imei?.numeroimei ?? "Não Adicionado"}</Td>
                                <Td>{item.quantidade}</Td>
                                <Td>{StrUtil.formatadorComPrefixo(item.preco_produto.toString(), "$")}</Td>
                                <Td>{StrUtil.formatadorComPrefixo(item.getPrecoConvertido().toString(), "R$")}</Td>
                                <Td>{StrUtil.formatadorComPrefixo(item.getValorTotalConvertido().toString(), "R$")}</Td>
                            </Tr>)}


                        </tbody>
                    </Table>
                </div>
                <ResumeContainer>
                    <ResumeInfo>
                        <h3>Sub total:</h3>
                        <h3>{StrUtil.formatadorComPrefixo(currVenda?.subtotal.toString() ?? "0.00", "R$")}</h3>
                    </ResumeInfo>
                    <ResumeInfo>
                        <h3>Desconto:</h3>
                        <h3>{StrUtil.formatadorComPrefixo(currVenda?.desconto?.toString() ?? "0.00", "R$")}</h3>
                    </ResumeInfo>

                    <ResumeInfo>
                        <h3>Acrescimo:</h3>
                        <h3>{StrUtil.formatadorComPrefixo(currVenda?.acrescimo?.toString() ?? "0.00", "R$")}</h3>
                    </ResumeInfo>

                    <ResumeInfo>
                        <h3>Valor total:</h3>
                        <h3>{StrUtil.formatadorComPrefixo(currVenda?.totalvenda.toString() ?? "0.00", "R$")}</h3>
                    </ResumeInfo>
                </ResumeContainer>

            </PdfContainer>

        );
    }
}


function Loading() {
    return <h1>Carregando...</h1>;
}

function Carregado(props: { codigo: number }) {
    const componentRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    const { venda, loading, refreshVendaDetails } = useVendaDetails(props.codigo);

    useEffect(() => {

    }, [venda, loading]);

    return (
        <>
            {
                loading ? <h1>Carregando...</h1> : <Container> <h1>Codigo: {props.codigo}</h1>
                    <HeaderButtons>
                        <BtnAscent onClick={() => handlePrint()}>Imprimir / Download</BtnAscent>
                    </HeaderButtons>
                    <ComponentToPrint currVenda={venda} ref={componentRef} /></Container>
            }
        </>

    );
}



export default function Example() {

    const { query, isReady } = useRouter();

    function getCodito(): number {
        let param = query.codigo;

        let numeroVenda: number = parseInt(param as string);
        return numeroVenda;
    }

    const [isReadyState, setIsReadyState] = useState<boolean>(false);

    useEffect(() => {
        setIsReadyState(isReady);
    }, [isReady]);

    if (isReadyState) {
        return <Carregado codigo={getCodito()} />
    } else {
        return <Loading />
    }




    /* let codigo = route.query.codigo;

    function getCodito(): number {
        
        
        let numeroVenda: number = parseInt(codigo as string);

        return numeroVenda;
    }

    const componentRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    const { venda, loading, refreshVendaDetails } = useVendaDetails(getCodito());
    
    useEffect(() => {

    }, [venda, loading, isReady]);

    return (
        <>
            {
                loading ? <h1>Carregando...</h1> : <Container> <h1>Codigo: {codigo}</h1>
                    <HeaderButtons>
                        <BtnAscent onClick={() => handlePrint()}>Imprimir / Download</BtnAscent>
                    </HeaderButtons>
                    <ComponentToPrint currVenda={venda} ref={componentRef} /></Container>
            }
        </>

    ); */
}