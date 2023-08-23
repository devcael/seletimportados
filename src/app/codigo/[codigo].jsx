"use client"


import { useRouter } from "next/router";
import React from "react";
import { styled } from "styled-components"


export default function Home() {

    const router = useRouter();


    let value = router.query.codigo;

    return (
        <div>
            <h1>{value}</h1>
        </div>
    )
}