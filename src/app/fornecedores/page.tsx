"use client"
import "@styles/home.css"
import "@styles/fonts.css"
import NavBar from "@components/navbar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <body className={inter.className}>
            <NavBar />
        </body>
    )
}
