// Create a logic to search for products by name and show a list of products that match the search and autocomplete with input

import { SimpleInput } from "@/components/simple-input";
import styled from "styled-components";

const SugestionContainer = styled.div`
    width: 100vw;
    padding: 10px 0px;
    background-color: red;
    position: absolute;
    border-radius: 8px;
    border: 1px solid var(--gray-color);
    margin-top: 8px;
    z-index: 1;
`


export default function AutoCompleteInput() {
    return <div>
        <SimpleInput
            inputType="text"
        ></SimpleInput>
        <SugestionContainer >
            <h1>Micael Teste</h1>
            <h1>Micael Teste</h1>
            <h1>Micael Teste</h1>
            <h1>Micael Teste</h1>
            <h1>Micael Teste</h1>
            <h1>Micael Teste</h1>
        </SugestionContainer>
    </div>;
}