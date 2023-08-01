"use client"
import "@styles/fonts.css"
import "@styles/teste.css"
import { Inter } from "next/font/google";
import styled from "styled-components";
import {
  TableData,
  TableHead,
  TableBody,
  TableHeaderBlue,
  Table,
  TableRow
} from "@components/styled-components/table-data-styles"
const inter = Inter({ subsets: ['latin'] })

const Body = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: white;
`

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



export default function Home() {

  return (
    <Body className={inter.className}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderBlue scope="col">Account</TableHeaderBlue>
              <TableHeaderBlue scope="col">Due Date</TableHeaderBlue>
              <TableHeaderBlue scope="col">Amount</TableHeaderBlue>
              <TableHeaderBlue scope="col">Period</TableHeaderBlue>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <td data-label="Account">Visa - 3412</td>
              <td data-label="Due Date">04/01/2016</td>
              <td data-label="Amount">$1,190</td>
              <td data-label="Period">03/01/2016 - 03/31/2016</td>
            </TableRow>
            <TableRow>
              <TableData scope="row" data-label="Account">Visa - 6076</TableData>
              <TableData data-label="Due Date">03/01/2016</TableData>
              <TableData data-label="Amount">$2,443</TableData>
              <TableData data-label="Period">02/01/2016 - 02/29/2016</TableData>
            </TableRow>
            <TableRow>
              <TableData scope="row" data-label="Account">Corporate AMEX</TableData>
              <TableData data-label="Due Date">03/01/2016</TableData>
              <TableData data-label="Amount">$1,181</TableData>
              <TableData data-label="Period">02/01/2016 - 02/29/2016</TableData>
            </TableRow>
            <TableRow>
              <TableData scope="row" data-label="Acount">Visa - 3412</TableData>
              <TableData data-label="Due Date">02/01/2016</TableData>
              <TableData data-label="Amount">$842</TableData>
              <TableData data-label="Period">01/01/2016 - 01/31/2016</TableData>
            </TableRow>
            <TableRow>
              <TableData scope="row" data-label="Acount">Visa - 3412</TableData>
              <TableData data-label="Due Date">02/01/2016</TableData>
              <TableData data-label="Amount">$842</TableData>
              <TableData data-label="Period">01/01/2016 - 01/31/2016</TableData>
            </TableRow>
            <TableRow>
              <TableData scope="row" data-label="Acount">Visa - 3412</TableData>
              <TableData data-label="Due Date">02/01/2016</TableData>
              <TableData data-label="Amount">$842</TableData>
              <TableData data-label="Period">01/01/2016 - 01/31/2016</TableData>
            </TableRow>
            <TableRow>
              <TableData scope="row" data-label="Acount">Visa - 3412</TableData>
              <TableData data-label="Due Date">02/01/2016</TableData>
              <TableData data-label="Amount">$842</TableData>
              <TableData data-label="Period">01/01/2016 - 01/31/2016</TableData>
            </TableRow>
            <TableRow>
              <TableData scope="row" data-label="Acount">Visa - 3412</TableData>
              <TableData data-label="Due Date">02/01/2016</TableData>
              <TableData data-label="Amount">$842</TableData>
              <TableData data-label="Period">01/01/2016 - 01/31/2016</TableData>
            </TableRow>

            <TableRow>
              <TableData scope="row" data-label="Acount">Visa - 3412</TableData>
              <TableData data-label="Due Date">02/01/2016</TableData>
              <TableData data-label="Amount">$842</TableData>
              <TableData data-label="Period">01/01/2016 - 01/31/2016</TableData>
            </TableRow>
            <TableRow>
              <TableData scope="row" data-label="Acount">Visa - 3412</TableData>
              <TableData data-label="Due Date">02/01/2016</TableData>
              <TableData data-label="Amount">$842</TableData>
              <TableData data-label="Period">01/01/2016 - 01/31/2016</TableData>
            </TableRow>
          </TableBody>


        </Table>

      </TableContainer>
    </Body>
  )
}
