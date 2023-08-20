import { BtnAscent } from "@/components/buttons";
import { Icon } from "@/components/input-with-icon";
import { Form, Header, Leading, ModalCloseButton, SessionRow } from "@/components/modal-components";
import { InputWithLabelAndFormatter, SimpleInput } from "@/components/simple-input";
import Imei from "@/domain/models/Imei";
import ItemVenda from "@/domain/models/ItemVenda";
import AppFormatters from "@/domain/services/Formatters";
import StrUtil from "@/domain/services/StrUtils";
import AppUtil from "@/domain/services/Utils";
import ImeiUseCase from "@/domain/usecases/imei_use_case";
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


function ModalCadastroImei(params: {
    closeModal: () => void,
    item: ItemVenda | null
}) {

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        getValues,
        watch
    } = useForm({
        mode: "onBlur",
    })

    const handleSubmitData = async (data: any) => {
        if (params.item != null) {
            try {

                let novoImei: Imei = new Imei(
                    0,
                    params.item.id_itens_venda,
                    data.imei,

                )

                await ImeiUseCase.createImei(novoImei);
                params.closeModal();
            } catch (error) {
                console.log("Erro ao registra imei");
                params.closeModal();
            }
        }
    }


    return <Container>
        <Header>
            <h3>Alterar Imei</h3>
            <Leading>

                <ModalCloseButton onClick={params.closeModal}>
                    <Icon className="fa-solid fa-xmark"></Icon>
                </ModalCloseButton>
            </Leading>
        </Header>
        <Form onSubmit={handleSubmit(handleSubmitData)}>
            <SessionRow style={{ padding: "0px 8px" }}>

                <SimpleInput
                    inputType="number"
                    label="Imei"
                    register={register("imei", { required: true })}
                />
            </SessionRow>
            <BtnAscent type="submit" >Alterar</BtnAscent>
        </Form>

    </Container>

}

export default ModalCadastroImei;