import { BtnAscent } from "@/components/buttons";
import { Icon } from "@/components/input-with-icon";
import { Header, Leading, ModalCloseButton, SessionRow } from "@/components/modal-components";
import { InputWithLabelAndFormatter, SimpleInput } from "@/components/simple-input";
import AppFormatters from "@/domain/services/Formatters";
import StrUtil from "@/domain/services/StrUtils";
import AppUtil from "@/domain/services/Utils";
import MoedaConversaoUseCase from "@/domain/usecases/moedas_conversao_usecase";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
    gap: 15px;
    background-color: white;
    
`

function ModalAlterarMoedaDolar(props: {
    closeModal: () => void,
    valorAtual: number
}) {



    const [preco, setPreco] = useState(props.valorAtual);


    const handlerAlterarCotacao = async () => {
        try {
            await MoedaConversaoUseCase.updateMoeda(1, { taxa_de_conversao_real: preco });
            props.closeModal();
        } catch (error) {
            console.log("Erro ao atualizar cotação");

        }
    }




    useEffect(() => {

    }, [preco]);



    return <Container>
        <Header>
            <h3>Alterar Cotação</h3>
            <Leading>

                <ModalCloseButton onClick={props.closeModal}>
                    <Icon className="fa-solid fa-xmark"></Icon>
                </ModalCloseButton>
            </Leading>
        </Header>
        <SessionRow style={{ padding: "0px 8px" }}>

            <InputWithLabelAndFormatter
                inputType='text'
                label="Cotação Atual"
                formatterFunction={(value) => AppFormatters.formatadorPersonalizado(value, "$")}
                defaultValue={AppFormatters.formatadorPersonalizado(preco.toString(), "$")}
                onChange={(event) => {
                    setPreco(StrUtil.transformarStringDinheiroEmDOuble(event, "$") ?? 0.00);
                }}
            />
        </SessionRow>
        <BtnAscent onClick={async () => await handlerAlterarCotacao()} >Alterar</BtnAscent>

    </Container>

}

export default ModalAlterarMoedaDolar;