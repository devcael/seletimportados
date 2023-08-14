import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faBoxesStacked } from '@fortawesome/free-solid-svg-icons';


const Container = styled.div`

  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  padding: 20px;
  text-align: center; /* Centralizar conteúdo horizontalmente */
    
`

function EmptyListContainer(params: { label: string; }) {
    return (
        <Container>
            <FontAwesomeIcon icon={faBoxesStacked} size="lg" />
            <p>{params.label}</p>
        </Container>
    )
}

export default EmptyListContainer;