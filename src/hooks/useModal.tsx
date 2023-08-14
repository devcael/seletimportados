import { useState } from 'react';
import Modal from 'react-modal';

// Defina os estilos do modal
const modalStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    content: {
        padding: '0px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}

const useModal = () => {
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const afterOpenModal = () => {
        // Implemente lógica aqui após abrir o modal, se necessário
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    // Retorna o estado do modal e as funções de controle
    return {
        modalIsOpen,
        openModal,
        afterOpenModal,
        closeModal,
        modalStyles
    };
}

export default useModal;