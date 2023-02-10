import { Header } from '../components/Header.jsx'
import { SideBar } from '../components/SideBar.jsx'
import '../global.css'
import styles from './Home.module.css'
import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { ManageClient } from '../components/admin/ManageClients'
import { Dashboard } from '../components/Dashboard.js'
import { Post, PostProps } from '../components/Post.js'
import { parseISO } from 'date-fns'
import { HandleLinks } from '../components/HandleLinks.js'


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

  const [navigationApp, setNavigationApp] =useState<'dashboard'|'article'|'links'|'feed'|'calculator'|'files'|'admin'|string>('admin')

  const {user,signOut} = useAuth()

  const [posts,setPosts] = useState<PostProps[]>([
    {
    id:'1',
    author:{
      avatarUrl: 'https://github.com/renatomh.png',
      name: 'Renato Henz',
      role: 'CEO MHSW'
    },
    content:{ 
      title: 'Como funciona a contabilidade de uma empresa',
      tags: ['contabilidade', 'BI'],
      paragragh: 'Empreendedores nem sempre dão\n a devida atenção à contabilidade de seus negócios. \nUm cuidado maior com as finanças da empresa permite um entendimento mais claro sobre o balanço financeiro e a demonstração de resultados, dois pontos fundamentais. Pensando nisso, preparei uma miniaula sobre contabilidade. Assista!',
      link: 'http://cerbasi.site/grade-opd-yt',
      video:'iYma9_gpEUQ',

    }            
    ,
    publishedAt: parseISO('2022-11-01 19:00:00')
    },
    {
      id:'2',
      author:{
        avatarUrl: 'https://github.com/entreportes.png',
        name: 'Lucas Entreportes',
        role: 'Engineer'
      },
      content:{ 
        title: 'Como funciona a contabilidade de uma empresa',
        tags: ['contabilidade', 'BI'],
        paragragh: 'Empreendedores nem sempre dão a devida atenção à contabilidade de seus negócios. \nUm cuidado maior com as finanças da empresa permite um entendimento mais claro sobre o balanço financeiro e a demonstração de resultados, dois pontos fundamentais. Pensando nisso, preparei uma miniaula sobre contabilidade. Assista!',
        link: 'http://cerbasi.site/grade-opd-yt',
        video:'iYma9_gpEUQ',

      }            
      ,
      publishedAt: parseISO('2022-11-01 19:00:00')
    },
    {
      id:'3',
      author:{
        avatarUrl: 'http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcR0KZom0y5vl3t_V4xzrrFenuKIMvsfCGeOXeH8BhAK74ndYNIhluarqybGUoZXzSFa',
        name: 'Carolina',
        role: 'Deusa'
      },
      content:{ 
        title: 'Como funciona a contabilidade de uma empresa',
        tags: ['contabilidade', 'BI'],
        paragragh: 'Empreendedores nem sempre dão a devida atenção à contabilidade de seus negócios. \nUm cuidado maior com as finanças da empresa permite um entendimento mais claro sobre o balanço financeiro e a demonstração de resultados, dois pontos fundamentais. Pensando nisso, preparei uma miniaula sobre contabilidade. Assista!',
        link: 'http://cerbasi.site/grade-opd-yt',
        video:'iYma9_gpEUQ',

      }            
      ,
      publishedAt: parseISO('2022-11-01 19:00:00')
      },
      {
      id:'4',
      author:{
        avatarUrl: 'https://github.com/diego3g.png',
        name: 'Diego Fernandes',
        role: 'CTO @ Rocketseat'
      },
      content:{ 
        title: 'Como funciona a contabilidade de uma empresa',
        tags: ['NLW', 'Rocket'],
        paragragh: 'Fala galera, \n Mais uma edição do NLW!',
        link: 'jane.design/doctorcare',  
      }            
      ,
      publishedAt: parseISO('2022-11-01 19:00:00')
      }]
  )

  function allPosts(){
    
    return (posts.map(post =>{
      return(              
        <Post
          key={post.id}
          id = {post.id}
          author={post.author}
          content={post.content}
          publishedAt={post.publishedAt}
          admin={user.admin}
        />
      )
    }))
  }

  useEffect(() =>{

  },[navigationApp])
  return (
    <div>

      <Header
        name={user.company.name}
        signOut={signOut}
      />

      <div className={ styles.wrapper } >
        <SideBar
            user={user}
            company={user.company.name}
            navigationChange={setNavigationApp}
            admin={user.admin}
        />
        <div>
          {navigationApp === 'dashboard' ?
            <Dashboard/>
            :
            navigationApp === 'feed' ?            
              allPosts()
            :
            navigationApp === 'article' ?
            <h3>Artigos</h3>
            :
            navigationApp === 'calculator' ?
            <h3>Calculadora</h3>
            :
            navigationApp === 'files' ?
            <h3>Gerenciar docs</h3>
            :
            navigationApp === 'links' ?
            <HandleLinks/>
            :
            navigationApp === 'admin' ?
            <ManageClient/>
            :
            <h3>Desculpe Houston, tivemos um problema...</h3>
          }

          
          <div>FIM</div>
        </div>
      </div>
    </div>

  )
}
