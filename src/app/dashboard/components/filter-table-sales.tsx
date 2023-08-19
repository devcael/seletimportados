import styled from "styled-components"
import "react-fontawesome"
import InputWithIcon, { Icon } from "@/components/input-with-icon";
import DropDown from "@/components/simple-dropdown";
import { TableFilterComponents, TableFiltersContainer, TableTitle } from "@/components/table-filters";
import { PagController, PagControllerBtn, PagControllerInfo, PaginationWrapper } from "@/components/pagination-styles";
import { useEffect, useState } from "react";
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
import 'dayjs/locale/pt-br';
import locale from 'antd/es/date-picker/locale/pt_BR';
import usePaginatedDataVenda from "@/hooks/useVendaPagination";
import { useVendaContext } from "@/provider/venda_prodiver";
import useDelayedFunctionCall from "@/hooks/useDelayedFunctionCall";

function FilterTableSales() {

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currPage, setCurrPage] = useState(0);
    const [search, setSearch] = useState('');

    const { vendaData } = useVendaContext();

    // Defina a data padrão do componente
    const defaultDates: [Date, Date] = [new Date(), new Date()];

    // Estado para armazenar a lista selecionada
    const [selectedDates, setSelectedDates] = useState<[Date, Date]>(defaultDates);

    // Função para manipular o evento onChange do RangePicker
    const handleRangePickerChange = (dates: [Date, Date]) => {
        setSelectedDates(dates);
    };



    function hangleChange(params: string) {
        console.log(params);

    }

    const handleNextPage = () => {


        setCurrPage(prevPage => prevPage + 1);
    }

    const handlePrevPage = () => {
        if (currPage != 0) {
            setCurrPage(prevPage => prevPage - 1);
        }

    }


    const delayedSearch = useDelayedFunctionCall(300);
    const handleDelayedSearch = (value: string) => {



        vendaData.fetchData(0, itemsPerPage, value);
    };

    const handleInputChange = (event: string) => {
        // productData.setSearch(event);
        // console.log(productData.search);
        delayedSearch(handleDelayedSearch, event);
    };


    useEffect(() => {
        console.log("CurrPage: ", currPage);
        console.log("ItemsPerPage: ", itemsPerPage);
        console.log("Search: ", search);

        setSearch(search);
        vendaData.fetchData(currPage, itemsPerPage, search);
    }, [currPage, itemsPerPage, search]);



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
                        items={[{ value: "10", label: "10" }, { value: "50", label: "50" }, { value: "100", label: "100" }, { value: "1000", label: "1000" }]}
                        onChange={hangleChange}
                    />
                    <PagController>
                        <PagControllerBtn onClick={handlePrevPage}><i className="fa-solid fa-arrow-left"></i></PagControllerBtn>
                        <PagControllerInfo>{vendaData.page + 1}</PagControllerInfo>
                        <PagControllerBtn onClick={handleNextPage}><i className="fa-solid fa-arrow-right"></i></PagControllerBtn>
                    </PagController>
                </PaginationWrapper>
            </TableFilterComponents>
        </TableFiltersContainer>
    </div>
}

export default FilterTableSales;