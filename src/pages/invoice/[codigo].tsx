"use client"
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { styled } from "styled-components"
import { BtnAscent } from "@/components/buttons";
import { useRouter } from "next/router";
import "../../app/globals.css";
import "./invoice.css";
import useVendaDetails from "@/hooks/useGetVendaById";
import Venda from "@/domain/models/Venda";
import StrUtil from "@/domain/services/StrUtils";
import ItemVenda from "@/domain/models/ItemVenda";
import Empresa from "@/domain/models/Empresa";
import { useEmpresa } from "@/hooks/useEmpresaFetch";
import AppFormatters from "@/domain/services/Formatters";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@styles/fonts.css'


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
    padding: 25px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
`

const CompanyInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    overflow: hidden;
    p{
        color: #2c2c2c;
    }
`

const PdfTitle = styled.div`
    width: 100%;
    padding: 0px 25px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    h1{
        font-size: 28px;
        color: var(--blue-ascent);
    }
`
const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: var(--blue-ascent);
    margin: 10px 0;
`

const ClientInfoContainer = styled.div`
    width: 100%;
    padding: 20px 25px;
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
    margin-top:  60px;
    width: 100%;
    padding: 10px;
    border-collapse: collapse;
    border-spacing: 0;
    overflow: hidden;
`

const Td = styled.td`
            padding: 8px;
            text-align: left;
`

const Th = styled.th`
 background-color: #5c9dff27;
 padding: 8px;
            color: #0d3a7d;
            text-align: left;
`

const Tr = styled.tr`
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
    width: 30%;
    padding: 3px 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
    overflow: hidden;
`

const DottedDivider = styled.div`
    width: 100%;
  height: 1px;
  background: transparent;
  border: none;
  border-top: 1px dotted gray;
  margin: 1em 0;
