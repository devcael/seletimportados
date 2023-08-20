import { BtnAscent } from "@/components/buttons";
import { Icon } from "@/components/input-with-icon";
import { Header, Leading, ModalCloseButton, SessionRow } from "@/components/modal-components";
import { InputWithLabelAndFormatter, SimpleInput } from "@/components/simple-input";
import AppFormatters from "@/domain/services/Formatters";
import StrUtil from "@/domain/services/StrUtils";
import AppUtil from "@/domain/services/Utils";
import MoedaConversaoUseCase from "@/domain/usecases/moedas_conversao_usecase";
import useVendaDetails from "@/hooks/useGetVendaById";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { keyframes, styled } from "styled-components";
import SalesTable from "./sales-table";
import { Table, TableData, TableHead, TableHeaderBlue, TableRow } from "@/components/styled-components/table-data-styles";
import ItemVenda from "@/domain/models/ItemVenda";
import { TableBody } from "semantic-ui-react";
import useModal from "@/hooks/useModal";
import Modal from 'react-modal';
import ModalCadastroImei from "./modal_adicionar_imei";

const TableContainer = styled.div`
    width: 100%;
    height: 600px;
    border-radius: 10px;
    overflow: hidden;
    overflow-y: auto;
    background-color: white;
    margin: 10px 0px;
    border: 1px solid var(--gray-color);
    
  &::-webkit-scrollbar {
    display: none;
    width: 0.2rem;
    height: 0.5rem;
  }

    
`

const Container = styled.div`
    display: inline-block;
    overflow-y: scroll;
    width: 70vw;
    height: 800px;
    gap: 15px;
    background-color: white;
    &::-webkit-scrollbar {
        display: none;
    }
`

const LoadingContainer = styled.div`
    position: relative;
    flex-grow: 1;
        align-items: center;
    justify-content: center;
    background: red;
`
const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoagingContainer = styled.div`

  position: relative;
  padding: 20px;
  text-align: center; /* Centralizar conteúdo horizontalmente */
    
`

const SpinnerWrapper = styled.div`
  display: inline-block;
  animation: ${spinAnimation} 1s linear infinite;
  
`;

const LoadingSpinner = () => (
    <SpinnerWrapper>
        <FontAwesomeIcon icon={faSpinner} size="lg" />
    </SpinnerWrapper>
);

function LoadingSpinnerWithLabel(params: { label: string; }) {
    return (
        <LoagingContainer>
            <LoadingSpinner></LoadingSpinner>
            <p>{params.label}</p>
        </LoagingContainer>
    )
}
function LoadingState() {
    return <LoadingContainer></LoadingContainer>
}



