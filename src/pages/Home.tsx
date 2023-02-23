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
import { ArticleCard } from '../components/ArticleCard'
import { api } from '../services/api'
import Loading from '../components/Loading'


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

  
  const {user,signOut} = useAuth()
  const [posts,setPosts] = useState<PostProps[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
 

  async function allPosts(){
    try {
      setIsLoading(true)
      const res = await api.get('/post')
      setPosts(res.data)
      
    } catch (error) {
      
      throw error
      
    }finally{
      setIsLoading(false)

    }
    
  }
  const [articles,setArticles] = useState<ArticleProps[]>([])
  async function allArticles(){
    try {
      setIsLoading(true)
      const res = await api.get('/article')
      setArticles(res.data)
      
    } catch (error) {
      
      throw error
      
    }finally{
      
      setIsLoading(false)
    }
    
  }

  
  useEffect(() =>{
    if(navigationApp === 'feed'){
      allPosts()
    }
    if(navigationApp === 'article'){
      allArticles()
    }
  },[navigationApp])
  return (
    <div>

      <Header
        name={user.company?.fantasyName ? user.company?.fantasyName: 'Contabilidade'}
        signOut={signOut}
      />

      <div className={ styles.wrapper } >
        <SideBar
            user={user}
            company={user.company?.fantasyName ? user.company?.fantasyName: 'Contabilidade'}
            navigationChange={setNavigationApp}
            admin={user.admin}
        />
        
        <Loading
          isLoading={isLoading}
          text='Carregando...'
        >
          <main>
            {
              navigationApp === 'dashboard' ?
              <Dashboard/>
              :
              navigationApp === 'feed' ?    
              posts ? 
                posts.map(post =>{
                  return(              
                    <Post
                      id={post.id}
                      author={post.author}
                      description={post.description}
                      createdAt={post.createdAt}
                      tags={post.tags}
                      title={post.title}
                      video={post.video}
                      comments={post.comments}
                      link1={post.link1}
                      link2={post.link2}
                      updatedAt={post.updatedAt}
                      admin={false}
                    />
                  )
                })
              :
              <h2>Ainda não posts para serem mostrados</h2>
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
                      articles ? 
                      articles.map(article =>{
                        return(              
                          <ArticleCard
                            key={article.id}
                            id={article.id}
                            author={article.author}
                            content={article.content}
                            createdAt={article.createdAt}
                            abstract={article.abstract}
                            references={article.references}
                            tags={article.tags} 
                            title={article.title}
                            link1={article.link1}
                            link2={article.link2}
                            updatedAt={article.updatedAt}
                          />
                        )
                      })
                      :
                      <h2>Ainda não Artigos para serem mostrados</h2>
                      :
                      navigationApp === 'manageClient' ? 
                        <ManageClient
                          setIsLoading={setIsLoading}
                        />
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
        </Loading>
      </div>
    </div>

  )
}
