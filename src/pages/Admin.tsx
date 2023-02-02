import { Header } from '../components/Header.jsx'
import {Post, PostProps} from '../components/Post.jsx'
import { SideBar } from '../components/SideBar.jsx'
import '../global.css'
import styles from './Home.module.css'
import { parseISO } from 'date-fns'
import { Files } from '../components/Files.js'
import { useEffect, useState } from 'react'
import { Links } from '../components/Links.js'
import {useParams} from 'react-router-dom'
import {HandlePost} from '../components/HandlePost'


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
        <main>
          <HandlePost/>          
        </main>
      </div>
    </div>

  )
}
