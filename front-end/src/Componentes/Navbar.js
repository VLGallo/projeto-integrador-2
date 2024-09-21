import { useRef } from "react";
import Logo from '../assets/img/favicon.png';  
import { FaBars, FaTimes } from "react-icons/fa";
import "../Styles/main.css";

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header>
			 <img src={Logo} alt="Logo Casa Zé Rissi" className="Logo" />
			<nav ref={navRef}>
				<a href="/Home">Home</a>
				<a href="/Pedidos">Pedidos</a>
				<a href="/Atribuicao">Atribuição</a>
				<a href="/Relatorio">Relatorio</a>
				<a href="/CadastroEntregadores">Cadastro</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;
