
import { LoginComponent } from '../components/LoginComponent'
import '../global.css'
import { useAuth } from '../hooks/useAuth'
import styles from './Login.module.css'

const logo = 'https://www.pantojacontabilidade.com.br/images/logo1.PNG'
const name = 'Pantoja Contabilidade'
const site = 'https://www.pantojacontabilidade.com.br'



export function Login(){
    const {signIn} = useAuth()
    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <a href={site} target='_blank'>
                    <img src={logo}/>
                    <h1>{name}</h1>
                </a>
                <LoginComponent
                    signIn={signIn}
                />
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