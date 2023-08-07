import styled from "styled-components"

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

export {
    PagController, PagControllerInfo, PagControllerBtn, PaginationWrapper
}