
import { parseISO } from 'date-fns'
import { useState } from 'react';
import styles from './SearchArticle.module.css'
import { Post, PostProps } from "./Post";
import {MagnifyingGlass, User } from 'phosphor-react'
import { useAuth } from '../hooks/useAuth';
import { UserDTO } from '../dtos/UserDTO';
import { Article, ArticleProps } from './Article';

// interface DeleteProps{
//   idToSearch?:string;
//   titleToSearch?:string;
//   tagToSearch?:string;
// }
export function SearchArticle(){
    const [articles,setArticles] = useState<ArticleProps[]>([]) 
    const [article,setArticle] =useState<ArticleProps[]>([]);

    const [title,setTitle] = useState('');
    const [tag,setTag] = useState('');
    const [id,setId] = useState('');
    const [cardOption,setCardOption] = useState(false);

    const {user} = useAuth()

  function SearchArticleByTitle(){
    setArticle([])
    setCardOption(false)
    console.log('procurar por titulo')
    const found = articles.filter((article)=>article.content.title === title)
    { found != undefined ? setArticle(found) : console.log('nao achou') }
    console.log(article)        

  }

  

  function SearchArticleByTags(){
    setArticle([])
    setCardOption(false)
    console.log('procurar por Tags')
    // const found = posts.filter((post)=>post.content.tags ? post.content.tags[0] === tag : undefined)
    const found = articles.filter((article) => article.content.tags?.find((tag_aux) => tag_aux === tag ))
    console.log(found)
    { found != undefined ? setArticle(found) : console.log('nao achou') }
    console.log(article)        

  }
  function SearchArticleById(id: string){
    setArticle([])
    setCardOption(false)
    console.log('procurar por id')
    const found = articles.find((article)=>article.id === id)
    { found != undefined ? setArticle([found]) : console.log('nao achou') }
    console.log(article)        

  }
  function SearchAll(){
    setArticle(articles)
    setCardOption(true)
  }

    return(
        <div className={styles.container}>
          <div className={styles.buttonAll}>
            <h3>Procurar Artigo</h3>
            {user.admin ? 
              <button
                type='reset'
                onClick={() => SearchAll()}                
              >
                <MagnifyingGlass size={20}/> Todos
              </button>
            : null
            }
          </div>
          <form><h4> Título: </h4>            
            <input
                type='text'
                placeholder='Título'
                required
                onChange={(event) => setTitle(event.target.value)}
                value={title}
                               
            />
            <button
                type='reset'
                onClick={SearchArticleByTitle}
                disabled={title.length > 0 ? false: true}                 
            >
                <MagnifyingGlass size={20}/>
            </button>
          </form>
          <form><h4> Tag: </h4>
            <input
                type='text'
                placeholder='Tag'  
                onChange={(event) => setTag(event.target.value)}
                value={tag}                
            />
            <button
              type='reset'
              onClick={SearchArticleByTags}
              disabled={tag.length > 0 ? false: true}             
            >
              <MagnifyingGlass size={20}/>
            </button>
          </form>
          <form><h4> Id: </h4>
            <input
              type='text'
              placeholder='Id'  
              onChange={(event) => setId(event.target.value)}
              value={id}                
            />
            <button
                type='reset'
                onClick={() => SearchArticleById(id)} 
                disabled={id.length > 0 ? false: true}                
            >
                <MagnifyingGlass size={20}/>
            </button>
          </form>
          
          {article ? 
              article.map(article => {
                return (
                  <Article
                    id={article.id}
                    author={article.author}
                    content={article.content}
                    publishedAt={article.publishedAt}
                    commentOFF
                    // admin={user.admin}
                    // card={cardOption}
                  />
                )
              })
          :
              <div></div>
          }
        </div>
    )
}