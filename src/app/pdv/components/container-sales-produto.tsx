import { BtnAscent } from "@/components/buttons";
import EmptyListContainer from "@/components/empty_list";
import { Form, SessionRow } from "@/components/modal-components";
import { InputWithLabelAndFormatter, SimpleInput } from "@/components/simple-input";
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
import handler from "@/pages/api/login";
import AppFormatters from "@/domain/services/Formatters";
import StrUtil from "@/domain/services/StrUtils";


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
    max-height: 300px;
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

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        watch
    } = useForm({
        mode: "onBlur",
    })

    const { adicionarItemVenda } = useGerenciadorVendaContext();

    const { data, loading, fetchData, page, search, setPage, setSearch } = usePaginatedData(0, 100);

    const [total, setTotal] = useState<number>(0.0);
    const [totalDesconto, setTotalDesconto] = useState<number>(0.0);
    const [totalAcrescimo, setTotalAcrescimo] = useState<number>(0.0);

    const watchQuantidade: string = watch('quantidade', "1");
    const watchDesconto = watch('desconto', "0");
    const watchAcrescimo = watch('acrescimo', "0");



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
            acrescimo: AppFormatters.removeRealFormatter(data.totalAcrescimo) ?? 0.0,
            desconto: AppFormatters.removeRealFormatter(data.totalDesconto) ?? 0.0,
            valortotal: produto?.preco ?? 0.0 * data.quantidade ?? 1.0,
            id_moeda_custo_produto: produto?.moeda_custo.id_taxa ?? 0,
            taxa_moeda_custo_produto: produto?.moeda_custo.taxa_de_conversao_real ?? 0.0,
            id_moeda_preco_produto: produto?.moeda_preco.id_taxa ?? 0,
            taxa_moeda_preco_produto: produto?.moeda_preco.taxa_de_conversao_real ?? 0.0,
            id_venda: 2
        });

        console.log("Novo Item: ", novoItem)

        adicionarItemVenda(novoItem);
    };

    const handlerSetQuantidade = (value: string, desconto: number, acrescimo: number) => {


        let qnt: number = Number(value);
        let precoProduto: number = Number(produto?.getPrecoProdutoConvertido() ?? 0.0)

        console.log("Quantidade: ", qnt, precoProduto, qnt * precoProduto);

        let total: number = qnt * precoProduto;

        let totalComDescontoEAcrescimo = total;
        setTotal(totalComDescontoEAcrescimo);

    };
    const handlerSetDesconto = (value: string, total: number, quantidadeDoProduto: number) => {
        let valor: number = Number(value);

        let valorTotalPorcentagem: number = AppUtil.calculatePercentageValue({ value: total, percentage: valor });

        setTotalDesconto(valorTotalPorcentagem * quantidadeDoProduto);
    };

    const handlerSetAcrescimo = (value: string, total: number, quantidadeDoProduto: number) => {
        let valor: number = Number(value);

        let valorTotalPorcentagem: number = AppUtil.calculatePercentageValue({ value: total, percentage: valor });

        setTotalAcrescimo(valorTotalPorcentagem * quantidadeDoProduto);
    }





    useEffect(() => {
        handlerSetQuantidade(watchQuantidade, totalAcrescimo, totalDesconto);
        handlerSetAcrescimo(watchAcrescimo, produto?.getPrecoProdutoConvertido() ?? 0.00, Number(watchQuantidade));
        handlerSetDesconto(watchDesconto, produto?.getPrecoProdutoConvertido() ?? 0.00, Number(watchQuantidade));
        setValue("nome", produto?.nome ?? "", { shouldValidate: true });
        setValue("preco", StrUtil.formatadorComPrefixo(produto?.getPrecoProdutoConvertido().toString() ?? " ", "R$"), { shouldValidate: true });
        setValue("quantidade", watchQuantidade, { shouldValidate: true });
        setValue("total", StrUtil.formatadorComSufixoComGarantiaDeDecimal((total + totalAcrescimo - totalDesconto).toString()), { shouldValidate: true });
        setValue("desconto", watchDesconto, { shouldValidate: true });
        setValue("acrescimo", watchAcrescimo, { shouldValidate: true });
        setValue("totalDesconto", StrUtil.formatadorComSufixoComGarantiaDeDecimal(totalDesconto.toString()), { shouldValidate: true });
        setValue("totalAcrescimo", StrUtil.formatadorComSufixoComGarantiaDeDecimal(totalAcrescimo.toString()), { shouldValidate: true });
    }, [produto, total, totalAcrescimo, totalDesconto, watchQuantidade, watchDesconto, watchAcrescimo]);



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
                                <p><strong>{StrUtil.formatadorComPrefixo(produto.preco.toString(), produto.getSimboloMoedaPreco())}</strong></p>
                            </ProdutoItemLabel>

                        </ProdutoItem>

                    )) : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}><h4>Nenhuma Correspondência...</h4></div>
                }
            </ListProdutoContainer>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <SessionRow>
                    <SimpleInput readonly={true} register={register("nome", { required: true })} inputType="text" label="Produto" />

                    <SimpleInput readonly={true} register={register("preco")} inputType="text" label="Valor Unitario" />
                </SessionRow>
                <SessionRow>
                    <SimpleInput register={register("quantidade")} inputType="number" label="Quantidade" />
                    <SimpleInput register={register("desconto")} inputType="text" label="Desconto (%)" />
                    <SimpleInput register={register("acrescimo")} inputType="text" label="Acrescimo (%)" />
                </SessionRow>
                <SessionRow>
                    <SimpleInput readonly={true} register={register("totalDesconto")} inputType="text" label="Desconto Em Reais" />
                    <SimpleInput readonly={true} register={register("totalAcrescimo")} inputType="text" label="Acrescimo Em Reais" />
                </SessionRow>
                <SessionRow>
                    <InputWithLabelAndFormatter
                        inputType='text'
                        readonly={true}
                        label="Total"
                        formatterFunction={(value) => StrUtil.formatadorComSufixoComGarantiaDeDecimal(value)}
                        register={register("total")}
                    />
                </SessionRow>
                <BtnAscent type="submit" style={{ padding: "10px", fontSize: "15px", margin: "10px 0px" }}>Adicionar</BtnAscent>
            </Form>
        </Container>);
}