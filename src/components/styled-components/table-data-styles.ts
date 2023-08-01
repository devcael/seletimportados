import styled from "styled-components"

const TableContainer = styled.div`
    width: 70vw;
    height: 500px;
    border-radius: 10px;
    overflow-y: auto;
    
  &::-webkit-scrollbar {
    display: hidden;
    width: 0.2rem;
    height: 0.5rem;
  }

  &:hover::-webkit-scrollbar {
      display: block;
  }

  &:hover::-webkit-scrollbar-thumb {
      visibility: visible;
  }

  &::-webkit-scrollbar-thumb {
      border-radius: .2rem;
      background-color: var(--blue-table-header);
      visibility: hidden;
  }
    
`

const Table = styled.table`
  width: 100%;
  height: 500px;
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
  height: 100px;
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