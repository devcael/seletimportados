"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import "@styles/fonts.css"
import NavBar from "@components/navbar";
import { Inter } from "next/font/google";
import styled from "styled-components";
import '../globals.css'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AppBar, Leading } from '@/components/app-bar';
import TableFilterProducts from './components/filter-table-products';
import { BtnAscent } from '@/components/buttons';
import ProductsTable from './components/products-table';

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: calc(100vw - var(--navbar-width));
  height: 100vh;
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

  /* &:hover::-webkit-scrollbar {
      display: block;
  }

  &:hover::-webkit-scrollbar-thumb {
      visibility: none;
  }

  &::-webkit-scrollbar-thumb {
      border-radius: .2rem;
      background-color: var(--blue-table-header);
      visibility: hidden;
  } */
    
`

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    const authenticated = document.cookie.includes('authenticated=true');
    if (!authenticated) {
      router.replace('/');
    }
  }, []);

  return (
    <main style={{ width: "100vw", height: "100vh", display: "flex" }}>
      <NavBar />
      <BodyContainer>
        <AppBar>
          <h2>Produtos</h2>
          <Leading>
            <BtnAscent>Novo Produto</BtnAscent>
          </Leading>
        </AppBar>
        <TableFilterProducts />
        <div style={{ width: "100%", padding: "0px 15px" }}>
          <TableContainer>
            <ProductsTable></ProductsTable>
          </TableContainer>
        </div>

      </BodyContainer >

    </main>
  )
} 
