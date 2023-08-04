"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import "@styles/fonts.css"
import NavBar from "@components/navbar";
import { Inter } from "next/font/google";
import styled from "styled-components";
import '../globals.css'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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

const TableFiltersContainer = styled.div`
  width: 100%;
  height: 100px; 
  background-color: red;
  padding: 10px 0px;
`

export default function Home() {


  const router = useRouter();

  useEffect(() => {
    const authenticated = document.cookie.includes('authenticated=true');
    if (!authenticated) {
      router.push('/');
    }
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      <NavBar></NavBar>
      <BodyContainer>
        <AppBar>
        </AppBar>

        <TableFiltersContainer>
          <h2>Filtros</h2>
        </TableFiltersContainer>
      </BodyContainer >
    </div>
  )
}
