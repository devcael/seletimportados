"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import "@styles/fonts.css"
import NavBar from "@components/navbar";
import { Inter } from "next/font/google";
import styled from "styled-components";
import '../globals.css'
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import { AppBar, Leading } from '@/components/app-bar';
import TableFilterProducts from './components/filter-table-products';
import { BtnAscent } from '@/components/buttons';
import ProductsTable from './components/products-table';
import Modal from 'react-modal';
import ModalCadastroDeProdutos from './components/modal-cadastro-produtos';
import Produto from '@/domain/models/Produto';
import { ProductProvider } from '../../provider/produto_provider';
import usePaginatedData from '@/hooks/useProdutoPaginationData';
import useMoedasFetcher from '@/hooks/useMoedasFetch';

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: calc(100vw - var(--navbar-width));
  height: 100vh;
    overflow-y: scroll;
`


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


export default function Home() {

  const { moedas } = useMoedasFetcher();

  const [modalIsOpen, setIsOpen] = useState(false);

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    content: {
      padding: '0px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
  }

  function closeModal() {
    setIsOpen(false);
  }


  const router = useRouter();

  useEffect(() => {
    const authenticated = document.cookie.includes('authenticated=true');
    if (!authenticated) {
      router.replace('/');
    }
  }, []);

  return (
    <ProductProvider>
      <main style={{ width: "100vw", height: "100vh", display: "flex" }}>

        <NavBar />
        <BodyContainer>
          <AppBar>
            <h2>Produtos</h2>
            <Leading>
              <BtnAscent onClick={openModal}>Novo Produto</BtnAscent>
            </Leading>
          </AppBar>
          <TableFilterProducts />
          <div style={{ width: "100%", padding: "0px 15px" }}>
            <TableContainer>
              <ProductsTable

              ></ProductsTable>
            </TableContainer>
          </div>
        </BodyContainer >

        <div>
          <Modal
            shouldCloseOnEsc={true}
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={modalStyles}
            ariaHideApp={false}
            contentLabel="Example Modal"
          >
            <ModalCadastroDeProdutos moedas={moedas} onRequestClose={closeModal} produto={null} />
          </Modal>
        </div>

      </main>
    </ProductProvider>
  )
}

