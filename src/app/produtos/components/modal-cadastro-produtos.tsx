import { BtnAscent } from "@/components/buttons";
import { Icon } from "@/components/input-with-icon";
import DropDown from "@/components/simple-dropdown";
import { SimpleInput, InputWithLabelAndFormatter, SimpleDropdown } from "@/components/simple-input";
import { SimpleDropDownWithLabel } from "@/components/simple-input-with-label";
import Fornecedor from "@/domain/models/Fornecedor";
import MoedaConversao from "@/domain/models/MoedaConversao";
import Produto from "@/domain/models/Produto";
import AppUtil from "@/domain/services/Utils";
import ProdutoUseCase from "@/domain/usecases/produto_usecase";
import useMoedasFetcher from "@/hooks/useMoedasFetch";
import moedas from "@/pages/api/moedas_conversao/moedas";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { DropOptions } from "sequelize";
import styled from "styled-components";
import { useProductContext } from "../../../provider/produto_provider";
import { Container, Form, Header, Leading, ModalCloseButton, ModalContainer, SessionRow } from "@/components/modal-components";
import AppFormatters from "@/domain/services/Formatters";



type CadastroFormType = {
  nome: string;
  ean: string | null;
  preco: number;
  custo: number;
  id_fornecedor: Fornecedor;
  moeda_custo: MoedaConversao;
  moeda_preco: MoedaConversao;
  valor_moeda_preco: number;
  valor_moeda_custo: number;
  ativo: boolean | null;
  data_de_cadastro: Date | null;
  estoque: number | null;
  marca: string | null;
}



type ModalProps = {
  onRequestClose?: () => void;
  moedas: MoedaConversao[];
  produto: Produto | undefined | null;
}

type ProdutoProps = {
  nome: string;
  ean: string | null;
  preco: number;
  custo: number;
  id_fornecedor: number;
  id_moeda_custo: number;
  id_moeda_preco: number;
  estoque: number | null;
  marca: string | null;
}

