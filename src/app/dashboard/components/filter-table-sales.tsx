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
import moment, { Moment } from 'moment';
import dayjs, { Dayjs } from 'dayjs';
import { set } from "react-hook-form";
import { SimpleDropdown } from "@/components/simple-input";
function FilterTableSales() {

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currPage, setCurrPage] = useState(0);
    const [search, setSearch] = useState('');
    const [tipoVenda, setTipoVenda] = useState<'VENDA' | 'ORCAMENTO' | null>('VENDA');

    const { vendaData } = useVendaContext();

    function hangleChange(params: string) {
        setCurrPage(0);
        vendaData.setPage(0);
        setItemsPerPage(parseInt(params));
    }

    function hangleChangeTipoVenda(params: string) {
        setTipoVenda(params as any);
        setCurrPage(0);
        vendaData.setPage(0);
        if (params != "TODOS" && params != null) {
            vendaData.fetchData(0, itemsPerPage, search, {
                currPage: 0,
                pageSize: itemsPerPage,
                search: search,
                tipo: params as any,
                dataInicial: dayjs(vendaData.selectedDates[0]).format("YYYY-MM-DD"),
                dataFinal: dayjs(vendaData.selectedDates[1]).format("YYYY-MM-DD")
            });
            return;
        }
        setTipoVenda(null);
        vendaData.fetchData(0, itemsPerPage, search, {
            currPage: 0,
            pageSize: itemsPerPage,
            search: search,

            dataInicial: dayjs(vendaData.selectedDates[0]).format("YYYY-MM-DD"),
            dataFinal: dayjs(vendaData.selectedDates[1]).format("YYYY-MM-DD")
        });
    }

    const handleNextPage = () => {
        setCurrPage(prevPage => prevPage + 1);
    }

    const handlePrevPage = () => {
        if (currPage != 0) {
            setCurrPage(prevPage => prevPage - 1);
        }

    }
    const handleRangePickerChanges = (dates: any, dateStrings: [string, string]) => {

        try {
            let firstDate: Date = dates[0].toDate();
            let lastDate: Date = dates[1].toDate();
            vendaData.setSelectedDates([firstDate, lastDate]);
        } catch (error) {

        }

    }


    const delayedSearch = useDelayedFunctionCall(300);
    const handleDelayedSearch = (value: string) => {

        let handleTipo: { tipo?: 'VENDA' | 'ORCAMENTO' } = tipoVenda != null ? { tipo: tipoVenda as any } : {};

        vendaData.setPage(0);
        vendaData.fetchData(0, itemsPerPage, value, {
            currPage: currPage,
            pageSize: itemsPerPage,
            search: value,
            dataInicial: dayjs(vendaData.selectedDates[0]).format("YYYY-MM-DD"),
            dataFinal: dayjs(vendaData.selectedDates[1]).format("YYYY-MM-DD"),
            ...handleTipo
        });
    };

    const handleInputChange = (event: string) => {
        setSearch(event);
        delayedSearch(handleDelayedSearch, event);
    };


    useEffect(() => {
        console.log("CurrPage: ", currPage);
        console.log("ItemsPerPage: ", itemsPerPage);
        console.log("Search: ", search);
        let handleTipo: { tipo?: 'VENDA' | 'ORCAMENTO' } = tipoVenda != null ? { tipo: tipoVenda as any } : {};

        vendaData.fetchData(currPage, itemsPerPage, search, {
            currPage: currPage,
            pageSize: itemsPerPage,
            search: search,
            dataInicial: dayjs(vendaData.selectedDates[0]).format("YYYY-MM-DD"),
            dataFinal: dayjs(vendaData.selectedDates[1]).format("YYYY-MM-DD"),
            ...handleTipo
        });
    }, [currPage, itemsPerPage, vendaData.selectedDates]);



    return <div style={{ width: "100%", padding: "0px 15px" }}>
        <TableFiltersContainer>

            <TableTitle>
                Filtros
            </TableTitle>
            <TableFilterComponents>
                <PaginationWrapper>
                    <InputWithIcon
                        onChange={handleInputChange}
                        inputIcon={<Icon className="fa-solid fa-magnifying-glass"></Icon>}
                        placeHolder="Pesquise seus produtos aqui teste de overflow"
                    />
                    <RangePicker
                        onChange={handleRangePickerChanges}
                        defaultValue={[dayjs(vendaData.defaultDates[0]), dayjs(vendaData.defaultDates[1])]}
                        style={{ padding: "8px" }}
                    />
                    <DropDown
                        items={[{ value: "TODOS", label: "TODOS" }, { value: "VENDA", label: "VENDA" }, { value: "ORCAMENTO", label: "ORCAMENTO" }]}
                        onChange={hangleChangeTipoVenda}
                    />
                </PaginationWrapper>
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