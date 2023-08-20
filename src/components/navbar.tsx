"use client"
import Link from "next/link";
import { usePathname } from 'next/navigation'
import styled from "styled-components";


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
  }/* , {
    id: 4,
    href: "/empresa",
    icon: "fa-solid fa-building",
    label: "Empresa",
  }, */
]


var configItems: MenuItemsType[] = [
  {
    id: 0,
    href: "/configuracao",
    icon: "fa fa-gear",
    label: "Configurações",
  },
]

const LogoContainer = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    height: 140px;
    margin-bottom: 15px;
    border-radius: 10px;
    overflow: hidden;
    text-align: center;
`

const MenuContainer = styled.div`
    position: relative;
    display: block;
    width: var(--navbar-width);
    height: 100vh;
    padding: 15px 15px;
    background-color: var(--color-primery-blue);
    overflow: hidden;
    border-radius: 0px 10px 10px 0px;
    color: grey;
  `

const SessionTitle = styled.div`
    border-bottom: 0.5px solid  var(--gray-color);
    margin-bottom: 15px;
    margin-top: 5px;
    padding: 10px 0px;
    color: var(--gray-color);
`

const LogOutButton = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    text-align: center;
    gap : 20px;
    width: 100%;
    height: 50px;
    border-radius: 10px 10px 0px 0px;
    background-color: var(--blue-ascent);
    color: white;
    right: 0;
    bottom: 0;
    border: none;
    cursor: pointer;
    font-weight: 700;
`

const SessionContainer = styled.ul`
    display: flex;
    width: 100%;
    gap: 10px;
    flex-direction: column;
    list-style-type: none;
    margin: 0;
    padding: 0;
`



const MenuItemActivated = styled.li<{ activated: number }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    gap: 15px;
    border-radius: 8px;
    padding: 13px 10px;
    cursor: pointer;
    color: ${props => props.activated ? "white" : ""};
    background: ${props => props.activated ? "linear-gradient(90deg, rgba(217,217,217,0.20) 0%, rgba(217,217,217,0.05) 35%, rgba(217,217,217,0.03) 46%, rgba(217,217,217,0.05) 57%, rgba(217,217,217,0.20) 100%)" : ""};
    &:hover{
      color: white;
    }
`



function NavBar() {

  const currPath = usePathname()

  const listOfMenuItems = menuItems.map((item, index) => {

    const activated: boolean = currPath == item.href;

    return (<Link key={index} href={item.href}>  <MenuItemActivated activated={activated ? 1 : 0} ><i className={item.icon}></i>{item.label}</MenuItemActivated> </Link>);

  });

  return (
    <MenuContainer >
      <LogoContainer >
        <img style={{ width: "100%", }} className="fullwidth-img" src="logo.png" alt="" />
      </LogoContainer>
      <SessionTitle>
        Menu
      </SessionTitle>
      <SessionContainer>{listOfMenuItems}</SessionContainer>
      {/* <SessionTitle>
        Configurações
      </SessionTitle> */}
      <Link href="/">
        <LogOutButton >
          LOGOUT
          <i className="fa fa-arrow-right-from-bracket fa-lg"></i>
        </LogOutButton></Link>
    </MenuContainer>
  );
}



export default NavBar;
