"use client"
import "@view/styles/home.css"
import "@view/styles/fonts.css"
import { Inter } from "next/font/google";
import SalesTable from "@view/components/sales-table";
const inter = Inter({ subsets: ['latin'] })


export default function Home() {

  return (
    <body className={inter.className}>
      <div id="table-container" className="blue-table-scroll">
        <SalesTable />
      </div>
    </body>
  )
}
