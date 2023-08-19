import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoagingContainer = styled.div`

  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  padding: 20px;
  text-align: center; /* Centralizar conteúdo horizontalmente */
    
`

const SpinnerWrapper = styled.div`
  display: inline-block;
  animation: ${spinAnimation} 1s linear infinite;
`;

const LoadingSpinner = () => (
  <SpinnerWrapper>
    <FontAwesomeIcon icon={faSpinner} size="lg" />
  </SpinnerWrapper>
);

function LoadingSpinnerWithLabel(params: { label: string; }) {
  return (
    <LoagingContainer>
      <LoadingSpinner></LoadingSpinner>
      <p>{params.label}</p>
    </LoagingContainer>
  )
}

export { LoadingSpinner, LoadingSpinnerWithLabel };