export default function ModalCadastroDeProdutos(props: ModalProps) {

  const { productData } = useProductContext();


  const [moedaCusto, setMoedaCusto] = useState<MoedaConversao>(props.moedas[0]);
  const [moedaPreco, setMoedaPreco] = useState<MoedaConversao>(props.moedas[0]);
  const [preco, setPreco] = useState<number>(props.produto?.preco ?? 0);
  const [custo, setCusto] = useState<number>(props.produto?.custo ?? 0);

  useEffect(() => {

    if (props.produto != null) {
      setMoedaCusto(props.produto.moeda_custo);
      setMoedaPreco(props.produto.moeda_preco);
    }

  }, [props.produto]);

  useEffect(() => {
  }, [moedaCusto, moedaPreco, preco, custo]);


  function findMoedaById(id: number): MoedaConversao | undefined {
    return props.moedas.find(moeda => moeda.id_taxa == id);
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ProdutoProps>({
    defaultValues: {
      nome: props.produto?.nome ?? "",
      ean: props.produto?.ean ?? "",
      preco: props.produto?.preco ?? 0.00,
      custo: props.produto?.custo ?? 0.00,
      estoque: props.produto?.estoque ?? 0,
      marca: props.produto?.marca ?? "",

    }
  })



  const onSubmit = (data: ProdutoProps) => props.produto == null ? handleSave(data, moedaCusto, moedaPreco) : handleUpdate(data);

  const handleSave = async (data: ProdutoProps, moeda_custo: MoedaConversao, moeda_preco: MoedaConversao) => {
    console.log('save', data.nome);
    console.log(data);

    try {
      await ProdutoUseCase.createProduto({
        nome: data.nome,
        ean: data.ean,
        preco: preco,
        custo: custo,
        id_fornecedor: 1,
        id_moeda_custo: moedaCusto.id_taxa,
        id_moeda_preco: moedaPreco.id_taxa,
        valor_moeda_preco: moedaCusto.taxa_de_conversao_real,
        valor_moeda_custo: moedaPreco.taxa_de_conversao_real,
        ativo: true,
        data_de_cadastro: new Date(),
        estoque: data.estoque,
        marca: data.marca
      });

    } catch (error) {
      console.log("Erro ao salvar produto", error);
    }

    await productData.fetchData(0, 10, "");

    props.onRequestClose?.();

  }

  const handleUpdate = async (data: ProdutoProps) => {
    console.log('update', data.nome);
    console.log(data);

    try {
      await ProdutoUseCase.updateProduto(props.produto?.id ?? 0, {
        nome: data.nome,
        ean: data.ean,
        preco: preco,
        custo: custo,
        id_fornecedor: 1,
        id_moeda_custo: moedaCusto.id_taxa,
        id_moeda_preco: moedaPreco.id_taxa,
        valor_moeda_preco: moedaCusto.taxa_de_conversao_real,
        valor_moeda_custo: moedaPreco.taxa_de_conversao_real,
        ativo: true,
        data_de_cadastro: new Date(),
        estoque: data.estoque,
        marca: data.marca
      });
    } catch (error) {
      console.log("Erro ao atualizar produto", error);
    }

    await productData.fetchData(0, 10, "");
    console.log('update', data.nome);

    props.onRequestClose?.();
  }

  function handleSelectedDropDown(value: string, id_moeda: number): boolean {
    let idMoeda = parseInt(value);

    if (id_moeda == idMoeda) {
      return true;
    } else {
      return false;
    }

  }



  return (
    <ModalContainer>
      <Header>
        <h3>{props.produto == null ? "Cadastrar Novo Produto" : "Alterar Produto"}</h3>
        <Leading>

          <ModalCloseButton>
            <Icon className="fa-solid fa-xmark"></Icon>
          </ModalCloseButton>
        </Leading>
      </Header>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <SessionRow>
            <SimpleInput

              inputType='text'
              label="Nome do Produto"
              register={register("nome", { required: true })}
            />
          </SessionRow>
          <SessionRow>
            <SimpleInput
              inputType='text'
              label="Cod.Barras (EAN)"
              register={register("ean")}
            />
          </SessionRow>
          <SessionRow>
            <InputWithLabelAndFormatter
              inputType='text'
              label="Preço"
              formatterFunction={(value) => AppFormatters.formatador(value)}
              defaultValue={AppUtil.formatarReais(props.produto?.preco ?? 0.00) ?? "0.00"}
              onChange={(event) => setPreco(AppUtil.formatRealToDouble(event) ?? 0.00)}
            />
            <SimpleDropdown
              label="Moeda Preço"
              selectedId={(value: string) => handleSelectedDropDown(value, moedaPreco.id_taxa)}
              items={props.moedas.map((moeda) => { return { value: moeda.id_taxa.toString(), label: moeda.nome_da_moeda } })}
              onChange={(value: string) => {


                let idMoeda = parseInt(value);

                let moeda = findMoedaById(idMoeda);

                if (moeda != undefined) {
                  setMoedaPreco(moeda);
                }

              }}
            />
            <InputWithLabelAndFormatter
              inputType='text'
              label="Custo"
              formatterFunction={(value) => AppFormatters.formatador(value)}
              defaultValue={AppUtil.formatarReais(props.produto?.custo ?? 0.00) ?? "0.00"}
              onChange={(event) => setCusto(AppUtil.formatRealToDouble(event) ?? 0.00)}
            /><SimpleDropdown
              label="Moeda Custo"
              selectedId={(value: string) => handleSelectedDropDown(value, moedaPreco.id_taxa)}
              items={props.moedas.map((moeda) => { return { value: moeda.id_taxa.toString(), label: moeda.nome_da_moeda } })}
              onChange={(value: string) => {

                let idMoeda = parseInt(value);

                let moeda = findMoedaById(idMoeda);

                if (moeda != undefined) {
                  setMoedaCusto(moeda);
                }

              }}
            />
          </SessionRow>
          <SessionRow>
            <SimpleInput
              inputType='number'
              label="Qnt.Estoque"
              register={register("estoque", { valueAsNumber: true, required: true })}
            />
            <SimpleInput
              inputType='text'
              label="Marca"
              register={register("marca")}
            />
          </SessionRow>
          {/*  <SessionRow>
            <SimpleInput
              inputType='text'
              label="Fornecedor"
              register={register("id_fornecedor")}
            />
          </SessionRow> */}
          {
            props.produto == null ? <BtnAscent type="submit" >Salvar</BtnAscent> : <BtnAscent type="submit" >Alterar</BtnAscent>
          }
        </Form>
      </Container>
    </ModalContainer>
  );

}
