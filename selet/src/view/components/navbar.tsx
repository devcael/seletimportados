import Link from "next/link";
import "./css/navbar_style.css"


type MenuItemsType = {
  href: string;
  icon: string;
  label: string;
}

var menuItems: MenuItemsType[] = [
  {
    href: "/dashboard",
    icon: "fa-solid fa-house-chimney",
    label: "Dashboard",
  },
  {
    href: "/clientes",
    icon: "fa-solid fa-users",
    label: "Clientes",
  },
  {
    href: "/fornecedores",
    icon: "fa-solid fa-building-user",
    label: "Fornecedores",
  }, {
    href: "/produtos",
    icon: "fa-solid fa-cubes",
    label: "Produtos",
  }, {
    href: "/financeiro",
    icon: "fa-solid fa-money-bills",
    label: "Financeiro",
  },
]


var configItems: MenuItemsType[] = [
  {
    href: "/configuracao",
    icon: "fa fa-gear",
    label: "Configurações",
  },
]


function NavBar() {


  var currPath: string = window.location.pathname;

  return (
    <div className="menu-container">
      <div id="logo-container">
        <img className="fullwidth-img" src="logo.png" alt="" />
      </div>
      <div className="session-title">
        Menu
      </div>
      <ul className="session-container">
        {
          menuItems.map((item: MenuItemsType, index: number) => {
            var isActive: boolean = currPath == item.href;
            return (<Link href={item.href}><li key={index} className={isActive ? "menu-item menu-item-selected" : "menu-item"}><i className={item.icon}></i>{item.label}</li></Link>);

          })
        }
      </ul>
      <div className="session-title">
        Configurações
      </div>
      <ul className="session-container">
        {
          configItems.map((item: MenuItemsType, index: number) => {
            var isActive: boolean = currPath == item.href;
            return (<Link href={item.href}><li key={index} className={isActive ? "menu-item menu-item-selected" : "menu-item"}><i className={item.icon}></i>{item.label}</li></Link>);

          })
        }
      </ul>
      <Link href="/login">
        <button type="submit" id="logout-button">
          <h4>LOGOUT</h4>
          <i className="fa fa-arrow-right-from-bracket fa-lg"></i>
        </button></Link>
    </div>
  );
}



export default NavBar;
