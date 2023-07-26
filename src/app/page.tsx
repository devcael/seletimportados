"use client"
import "@styles/home.css"
import "@styles/fonts.css"
import { Inter } from "next/font/google";
import SalesTable from "@components/sales-table";
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
