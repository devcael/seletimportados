import "@view/components/css/blue.table.css"

export default function SalesTable() {

  const list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, , 0, 0, 0, 0];

  return (
    <table className="blue-table">
      <thead className="table-blue-header">
        <tr>
          <th >N°</th>
          <th >Cliente</th>
          <th >Status</th>
          <th >Data</th>
          <th >Total</th>
        </tr>
      </thead>
      {list.map(() => (
        <tr >
          <td className="name-column">1</td>
          <td className="name-column">Micael de Santana Peraira</td>
          <td className="name-column">VENDIDO</td>
          <td className="name-column">23-11-2004</td>
          <td className="name-column"><strong>R$200.00</strong></td>
        </tr>))}
    </table>
  )
}

