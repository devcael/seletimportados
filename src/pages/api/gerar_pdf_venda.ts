import ItemVenda from '@/domain/models/ItemVenda';
import Venda from '@/domain/models/Venda';
import StrUtil from '@/domain/services/StrUtils';
import VendaUseCase from '@/domain/usecases/venda_usecase';
import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {

    let idVenda = req.query.idvenda;

    let venda: Venda = await VendaUseCase.getVenda({ id_venda: Number(idVenda) });


    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(`
    <html>

<head>
    <style>
        * {
            font-family: Arial, Helvetica, sans-serif;
            margin: 0;
            padding: 0;
            font-size: 12px;
        }


        body {
            width: 100vw;
            height: 100vh;
            padding: 10px 10px;
            overflow-y: scroll;
            box-sizing: border-box;
            display: inline;
        }


        .header-container {
            width: 100%;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px 0px;
        }

        .container-empresa {
            flex-grow: 1;
            margin: 0;
            padding: 0;
            border-radius: 5px;
            padding: 0px 10px;
        }

        .container-logo {
            flex-grow: 1;
            height: 100%;
            min-height: 100px;
            background-color: #5c9dff9a;
            border-radius: 5px;

        }

        .container {
            width: 100%;
            overflow-x: auto;
            padding: 15px 0px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            overflow: hidden;
            border-radius: 5px;

        }

        th,
        td {
            border-bottom: 1px solid #ccc;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #5c9dff9a;
            color: #0d3a7d;
        }
    </style>
</head>

<body>
    <div class="header-container">
        <div class="container-empresa">
            <h3 style="font-size: medium;">Selet Importados</h3>
            <p>Rua, 43</p>
            <p>Cidade, Estado</p>
            <p>Complemento</p>
            <p>Telefone</p>
            <p>Email</p>
        </div>
        <div class="container-logo">
            <img>
        </div>
    </div>
    <div style="padding: 0px 10px;">
        <h1 style="font-size: 20px;">INVOICE</h1>
    </div>
    <div style="display: flex; justify-content: space-between;padding: 10px 10px;">
        <div style="flex-grow: 1; ">
            <h3 style="font-size: medium;">${venda.cliente?.nome}</h3>
            <p>${venda.cliente?.endereco}, ${venda.cliente?.numero}</p>
            <p>${venda.cliente?.cidade}, ${venda.cliente?.estado}</p>
            <p>${venda.cliente?.complemento}</p>
            <p>${venda.cliente?.telefone}</p>
            <p>${venda.cliente?.email}</p>
        </div>
        <div style="flex-grow: 1; text-align: right;  ">
            <h3 style="font-size: medium;">Invoice #${venda.id}</h3>
            <h3 style="font-size: medium;">Data: ${venda.data}</h3>
        </div>
    </div>
    <div class="container">
        <div style="padding: 0px 10px;">
            <table>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>IMEI</th>
                        <th>Qnt</th>
                        <th>Preco Dolar</th>
                        <th>Preco Real</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${venda.listItems.map((item: ItemVenda) => `<tr>
                        <td>${item.nome_produto}</td>
                           <td>${item.imei?.numeroimei ?? "Não Adicionado"}</td>
                        <td>${item.quantidade}</td>
                        <td>${StrUtil.formatadorComPrefixo(item.preco_produto.toString(), "$")}</td>
                        <td>${StrUtil.formatadorComPrefixo(item.getPrecoConvertido().toString(), "R$")}</td>
                        <td>${StrUtil.formatadorComPrefixo(item.getValorTotalConvertido().toString(), "R$")}</td>
                    </tr>`)
      }

                </tbody>
            </table>
        </div>
    </div>
    <div style="width: 100%; height: 1px; background-color: rgb(227, 226, 226); margin: 10px 0px;"></div>
    <div style="  display: flex;justify-content: space-between; flex-grow: 1;  padding: 5px 10px;">
        <h1 style="font-size: small;">Subtotal</h1>
        <h1 style="font-size: small;">${StrUtil.formatadorComSufixoComGarantiaDeDecimal(venda.subtotal.toString())}</h1>
    </div>
    <div style="  display: flex;justify-content: space-between; flex-grow: 1;  padding: 5px 10px;">
        <h1 style="font-size: small;">Desconto</h1>
        <h1 style="font-size: small;">${StrUtil.formatadorComSufixoComGarantiaDeDecimal(venda.desconto?.toString() ?? "0.00")}</h1>
    </div>
    </div>
    <div style="  display: flex;justify-content: space-between; flex-grow: 1;  padding: 5px 10px;">
        <h1 style="font-size: small;">Acrescimo</h1>
        <h1 style="font-size: small;">${StrUtil.formatadorComSufixoComGarantiaDeDecimal(venda.acrescimo?.toString() ?? "0.00")}</h1>
    </div>
    </div>
    <div style="  display: flex;justify-content: space-between; flex-grow: 1;  padding: 5px 10px;">
        <h1 style="font-size: small;">Total</h1>
        <h1 style="font-size: small;">${StrUtil.formatadorComSufixoComGarantiaDeDecimal(venda.totalvenda.toString())}</h1>
    </div>
</body>

</html>
    `);

    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=example.pdf');
    res.status(200).send(pdfBuffer);
  } else {
    res.status(405).send('Method not allowed.');
  }
}