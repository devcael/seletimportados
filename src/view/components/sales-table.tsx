"use client"
import "@view/components/css/blue.table.css"
import styled from "styled-components";

const NameColumn = styled.div`
  
`;

export default function SalesTable() {

  const list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, , 0, 0, 0, 0];

  return (
    <table className="blue-table">
      <tr className="table-blue-header">
        <th >N°</th>
        <th >Cliente</th>
        <th >Status</th>
        <th >Data</th>
        <th >Total</th>
      </tr>

      {list.map((item, i) => (
        <tr key={i}>
          <td className="name-column">1</td>
          <td className="name-column">Micael de Santana Peraira</td>
          <td className="name-column">VENDIDO</td>
          <td className="name-column">23-11-2004</td>
          <td className="name-column"><strong>R$200.00</strong></td>
        </tr>))}
    </table>
  )
}

