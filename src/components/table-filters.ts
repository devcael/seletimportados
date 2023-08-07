import styled from "styled-components"

const TableFiltersContainer = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 5px;
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
`

const TableTitle = styled.div`
    width: 100%;
    padding: 0px 5px;
    font-size: calc(var(--scale-fonts) * 25px);
    font-weight: 700;
`

const TableFilterComponents = styled.div`
    display: flex;
    align-items: stretch ;
    justify-content: space-between;
    width: 100%;
    height: 100%;
`


export {
  TableFilterComponents, TableFiltersContainer, TableTitle
}
