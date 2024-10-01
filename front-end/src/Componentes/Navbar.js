import { useRef } from "react";
import { useLocation } from "react-router-dom"; // Importa useLocation
import { FaCog, FaTimes } from "react-icons/fa"; // Ícones para abrir/fechar o menu
import "../Styles/main.css"; // Estilos principais

function Navbar() {
    const navRef = useRef();
    const location = useLocation(); // Pega a rota atual

    // Função que alterna a visibilidade do menu
    const toggleNavbar = () => {
        navRef.current.classList.toggle("show-sidebar");
    };

    // Verifica se a rota atual é '/login' e não exibe a Navbar nessa rota
    if (location.pathname === '/login') {
        return null; // Não renderiza a Navbar na página de login
    }

    return (
        <header>
            {/* Engrenagem para mostrar o menu quando a tela estiver pequena */}
            <button className="nav-btn" onClick={toggleNavbar}>
                <FaCog /> {/* Ícone de engrenagem */}
            </button>

            {/* Sidebar com navegação */}
            <nav className="sidebar" ref={navRef}>
                <button className="nav-button"><a href="/Home">Home</a></button>
                <button className="nav-button"><a href="/CadastroCliente">Cliente</a></button>
                <button className="nav-button"><a href="/Pedidos">Pedidos</a></button>
                <button className="nav-button"><a href="/Atribuicao">Atribuição</a></button>
                <button className="nav-button"><a href="/Relatorio">Relatorio</a></button>
                <button className="nav-button"><a href="/CadastroEntregadores">Motoboy</a></button>
                <button className="nav-logout">Sair</button>

                {/* Botão para fechar o menu */}
                <button className="nav-btn nav-close-btn" onClick={toggleNavbar}>
                    <FaTimes /> {/* Ícone de fechar */}
                </button>
            </nav>
        </header>
    );
}

export default Navbar;
