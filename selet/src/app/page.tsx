"use client"
import "../view/styles/home.css"
import "../view/styles/fonts.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";


function NavBar() {
  return (
    <div className="menu-container">
      <div id="logo-container"></div>
      <div className="session-title">
        Menu
      </div>
      <ul className="session-container">
        <li className="menu-item">Dashboard</li>
        <li className="menu-item">Clientes</li>
        <li className="menu-item">Fornecedores</li>
        <li className="menu-item">Produtos</li>
        <li className="menu-item">Financeiro</li>
      </ul>
      <div className="session-title">
        Configurações
      </div>
      <ul className="session-container">
        <li className="menu-item">Configurações</li>
      </ul>
      <button id="logout-button">
        <h3>LOGOUT</h3>
        <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
    </div>
  );
}

export default function Home() {
  return (
    <body>
      <NavBar></NavBar>
    </body>
  )
}
