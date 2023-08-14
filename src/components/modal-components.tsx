import styled from "styled-components";

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 1000px;
  background-color: white;
  margin: 0;
  padding-bottom: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: white;
  border-bottom: 1px solid var(--gray-color);
  padding: 10px ;
`


const ModalCloseButton = styled.button`
  display: flex;
  border: 2px  solid var(--gray-color);
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  background-color: white;
  color: var(--gray-color);
`

const Leading = styled.div`
  display: flex;
  gap: 10px;
`

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  background: white;
  display: inline;
  max-height: 80vh;
  overflow-y: scroll;
  padding: 5px 10px;
  &::-webkit-scrollbar {
    display: none;
  }
 `

const SessionRow = styled.div`
  display: flex;
  gap: 10px;
  margin: 6px 0;
 `

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    
`
export { ModalContainer, Header, ModalCloseButton, Leading, Container, SessionRow, Form }