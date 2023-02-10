import styles from './SideBar.module.css'
import '../global.css'
import {PencilLine, Calculator, Student, Bank, File, Link,BookBookmark,UserCircleGear    } from 'phosphor-react'
import { Avatar } from './Avatar'
import { useState } from 'react';
import { UserDTO } from '../dtos/UserDTO';


interface SideBarProps{
    user: UserDTO;
    company: string;
    navigationChange: (input:string) => void;
    admin: boolean;
}

export function SideBar({user,company,navigationChange,admin}:SideBarProps){

    const [isSelected,setIsSelected] = useState('dashboard');

    function navigation(params:string){
        setIsSelected(params)
        navigationChange(params)

    }


    console.log(isSelected)
    return(
        <aside className={styles.sidebar}>
            <img  
                className={styles.cover}
                src='https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGV2ZWxvcGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=40'
            />
            <div className={styles.profile}>
                <Avatar
                    src={user.avatar}
                />
                <strong>{user.name}</strong>
                <span>{company}</span>
            </div>
            {/* <footer>
                <a href='#'>
                    <PencilLine size={20}/>
                    Editar seu perfil
                </a>
            </footer> */}
            <nav>
                <a href='#' 
                    onClick={() => navigation('dashboard')}
                    className= {isSelected === 'dashboard' ? styles.backgroundSelected : ""}   
                >
                    <Bank/>
                    DashBoard
                </a>
                <a  href='#' 
                    onClick={() => navigation('feed')}
                    className= {isSelected === 'feed' ? styles.backgroundSelected : ""}
                >
                    <Student/>
                    Feed de ensino
                </a>
                <a  href='#' 
                    onClick={() => navigation('article')}
                    className= {isSelected === 'article' ? styles.backgroundSelected : ""}
                >
                    <BookBookmark  />
                    Artigos
                </a>
                <a href='#' 
                    onClick={() => navigation('calculator')}
                    className= {isSelected === 'calculator' ? styles.backgroundSelected : ""}
                >
                    <Calculator/>
                    Calculadoras
                </a>
                <a href='#' 
                    onClick={() => navigation('files')}
                    className= {isSelected === 'files' ? styles.backgroundSelected : ""}
                >
                    <File/>
                    Documentos Contábeis
                </a>
                <a href='#' 
                    onClick={() => navigation('links')}
                    className= {isSelected === 'links' ? styles.backgroundSelected : ""}
                >
                    <Link/>
                    Links úteis
                </a>
                {admin ? 
                    <a href='#'
                        onClick={() => navigation('admin')}
                        className= {isSelected === 'admin' ? styles.backgroundSelected : ""}
                    >
                        <UserCircleGear/>
                        Admin
                    </a>
                    :
                    null
}
            </nav>

        </aside>
    )
}