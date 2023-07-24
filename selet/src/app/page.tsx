"use client"
import "@view/styles/home.css"
import "@view/styles/fonts.css"
import { Inter } from "next/font/google";
import SalesTable from "@view/components/sales-table";
const inter = Inter({ subsets: ['latin'] })


export default function Home() {

  const list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, , 0, 0, 0, 0];

  return (
    <body className={inter.className}>
      <div id="table-container" className="blue-table-scroll">
        <SalesTable></SalesTable>
      </div>

    </body>
  )
}
