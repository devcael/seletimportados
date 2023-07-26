"use client"
import { styled } from "styled-components";

type InputWithLabelProps = {
  label?: string;
  hintText?: string;
  hookFormObject?: string;
};


const Input = styled.input`
  width: 100%;
  padding: 15px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 0.8px solid #ccc;
  background-color: white;
  transition: 0.5s;
  color: black;
  outline: none;
  font-size: calc(var(--scale-fonts) * 10);
  border-radius: var(--border-radius);
`;

export type {
  InputWithLabelProps
};

export {
  Input,
}