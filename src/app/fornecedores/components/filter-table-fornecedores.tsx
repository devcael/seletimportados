import styled from "styled-components"
import "react-fontawesome"
import InputWithIcon, { Icon } from "@/components/input-with-icon";
import DropDown from "@/components/simple-dropdown";
import { TableFilterComponents, TableFiltersContainer, TableTitle } from "@/components/table-filters";
import { PagController, PagControllerBtn, PagControllerInfo, PaginationWrapper } from "@/components/pagination-styles";

function TableFilterFornecedores() {

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

export default TableFilterFornecedores;