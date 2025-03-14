import {Link} from 'react-router-dom';

export function NotFound() {
    return (
        <div className='center-object'>
            <h1>Error 404</h1>
            <h2>La pagina a la que intenta ingresar no existe</h2>
            <Link className='button-center primary' to='/'>Volver a la pagina principal</Link>
        </div>
    )
}