import styles from './Header.module.css'

import igniteLogo from '../assets/logo_ignite_simbol.svg'
interface headerProps{
    name:string;
    signOut: () => void
}
export function Header({name, signOut}:headerProps){

    return(
        <header className={styles.header}>
            
            <h4>{name}</h4>
            
            <div className='col'>
                <img src={igniteLogo}/>
                <strong>e-Contabil</strong>
            </div>
            
            <a
                onClick={signOut}
                href='#'
            >
                Sair
            </a>
            
        </header>
    )
}