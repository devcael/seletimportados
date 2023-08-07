import styled from "styled-components"

const TableContainer = styled.div`
    width: 100%;
    height: 600px;
    border-radius: 10px;
    overflow: hidden;
    overflow-y: auto;
    background-color: white;
    margin: 10px 0px;
    border: 1px solid var(--gray-color);
    
  &::-webkit-scrollbar {
    display: none;
    width: 0.2rem;
    height: 0.5rem;
  }

    
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`

const TableRow = styled.tr`
`

const TableHeaderBlue = styled.th`
    position: sticky;
    background-color: var(--blue-table-header);
    color: var(--blue-ascent);
    text-align: left;
    font-size: 14px;
    padding: 9px;
    top: 0;
    left: 0;
`

const TableData = styled.td`
  padding: 10px 10px;
`

const TableHead = styled.thead`
  
`

const TableBody = styled.tbody`
  tr:nth-child(even) {
    background-color: #f2f2f2
  }  
`




export {
  TableData,
  TableHead,
  TableBody,
  TableContainer,
  TableHeaderBlue,
  Table,
  TableRow
}