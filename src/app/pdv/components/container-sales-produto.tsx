import { BtnAscent } from "@/components/buttons";
import EmptyListContainer from "@/components/empty_list";
import { Form, SessionRow } from "@/components/modal-components";
import { SimpleInput } from "@/components/simple-input";
import { LoadingSpinnerWithLabel } from "@/components/simple_loading_container";
import Produto from "@/domain/models/Produto";
import AppUtil from "@/domain/services/Utils";
import useDelayedFunctionCall from "@/hooks/useDelayedFunctionCall";
import usePaginatedData from "@/hooks/useProdutoPaginationData";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { styled } from "styled-components";
import { useCriarVendaContext } from "../CriarVenda";
import ItemVenda from "@/domain/models/ItemVenda";
import { useGerenciadorVendaContext } from "../GerenciadorDeVendas";


const Container = styled.div`
    display: flex;
    flex-grow: 1;
    padding: 0px 10px;
    padding-bottom: 10px;
    flex-direction: column;
`

const ListProdutoContainer = styled.ul`
    display: inline;
    flex-grow: 1;
    border: 1px solid var(--gray-color);
    border-radius: 5px;
    overflow-y: scroll;
    padding: 0px;
    &::-webkit-scrollbar {
        display: none;
    }
`

const ProdutoItem = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    border-bottom: 1px solid var(--gray-color);
    cursor: pointer;
    &:hover{
        background-color: var(--gray-color);
    }
`

const ProdutoItemLabel = styled.span`
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    text-overflow: ellipsis;
`



export default function ContainerProduto() {

    const { adicionarItemVenda } = useGerenciadorVendaContext();

    const { data, loading, fetchData, page, search, setPage, setSearch } = usePaginatedData(0, 100);
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm({
        mode: "onBlur",
    })
    const [produto, setProduto] = useState<Produto | null>(null);

    const delayedSearch = useDelayedFunctionCall(300);

    const handleDelayedSearch = (value: string) => {
        fetchData(0, 100, value);
    };

    const handleInputChange = (event: string) => {
        setSearch(event);
        delayedSearch(handleDelayedSearch, event);
    };

    const handleProductChanges = (produto: Produto) => {
        setProduto(produto);
    }


    const onSubmit = (data: any) => {
        let novoItem: ItemVenda = new ItemVenda({
            id_itens_venda: 1,
            id_produto: produto?.id ?? 0,
            produto: produto!,
            imei: null,
            nome_produto: produto?.nome ?? "",
            preco_produto: produto?.preco ?? 0.0,
            custo_produto: produto?.custo ?? 0.0,
            quantidade: data.quantidade ?? 1.0,
            acrescimo: data.acrescimo ?? 1.0,
            desconto: data.desconto ?? 0.0,
            valortotal: data.total ?? 0.0,
            id_moeda_custo_produto: produto?.moeda_custo.id_taxa ?? 0,
            taxa_moeda_custo_produto: produto?.moeda_custo.taxa_de_conversao_real ?? 0.0,
            id_moeda_preco_produto: produto?.moeda_preco.id_taxa ?? 0,
            taxa_moeda_preco_produto: produto?.moeda_preco.taxa_de_conversao_real ?? 0.0,
            id_venda: 2
        });

        adicionarItemVenda(novoItem);
    };



    useEffect(() => {
        setValue("nome", produto?.nome ?? "", { shouldValidate: true });
        setValue("preco", produto?.preco ?? "", { shouldValidate: true });
        setValue("quantidade", "1.0", { shouldValidate: true });
        setValue("total", produto?.preco ?? "", { shouldValidate: true });
        setValue("desconto", "0.0", { shouldValidate: true });
        setValue("acrescimo", "0.0" ?? "", { shouldValidate: true });
    }, [produto]);





    return (
        <Container>
            <SessionRow>
                <SimpleInput onChange={handleInputChange} style={{ padding: "15px" }} inputType="text" label="Pesquisar produto" />
            </SessionRow>
            <ListProdutoContainer>

                {
                    loading ? <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}><h4>Carregando Dados...</h4></div> : data.length > 0 ? data?.map((produto: Produto, index: number) => (
                        <ProdutoItem onClick={() => handleProductChanges(produto)} key={index}>
                            <ProdutoItemLabel>
                                <p><strong>{produto.nome}</strong></p>
                            </ProdutoItemLabel>
                            <ProdutoItemLabel >
                                <p><strong>{AppUtil.formatarReais(produto.preco)}</strong></p>
                            </ProdutoItemLabel>

                        </ProdutoItem>

                    )) : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}><h4>Nenhuma Correspondência...</h4></div>
                }
            </ListProdutoContainer>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <SessionRow>
                    <SimpleInput register={register("nome", { required: true })} style={{ padding: "15px", flexGrow: "5" }} inputType="text" label="Produto" />

                    <SimpleInput register={register("preco")} style={{ padding: "15px" }} inputType="text" label="Valor Unitario" />
                </SessionRow>
                <SessionRow>
                    <SimpleInput register={register("quantidade")} style={{ padding: "15px" }} inputType="text" label="Quantidade" />
                    <SimpleInput register={register("desconto")} style={{ padding: "15px" }} inputType="text" label="Desconto" />

                    <SimpleInput register={register("acrescimo")} style={{ padding: "15px" }} inputType="text" label="Acrescimo" />
                </SessionRow>
                <SessionRow>
                    <SimpleInput register={register("total")} style={{ padding: "15px" }} inputType="text" label="Total" />
                </SessionRow>
                <BtnAscent type="submit" style={{ padding: "10px", fontSize: "15px", margin: "10px 0px" }}>Adicionar</BtnAscent>
            </Form>
        </Container>);
}