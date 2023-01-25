
import { LoginComponent } from '../components/LoginComponent'
import '../global.css'
import styles from './Login.module.css'


export function Login(){

    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {/* <h1>Pantoja Contabilidade</h1> */}
                <img src='../logo.png'/>
                <LoginComponent/>
                <div>
                    <h4>Porque hoje só existe o hoje,</h4>
                    <h4>e o hoje só existe hoje.</h4>

                </div>

            </div>
            <footer>
                <h5>2023 - E7 Soluções Integradas | Pantoja Contabilidade - Direitos reservados | <small>Versão: 1.0.0</small></h5>
            </footer>

        </div>
    )
}