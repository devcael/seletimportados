import VendaController from '@/core/controllers/venda_controller';
import VendaModel from '@/core/models/venda_model';
import Venda from '@/domain/models/Venda';
import PagamentoVendaUseCase from '@/domain/usecases/PagamentoVenda_usecase';
import ClientesUseCase from '@/domain/usecases/clientes_use_case';
import ItemVendaUseCase from '@/domain/usecases/items_venda_usecase';
import { NextApiRequest, NextApiResponse } from 'next';
import { Item } from 'semantic-ui-react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const vendaId = parseInt(req.query.id as string);
        const venda: VendaModel | null = await VendaController.getVendaById(vendaId);

        if (!venda) {
            res.status(404).json({ error: 'Venda não encontrada' });
            return;
        }



        let idVenda: number = venda.dataValues.id;
        console.log("Id venda", idVenda);

        let listOfItems = await ItemVendaUseCase.getAllByIdVenda(idVenda);
        let listOfPayments = await PagamentoVendaUseCase.getAllPagamentosByVenda(idVenda);
        let findcliente = await ClientesUseCase.getClienteById(venda.dataValues.id_cliente);
        let makeBody = {
            ...venda.dataValues,
            cliente: findcliente,
            items: listOfItems,
            payments: listOfPayments
        }

        res.status(200).json(makeBody);
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: `Erro interno do servidor ${error}` });
    }
}