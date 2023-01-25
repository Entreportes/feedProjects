import styles from './SideBar.module.css'

import {PencilLine, Calculator, Student, Bank, File, Link} from 'phosphor-react'
import { Avatar } from './Avatar'


interface SideBarProps{
    nome: string;
    empresa: string;
    navigationChange: (input:string) => void
}

export function SideBar({nome,empresa,navigationChange}:SideBarProps){

    

    function navigation(params:string){
        navigationChange(params)

    }


    return(
        <aside className={styles.sidebar}>
            <img  
                className={styles.cover}
                src='https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGV2ZWxvcGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=40'
            />
            <div className={styles.profile}>
                <Avatar
                    src='https://github.com/entreportes.png'
                />
                <strong>{nome}</strong>
                <span>{empresa}</span>
            </div>
            {/* <footer>
                <a href='#'>
                    <PencilLine size={20}/>
                    Editar seu perfil
                </a>
            </footer> */}
            <nav>
                <a href='#' onClick={() => navigation('dashboard')}>
                    <Bank/>
                    DashBoard
                </a>
                <a href='#' onClick={() => navigation('feed')}>
                    <Student/>
                    Feed de ensino
                </a>
                <a href='#' onClick={() => navigation('calculator')}>
                    <Calculator/>
                    Calculadoras
                </a>
                <a href='#' onClick={() => navigation('files')}>
                    <File/>
                    Documentos Contábeis
                </a>
                <a href='#' onClick={() => navigation('links')}>
                    <Link/>
                    Links úteis
                </a>
            </nav>

        </aside>
    )
}