function ModalVisualizarVenda(props: {
    closeModal: () => void,
    id_venda: number
}) {

    const { venda, loading, refreshVendaDetails } = useVendaDetails(props.id_venda);
    const { openModal, afterOpenModal, closeModal, modalIsOpen, modalStyles } = useModal();
    const [item, setItem] = useState<ItemVenda | null>(null);


    const handleAddImei = (item: ItemVenda) => {
        console.log(item);
        setItem(item);
        openModal();
    }

    const closeModalImei = () => {
        refreshVendaDetails();
        closeModal();
    }

    useEffect(() => {
    }, [venda, loading]);

    let listOfItems = (): React.ReactNode[] => {
        return venda!.listItems.map((item: ItemVenda, index: number) => (<TableRow key={index} >
            <TableData >x{parseInt(item.quantidade.toString())} {item.produto.nome}</TableData>
            <TableData>{item.taxa_moeda_preco_produto}</TableData>
            <TableData>{StrUtil.formatadorComPrefixo(item.preco_produto.toString(), "$")}</TableData>
            <TableData >{StrUtil.formatadorComPrefixo(item.getPrecoConvertido().toString(), "R$")}</TableData>
            <TableData >{StrUtil.formatadorComPrefixo(item.valortotal.toString(), "$")}</TableData>
            <TableData >{StrUtil.formatadorComPrefixo(item.getValorTotalConvertido().toString(), "R$")}</TableData>
            <TableData >{item.imei?.numeroimei ?? <BtnAscent onClick={() => handleAddImei(item)} >Adicionar</BtnAscent>}</TableData>
        </TableRow>));
    }

    return <Container>
        <Header>
            <h3>Venda # {venda?.id ?? 0}</h3>
            <Leading>
                <ModalCloseButton onClick={props.closeModal}>
                    <Icon className="fa-solid fa-xmark"></Icon>
                </ModalCloseButton>
            </Leading>
        </Header>
        {/* 
        <BtnAscent  >Alterar</BtnAscent> */}
        {loading ?? <LoadingSpinnerWithLabel label="Carregando" />}
        <SessionRow style={{ padding: "10px 10px" }}>
            <SimpleInput
                inputType="text"
                readonly={true}
                label="Cliente"
                defaultValue={venda?.cliente?.nome ?? "Nao encontrado"}
            />
            <SimpleInput
                inputType="text"
                readonly={true}
                label="Cpf"
                defaultValue={venda?.cliente?.cpfcnpj ?? "Nao encontrado"}
            />
        </SessionRow>
        <SessionRow style={{ padding: "10px 10px" }}>
            <SimpleInput
                inputType="text"
                readonly={true}
                label="Email"
                defaultValue={venda?.cliente?.email ?? "Nao encontrado"}
            />
            <SimpleInput
                inputType="Telefone"
                readonly={true}
                label="Telefone"
                defaultValue={venda?.cliente?.telefone ?? "Nao encontrado"}
            />
        </SessionRow>
        <SessionRow style={{ padding: "10px 10px" }}>
            <SimpleInput
                inputType="text"
                readonly={true}
                label="Endereço"
                defaultValue={venda?.cliente?.endereco ?? "Nao encontrado"}
            />
            <SimpleInput
                inputType="Telefone"
                readonly={true}
                label="Cep"
                defaultValue={venda?.cliente?.cep ?? "Nao encontrado"}
            />
            <SimpleInput
                inputType="Telefone"
                readonly={true}
                label="Complemento"
                defaultValue={venda?.cliente?.complemento ?? "Nao encontrado"}
            />
        </SessionRow>
        <SessionRow style={{ padding: "10px 10px" }}>

            <SimpleInput
                inputType="Telefone"
                readonly={true}
                label="Estado"
                defaultValue={venda?.cliente?.cidade ?? "Nao encontrado"}
            />
            <SimpleInput
                inputType="Telefone"
                readonly={true}
                label="Cidade"
                defaultValue={venda?.cliente?.estado ?? "Nao encontrado"}
            />
        </SessionRow>

        <SessionRow style={{ padding: "10px 10px" }}>
            <SimpleInput
                inputType="text"
                readonly={true}
                label="Data Venda"
                defaultValue={venda?.data ?? "Data Inválida"}
            />
            <SimpleInput
                inputType="text"
                readonly={true}
                label="Hora Venda"
                defaultValue={venda?.tipo ?? "Hora Inválida"}
            />
            <SimpleInput
                inputType="text"
                readonly={true}
                label="Tipo"
                defaultValue={venda?.tipo ?? "Tipo Inválido"}
            />
        </SessionRow>
        <SessionRow style={{ padding: "10px 10px" }}>
            <SimpleInput
                inputType="text"
                readonly={true}
                label="Desconto"
                defaultValue={StrUtil.formatadorComSufixoComGarantiaDeDecimal(venda?.desconto?.toString() ?? "0.00") ?? "Nao encontrado"}
            />
            <SimpleInput
                inputType="text"
                readonly={true}
                label="Acrescimo"
                defaultValue={StrUtil.formatadorComSufixoComGarantiaDeDecimal(venda?.acrescimo?.toString() ?? "0.00") ?? "Nao encontrado"}
            />

        </SessionRow>

        <SessionRow style={{ padding: "10px 10px" }}>
            <SimpleInput
                inputType="text"
                readonly={true}
                label="SubTotal"
                defaultValue={StrUtil.formatadorComSufixoComGarantiaDeDecimal(venda?.subtotal?.toString() ?? "0.00") ?? "Nao encontrado"}
            />
            <SimpleInput
                inputType="text"
                readonly={true}
                label="Total"
                defaultValue={StrUtil.formatadorComSufixoComGarantiaDeDecimal(venda?.totalvenda?.toString() ?? "0.00") ?? "Nao encontrado"}
            />

        </SessionRow>

        <div style={{ width: "100%", padding: "0px 10px" }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow className="title-medium">
                            <TableHeaderBlue scope="col" style={{ flex: 20 }} >Produto</TableHeaderBlue>
                            <TableHeaderBlue scope="col" style={{ flex: 20 }} >Taxa Cotação</TableHeaderBlue>
                            <TableHeaderBlue scope="col" style={{ flex: 20 }} >Preco Dolar</TableHeaderBlue>
                            <TableHeaderBlue scope="col" style={{ flex: 20 }} >Preco Reais</TableHeaderBlue>
                            <TableHeaderBlue scope="col" style={{ flex: 2 }} >Total Dolar</TableHeaderBlue>
                            <TableHeaderBlue scope="col" style={{ flex: 2 }} >Total Reais</TableHeaderBlue>
                            <TableHeaderBlue scope="col" style={{ flex: 2 }} >Imei</TableHeaderBlue>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {venda != null ? listOfItems() : ""}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        <div>
            <Modal
                shouldCloseOnEsc={true}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={modalStyles}
                ariaHideApp={false}
                contentLabel="Example Modal"
            >
                <ModalCadastroImei
                    item={item}
                    closeModal={closeModalImei}

                />
            </Modal>
        </div>
    </Container>

}

export default ModalVisualizarVenda;