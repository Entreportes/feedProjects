import { Header } from '../components/Header.jsx'
import { SideBar } from '../components/SideBar.jsx'
import '../global.css'
import styles from './Home.module.css'
import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {HandlePost} from '../components/HandlePost'
import { DeletePost } from '../components/DeletePost.js'


interface Author{
  name: string;
  role: string;
  avatarUrl: string;
}
// interface PostProps{
//   id: number;
//   author: Author;
//   publishedAt: Date;
//   content: {
//     type: 'paragraph'|'link'|'video'|'title'|'tags';
//     content: string;
//   }[];
// }



export function Admin() {  

  const [navigationApp, setNavigationApp] =useState('dashboard')


  const {nome,empresa} = useParams()

  useEffect(() =>{

  },[navigationApp])
  return (
    <div>

      <Header/>

      <div className={ styles.wrapper } >
        <SideBar
            nome={nome ? nome.charAt(0).toUpperCase() + nome.substring(1) : "Lucas Entreportes"}
            empresa={empresa ? empresa.toUpperCase() : "E7 Soluções Integradas"}
            navigationChange={setNavigationApp}
        />
        <div>
          <HandlePost/>
          
          <DeletePost/>
        </div>
      </div>
    </div>

  )
}