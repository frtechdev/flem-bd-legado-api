import "../styles/globals.css";


/**
 * Componente de inicialização da aplicação.
 * @param {Component} props propriedades dos Componentes visuais.
 * @returns Componente.
 */
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
