import styled from "styled-components"
import "react-fontawesome"
import InputWithIcon, { Icon } from "@/components/input-with-icon";
import DropDown from "@/components/simple-dropdown";
import { TableFilterComponents, TableFiltersContainer, TableTitle } from "@/components/table-filters";
import { PagController, PagControllerBtn, PagControllerInfo, PaginationWrapper } from "@/components/pagination-styles";
import { useClientesContext } from "@/provider/clientes_provider";
import useDelayedFunctionCall from "@/hooks/useDelayedFunctionCall";
import { useEffect, useState } from "react";

function TableFilterClientes() {

    const { clientesData } = useClientesContext();

    function hangleChange(params: string) {

    } const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currPage, setCurrPage] = useState(0);


    const delayedSearch = useDelayedFunctionCall(300);
    const handleDelayedSearch = (value: string) => {

        clientesData.fetchData(0, itemsPerPage, value);
    };

    const handleInputChange = (event: string) => {
        clientesData.setSearch(event);

        delayedSearch(handleDelayedSearch, event);
    };

    useEffect(() => {

        clientesData.fetchData(currPage, itemsPerPage, '');
    }, [currPage, itemsPerPage]);

    const handlePageChange = (event: string) => {
        let page: number = Number(event);
        setItemsPerPage(page);
    }

    const handleNextPage = () => {


        setCurrPage(prevPage => prevPage + 1);
    }

    const handlePrevPage = () => {
        if (currPage != 0) {
            setCurrPage(prevPage => prevPage - 1);
        }

    }

    return <div style={{ width: "100%", padding: "0px 15px" }}>
        <TableFiltersContainer>
            <TableTitle>
                Filtros
            </TableTitle>
            <TableFilterComponents>
                <InputWithIcon
                    onChange={handleInputChange}
                    inputIcon={<Icon className="fa-solid fa-magnifying-glass"></Icon>}
                    placeHolder="Pesquise seus produtos aqui teste de overflow"
                />
                <PaginationWrapper>
                    <label >Items por página</label>
                    <DropDown
                        onChange={handlePageChange}
                        items={[{ value: "10", label: "10" }, { value: "50", label: "50" }, { value: "100", label: "100" }, { value: "1000", label: "1000" }]}
                    />
                    <PagController>
                        <PagControllerBtn onClick={handlePrevPage}><i className="fa-solid fa-arrow-left"></i></PagControllerBtn>
                        <PagControllerInfo>{clientesData.page + 1}</PagControllerInfo>
                        <PagControllerBtn onClick={handleNextPage}><i className="fa-solid fa-arrow-right"></i></PagControllerBtn>
                    </PagController>
                </PaginationWrapper>
            </TableFilterComponents>
        </TableFiltersContainer>
    </div>
}

export default TableFilterClientes;