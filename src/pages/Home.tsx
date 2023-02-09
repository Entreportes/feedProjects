import { Header } from '../components/Header'
import {Post, PostProps} from '../components/Post'
import { SideBar } from '../components/SideBar'
import '../global.css'
import styles from './Home.module.css'
import { parseISO } from 'date-fns'
import { Files } from '../components/Files'
import { useEffect, useState } from 'react'
import { Links } from '../components/Links'

import {useParams} from 'react-router-dom'
import { Article, ArticleProps } from '../components/Article'
import { HandleArticle } from '../components/HandleArticle'
import { useAuth } from '../hooks/useAuth'
import { UserDTO } from '../dtos/UserDTO'
import { Dashboard } from '../components/Dashboard'
import { ManageClient } from '../components/admin/ManageClients'


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



export function Home() {  

  const [navigationApp, setNavigationApp] =useState('dashboard')
  const [articles,setArticles] = useState<ArticleProps[]>([])
  

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
  const {user,signOut} = useAuth()
  console.log('Home ->',user)

  async function loadDashBoard(){
    //carregar DashBoard
  }
    
  
  useEffect(() =>{
    loadDashBoard()

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
        <main>
          {
            navigationApp === 'dashboard' ?
            <Dashboard/>
            :
            navigationApp === 'feed' ?
            posts.map(post =>{
              return(              
                <Post
                  key={post.id}
                  id = {post.id}
                  author={post.author}
                  content={post.content}
                  publishedAt={post.publishedAt}
                />
              )
            })
            :
            navigationApp === 'calculator' ?
              <p>calculator</p>
              :
              navigationApp === 'files' ?
                <>
                  <Files
                    directory='\server\caminho1'
                    title={navigationApp} 
                  />
                  <Files
                      directory='\server\caminho2'
                      title='Relatórios' 
                  />
                </>
                :
                navigationApp === 'links' ? 
                  <Links/>
                  :
                  navigationApp === 'article' ? 
                    <HandleArticle/>
                    // articles.map(article =>{
                    //   return(              
                    //     <Article
                    //       key={article.id}
                    //       id = {article.id}
                    //       author={article.author}
                    //       content={article.content}
                    //       publishedAt={article.publishedAt}
                    //     />
                    //   )
                    // })
                    :
                    navigationApp === 'manageClient' ? 
                      <ManageClient/>
                      // articles.map(article =>{
                      //   return(              
                      //     <Article
                      //       key={article.id}
                      //       id = {article.id}
                      //       author={article.author}
                      //       content={article.content}
                      //       publishedAt={article.publishedAt}
                      //     />
                      //   )
                      // })
                      :
                    <p>Desculpe, Houston, tivemos um problema, entre em contato com o administrador.</p>
              }
            
          
          
          
        </main>
      </div>
    </div>

  )
}
