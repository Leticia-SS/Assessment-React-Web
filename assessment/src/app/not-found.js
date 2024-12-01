import './globals.css'

export default function NotFound() {
    return (
      <div className='notFoundContainer'>
        <h1>404 - Página não encontrada</h1>
        <p>Desculpe, a página que você está procurando não existe.</p>
        <a href="/" className='notFoundLink'>
          Voltar para a página inicial
        </a>
      </div>
    );
  }
  