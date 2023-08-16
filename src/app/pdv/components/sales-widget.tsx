import { use, useEffect, useState } from "react";
import styled from "styled-components";
import ContainerProduto from "./container-sales-produto";
import ContainerPagamento from "./container-sales-pagamento";
import { useGerenciadorVendaContext } from "../GerenciadorDeVendas";

const SalesContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: scroll;
    max-width: 40vw;
    flex-grow: 1;
    background-color: white;
    border: 1px solid gray;
    border-radius: 10px;
    &::-webkit-scrollbar {
        display: none;}
    
`

const SalesHeader = styled.div`
    width: 100%;
    
    background-color: var(--blue-ascent);
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 10px 30px;
`;

const SessionContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 5px 10px;
    gap: 10px;
`

const TypeButton = styled.button<{ acctive: boolean }>`
    flex-grow: 1;
    margin: 0;
    padding: 5px 10px;
    border: 3px solid var(--blue-ascent);
    background: ${props => props.acctive ? "var(--blue-ascent)" : "white"};
    color: ${props => props.acctive ? "white" : "var(--blue-ascent)"};
    font-weight: 600;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
`



enum Type {
    produto,
    pagamento
}

export default function SalesWidget() {
    const [type, setType] = useState<Type>(Type.produto);


    const { listaItems } = useGerenciadorVendaContext();


    useEffect(() => {

        if (listaItems.length == 0) {
            setType(Type.produto);
        }


    }, [type, listaItems]);

    function toggleType(type: Type) {
        if (listaItems.length > 0) {
            setType(type);
            return;
        }

        setType(Type.produto);
    }




    return (

        <SalesContainer>
            <SalesHeader >
                <h3 style={{ color: "white" }}>Venda #1</h3>
            </SalesHeader>
            <SessionContainer>
                <TypeButton onClick={() => toggleType(Type.produto)} acctive={type == Type.produto ? true : false}>Produto</TypeButton>
                <TypeButton onClick={() => toggleType(Type.pagamento)} acctive={type == Type.pagamento ? true : false}>Pagamento</TypeButton>
            </SessionContainer>
            {type === Type.produto ? <ContainerProduto /> : <ContainerPagamento />}
        </SalesContainer>

    )
}