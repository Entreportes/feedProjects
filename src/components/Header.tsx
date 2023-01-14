import styles from './Header.module.css'

import igniteLogo from '../assets/logo_ignite_simbol.svg'

export function Header(){

    return(
        <header className={styles.header}>
            <img src={igniteLogo}/>
            <strong>Feed Model</strong>
        </header>
    )
}