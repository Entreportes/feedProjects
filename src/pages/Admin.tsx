import { Header } from '../components/Header.jsx'
import { SideBar } from '../components/SideBar.jsx'
import '../global.css'
import styles from './Home.module.css'
import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { ManageClient } from '../components/admin/ManageClients'
import { Dashboard } from '../components/Dashboard.js'
import { Post, PostProps } from '../components/Post.js'
import { HandleLinks } from '../components/HandleLinks.js'
import { ArticleCard } from '../components/ArticleCard.js'
import { ArticleProps } from '../components/Article.js'
import { api } from '../services/api.js'
import LoadingOverlay from 'react-loading-overlay';
import Loading from '../components/Loading.js'


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
  const [posts,setPosts] = useState<PostProps[]>([])
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
    if(navigationApp === 'feed' && posts.length < 1 ){
      console.log('entrou aqui')
      allPosts()
    }
    if(navigationApp === 'article' && articles.length < 1){
      allArticles()
    }
  },[navigationApp])
  return (
   
    <div>

      <Header
        name={user.company ? user.company.fantasyName: 'Empresa Teste'}
        signOut={signOut}
      />

      <div className={ styles.wrapper } >
        <SideBar
            user={user}
            company={user.company ? user.company.fantasyName: 'Empresa Teste'}
            navigationChange={setNavigationApp}
            admin={user.admin}
        />
        <div>
          <Loading
            isLoading={isLoading}
            text='Carregando...'
          >
          {navigationApp === 'dashboard' ?
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
                      admin={true}
                    />
                  )
                })
              :
              <h2>Ainda não posts para serem mostrados</h2>
              
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
            <ManageClient
              setIsLoading={setIsLoading}
            />
            :
            <h3>Desculpe Houston, tivemos um problema...</h3>
          }
          </Loading>
        </div>
      </div>
    </div>

  )
}