`;

interface ComponentToPrintProps {
    currVenda: Venda | null; // Defina o tipo da propriedade customString
    currEmpresa: Empresa | null;
}




class NewInvoice extends React.PureComponent<ComponentToPrintProps> {

    render(): React.ReactNode {

        const { currVenda, currEmpresa } = this.props;
        return (
            <PdfContainer>

                <PdfHeader>
                    <CompanyInfo>
                        <h2><strong>{currEmpresa?.nome}</strong></h2>
                        <p><strong>{currEmpresa?.endereco}, {currEmpresa?.numero}, {currEmpresa?.estado}</strong></p>
                        <p><strong>CEP: {currEmpresa?.cep}</strong></p>
                        <p><strong>Telefone: {AppFormatters.formatPhoneNumber(currEmpresa?.telefone ?? "00000000000")}</strong></p>
                        <p><strong>CNPJ: {AppFormatters.formatCNPJ(currEmpresa?.cpfcnpj ?? "00000000000000")}</strong></p>
                    </CompanyInfo>
                    <div style={{ width: 100, borderRadius: 5, height: "100px", overflow: "hidden", position: "relative" }}>
                        <img style={{ height: "100%", position: "relative" }} src="/logo.png" alt="" />
                    </div>
                </PdfHeader>
                <PdfTitle>
                    <h1>{currVenda?.tipo == "VENDA" ? "INVOICE" : "BUDGET"}</h1>
                </PdfTitle>
                <ClientInfoContainer>
                    <ClienteInfo>
                        <h2><strong>Endereço Fatura</strong></h2>
                        <h3>Cliente: {currVenda?.cliente?.nome}</h3>
                        <h3>Endereço: {currVenda?.cliente?.endereco}, {currVenda?.cliente?.numero} </h3>
                        <h3>CEP: {currVenda?.cliente?.cep}</h3>
                        <h3>Telefone:  {AppFormatters.formatPhoneNumber(currVenda?.cliente?.telefone ?? "0000000000")}</h3>
                        <h3>CPF: {AppFormatters.formatCPF(currVenda?.cliente?.cpfcnpj ?? "00000000000")}</h3>
                    </ClienteInfo>
                    <ClienteInfo>
                        <h2><strong>Endereço Envio</strong></h2>
                        <h3>Cliente: {currVenda?.cliente?.nome}</h3>
                        <h3>Endereço: {currVenda?.cliente?.endereco}, {currVenda?.cliente?.numero} </h3>
                        <h3>CEP: {currVenda?.cliente?.cep}</h3>
                        <h3>Telefone:  {AppFormatters.formatPhoneNumber(currVenda?.cliente?.telefone ?? "0000000000")}</h3>
                        <h3>CPF: {AppFormatters.formatCPF(currVenda?.cliente?.cpfcnpj ?? "00000000000")}</h3>
                    </ClienteInfo>
                    <InvoiceInfo>
                        <h2><strong>INVOICE #</strong>{currVenda?.id} </h2>
                        <h2><strong>DATE:</strong> {currVenda?.data} </h2>
                    </InvoiceInfo>
                </ClientInfoContainer>
                <Divider />
                <div className="container">
                    <Table>
                        <thead>
                            <tr>
                                <Th>DESCRIÇÃO</Th>
                                <Th>IMEI</Th>
                                <Th>QNT</Th>
                                <Th>PRECO</Th>
                                <Th>TOTAL</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {currVenda?.listItems.map((item: ItemVenda, index: number) => <Tr key={index} >

                                <Td><strong>{item.nome_produto} </strong></Td>

                                <Td><strong>{item.imei != null ? item.imei.numeroimei : "Não Inserido"}</strong></Td>

                                <Td><strong>{item.quantidade}</strong></Td>

                                <Td><strong> {StrUtil.formatadorComPrefixo(item.getPrecoConvertido().toString() ?? "0.00", "R$")}</strong></Td>

                                <Td><strong> {StrUtil.formatadorComPrefixo(item.getValorTotalConvertido().toString() ?? "0.00", "R$")}</strong></Td>

                            </Tr>)}

                        </tbody>
                    </Table>
                </div>
                <DottedDivider></DottedDivider>
                <ResumeContainer>
                    <ResumeInfo>
                        <h3>SUB TOTAL:</h3>
                        <h3>{StrUtil.formatadorComPrefixo(currVenda?.subtotal.toString() ?? "0.00", "R$")}</h3>
                    </ResumeInfo>
                    <ResumeInfo>
                        <h3>DESCONTO:</h3>
                        <h3>{StrUtil.formatadorComPrefixo(currVenda?.desconto?.toString() ?? "0.00", "R$")}</h3>
                    </ResumeInfo>

                    <ResumeInfo>
                        <h3>ACRESCIMO:</h3>
                        <h3>{StrUtil.formatadorComPrefixo(currVenda?.acrescimo?.toString() ?? "0.00", "R$")}</h3>
                    </ResumeInfo>

                    <ResumeInfo>
                        <h3><strong>VALOR TOTAL:</strong></h3>
                        <h2><strong>{StrUtil.formatadorComPrefixo(currVenda?.totalvenda.toString() ?? "0.00", "R$")}</strong></h2>
                    </ResumeInfo>
                </ResumeContainer>
            </PdfContainer>
        )
    }
}

class ComponentToPrint extends React.PureComponent<ComponentToPrintProps> {
    render() {

        const { currVenda, currEmpresa } = this.props;


        let total = 0;
        return (
            <PdfContainer>

                <PdfHeader><h1>INVOICE #{currVenda?.id ?? 0}</h1></PdfHeader>
                <CompanyInfo>
                    <h2>{currEmpresa?.nome ?? ""}</h2>
                    <h3>{currEmpresa?.endereco ?? ''}, {currEmpresa?.numero} - {currEmpresa?.estado ?? ""}</h3>
                    <h3>CEP: {currEmpresa?.cep ?? ""}</h3>
                    <h3>Telefone: {AppFormatters.formatPhoneNumber(currEmpresa?.telefone ?? "00000000000")}</h3>
                    <h3>CNPJ: {AppFormatters.formatCNPJ(currEmpresa?.cpfcnpj ?? "00000000000000")}</h3>
                </CompanyInfo>
                <div style={{ width: 100, borderRadius: 5, height: "100px", overflow: "hidden", position: "relative" }}>
                    <img style={{ height: "100%", position: "relative" }} className="fullwidth-img" src="logo.png" alt="" />
                </div>
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
    const { empresa } = useEmpresa();
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
                loading ? <h1>Carregando...</h1> : <Container>
                    <HeaderButtons>
                        <BtnAscent onClick={() => handlePrint()}>Imprimir / Download</BtnAscent>
                    </HeaderButtons>
                    <NewInvoice currEmpresa={empresa} currVenda={venda} ref={componentRef} /></Container>
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


}