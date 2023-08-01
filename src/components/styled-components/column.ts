import styled from "styled-components";

type Alignment = {
  mainAxisAlignment?: string;
  crossAxisAlignment?: string;
}

const Column = styled.div<Alignment>`
  display: flex;
  width: 100%;
  align-items: ${props => props.mainAxisAlignment ?? "center"};
  justify-content: ${props => props.crossAxisAlignment ?? "center"};
  flex-direction: column;
    margin: 0px;
  padding: 0px;
`;


const Row = styled.div<Alignment>`
  display: flex;
  width: 100%;
  align-items: ${props => props.mainAxisAlignment ?? "center"};
  justify-content: ${props => props.crossAxisAlignment ?? "center"};
  flex-direction: row;
  margin: 0px;
  padding: 0px;
`

export { Column, Row };