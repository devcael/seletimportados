"use client"

import { styled } from "styled-components";


const Input = styled.input<{ $inputColor?: string; }>`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.$inputColor || "#BF4F74"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

const TomatoButton = styled(Input)`
  color: ${props => props.$inputColor || "#BF4F74"};
  border-color: ${props => props.$inputColor || "#BF4F74"};
`;



function TesteDeComponentes() {
    return (

        <div>
            <TomatoButton defaultValue="@geelen" type="text" $inputColor="red" />
        </div>

    )
}


export default TesteDeComponentes;