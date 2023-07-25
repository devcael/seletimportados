"use client"
import "../../view/styles/home.css"
import "../../view/styles/fonts.css"
import NavBar from "@view/components/navbar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <body className={inter.className}>
            <NavBar />
        </body>
    )
}
