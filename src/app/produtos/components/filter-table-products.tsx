import styled from "styled-components"
import "react-fontawesome"
import InputWithIcon, { Icon } from "@/components/input-with-icon";
import DropDown from "@/components/simple-dropdown";
import { useProductContext } from "../../../provider/produto_provider";
import useDelayedFunctionCall from "@/hooks/useDelayedFunctionCall";
import { useEffect, useState } from "react";
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
    const { productData } = useProductContext();
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currPage, setCurrPage] = useState(0);



    const delayedSearch = useDelayedFunctionCall(300);
    const handleDelayedSearch = (value: string) => {
        console.log(productData.search);


        productData.fetchData(0, itemsPerPage, value);
    };

    const handleInputChange = (event: string) => {
        productData.setSearch(event);
        console.log(productData.search);
        delayedSearch(handleDelayedSearch, event);
    };


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
                    onChange={handleInputChange
                    }
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
                        <PagControllerInfo>{productData.page + 1}</PagControllerInfo>
                        <PagControllerBtn onClick={handleNextPage}><i className="fa-solid fa-arrow-right"></i></PagControllerBtn>
                    </PagController>
                </PaginationWrapper>
            </TableFilterComponents>
        </TableFiltersContainer>
    </div>
}

export default TableFilterProducts;