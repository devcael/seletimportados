import { ReactNode } from "react";
import styled from "styled-components";

const BtnWithBorder = styled.button`
    padding: 8px;
    border-radius: 5px;
    background: white;
    border: 3px solid var(--blue-ascent);
    color: var(--blue-ascent);
    font-weight: 800;
    cursor: pointer;
`

const BtnAscent = styled.button`
    padding: 8px;
    border-radius: 5px;
    background: var(--blue-ascent);
    border: none;
    color: white;
    font-weight: 800;
    cursor: pointer;
`

function ButtonWithIcon(props: { icon: ReactNode, color?: string }) {
    return (
        <BtnAscent style={{ color: `${props.color ?? ''}` }}>
            {props.icon}
        </BtnAscent>
    )

}

export { BtnWithBorder, BtnAscent }