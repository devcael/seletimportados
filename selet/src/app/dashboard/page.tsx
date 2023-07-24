"use client"
import "../../view/styles/home.css"
import "../../view/styles/fonts.css"
import NavBar from "@view/components/navbar";
import { Inter } from "next/font/google";
import styled from "styled-components";

const inter = Inter({ subsets: ['latin'] })


const Body = styled.div`
  flex: 1;
  height: 100vh;
  background-color: red;
`;

export default function Home() {
  return (
    <body className={inter.className}>
      <NavBar />
      <Body></Body>
    </body>
  )
}
