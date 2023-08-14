"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import "@styles/fonts.css"
import NavBar from "@components/navbar";
import { Inter } from "next/font/google";
import styled from "styled-components";
import { DivColumn, DivRow } from "@/components/styled-components/directions";
import '../globals.css'
import { Leading } from '@/components/app-bar';
import { BtnAscent, BtnWithBorder } from '@/components/buttons';
import TableFilterProducts from './components/filter-table-clientes';
import { TableContainer } from '@/components/styled-components/table-data-styles';
import ClientesTable from './components/clientes-table';
import { ClientesProvider } from '@/provider/clientes_provider';
import useModal from '@/hooks/useModal';
import ModalCadastroDeClientes from './components/modal-cadastro-fornecedores';
const inter = Inter({ subsets: ['latin'] })
import Modal from 'react-modal';

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: calc(100vw - var(--navbar-width));
  height: 100vh;
`

const AppBar = styled.div`
  position: relative;
  padding: 0px 15px;
  width: 100%;
  height: 80px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  -webkit-box-shadow: 0px 5px 8px -6px rgba(208,223,245,1);
  -moz-box-shadow: 0px 5px 8px -6px rgba(208,223,245,1);
  box-shadow: 0px 5px 8px -6px rgba(208,223,245,1);
  margin-bottom: 10px;
`


export default function Home() {

  const { modalIsOpen, openModal, closeModal, modalStyles } = useModal();
  const arrayCount = [0, 0, 0, 0];

  return (
    <ClientesProvider>
      <main style={{ width: "100vw", height: "100vh", display: "flex" }}>
        <NavBar></NavBar>
        <BodyContainer>
          <AppBar>
            <h2>Clientes</h2>
            <Leading>
              <BtnWithBorder>Link cadastro cliente</BtnWithBorder>
              <BtnAscent onClick={openModal}>Novo Cliente</BtnAscent>
            </Leading>
          </AppBar>
          <TableFilterProducts />
          <div style={{ width: "100%", padding: "0px 15px" }}>
            <TableContainer>
              <ClientesTable></ClientesTable>
            </TableContainer>
          </div>
        </BodyContainer >
        <div>
          <Modal
            shouldCloseOnEsc={true}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={modalStyles}
            ariaHideApp={false}
            contentLabel="Example Modal"
          >
            <ModalCadastroDeClientes onRequestClose={closeModal} cliente={null} />
          </Modal>
        </div>
      </main>
    </ClientesProvider>
  )
}
