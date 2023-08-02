"use client"
import Link from "next/link";
import "./css/navbar_style.css"
import { usePathname } from 'next/navigation'

type MenuItemsType = {
  id: number;
  href: string;
  icon: string;
  label: string;
}

var menuItems: MenuItemsType[] = [
  {
    id: 0,
    href: "/dashboard",
    icon: "fa-solid fa-house-chimney",
    label: "Dashboard",
  },
  {
    id: 1,
    href: "/clientes",
    icon: "fa-solid fa-users",
    label: "Clientes",
  },
  {
    id: 2,
    href: "/fornecedores",
    icon: "fa-solid fa-building-user",
    label: "Fornecedores",
  }, {
    id: 3,
    href: "/produtos",
    icon: "fa-solid fa-cubes",
    label: "Produtos",
  }, {
    id: 4,
    href: "/financeiro",
    icon: "fa-solid fa-money-bills",
    label: "Financeiro",
  },
]


var configItems: MenuItemsType[] = [
  {
    id: 0,
    href: "/configuracao",
    icon: "fa fa-gear",
    label: "Configurações",
  },
]


function NavBar() {

  const currPath = usePathname()

  const listOfMenuItems = menuItems.map((item, index) => <Link key={index} href={item.href}><li key={item.id} className={currPath == item.href ? "menu-item menu-item-selected" : "menu-item"}><i className={item.icon}></i>{item.label}</li></Link>);


  return (
    <div className="menu-container">
      <div id="logo-container">
        <img className="fullwidth-img" src="logo.png" alt="" />
      </div>
      <div className="session-title">
        Menu
      </div>
      <ul className="session-container" key={0}>{listOfMenuItems}</ul>
      <div className="session-title">
        Configurações
      </div>
      <Link href="/">
        <button type="submit" id="logout-button">
          <h4>LOGOUT</h4>
          <i className="fa fa-arrow-right-from-bracket fa-lg"></i>
        </button></Link>
    </div>
  );
}



export default NavBar;
