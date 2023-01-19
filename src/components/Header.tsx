import styles from './Header.module.css'

import igniteLogo from '../assets/logo_ignite_simbol.svg'

export function Header(){

    return(
        <header className={styles.header}>
            
            <h4>Pantoja Contabilidade</h4>
            
            <div className='col'>
                <img src={igniteLogo}/>
                <strong>e-Contabil</strong>
            </div>
            
            <button
                onClick={(() => {})}
            >
                Sair
            </button>
            
        </header>
    )
}