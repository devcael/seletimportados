import styled from "styled-components"
import "react-fontawesome"
import InputWithIcon, { Icon } from "@/components/input-with-icon";
import DropDown from "@/components/simple-dropdown";
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

const PaginationWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const PagController = styled.div`
    display: flex;
    background-color: white;
    padding: 8px 15px;
    border-radius: 5px;
    border: 1px solid  var(--gray-color);
`

const PagControllerBtn = styled.button`
    background-color: transparent;
    color: gray;
    border: none;
    height: 100%;
    cursor: pointer;
`

const PagControllerInfo = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    margin: 0px 10px;
`





function TableFilterProducts() {

    function hangleChange(params: string) {
        console.log(params);

    }


    return <div style={{ width: "100%", padding: "0px 15px" }}>
        <TableFiltersContainer>
            <TableTitle>
                Filtros
            </TableTitle>
            <TableFilterComponents>
                <InputWithIcon
                    inputIcon={<Icon className="fa-solid fa-magnifying-glass"></Icon>}
                    placeHolder="Pesquise seus produtos aqui teste de overflow"
                />
                <PaginationWrapper>
                    <label >Items por página</label>
                    <DropDown
                        items={[{ value: "Micael", label: "100" }, { value: "Micael", label: "100" }]}
                        onChange={hangleChange}
                    />
                    <PagController>
                        <PagControllerBtn><i className="fa-solid fa-arrow-left"></i></PagControllerBtn>
                        <PagControllerInfo>1 / 5</PagControllerInfo>
                        <PagControllerBtn><i className="fa-solid fa-arrow-right"></i></PagControllerBtn>
                    </PagController>
                </PaginationWrapper>
            </TableFilterComponents>
        </TableFiltersContainer>
    </div>
}

export default TableFilterProducts;