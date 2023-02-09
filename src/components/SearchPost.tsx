
import { parseISO } from 'date-fns'
import { useState } from 'react';
import styles from './SearchPost.module.css'
import { Post, PostProps } from "./Post";
import {MagnifyingGlass, User } from 'phosphor-react'
import { useAuth } from '../hooks/useAuth';
import { UserDTO } from '../dtos/UserDTO';

// interface DeleteProps{
//   idToSearch?:string;
//   titleToSearch?:string;
//   tagToSearch?:string;
// }
export function SearchPost(){
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
        paragragh: 'Empreendedores nem sempre dão a devida atenção à contabilidade de seus negócios. \nUm cuidado maior com as finanças da empresa permite um entendimento mais claro sobre o balanço financeiro e a demonstração de resultados, dois pontos fundamentais. Pensando nisso, preparei uma miniaula sobre contabilidade. Assista!',
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
          title: 'Titulo2',
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
          title: 'Empresa',
          tags: ['contabilidade', 'empresa'],
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
    const [post,setPost] =useState<PostProps[]>([]);

    const [title,setTitle] = useState('');
    const [tag,setTag] = useState('');
    const [id,setId] = useState('');
    const [cardOption,setCardOption] = useState(false);

    const {user} = useAuth()

  function SearchPostByTitle(){
    setPost([])
    setCardOption(false)
    console.log('procurar por titulo')
    const found = posts.filter((post)=>post.content.title === title)
    { found != undefined ? setPost(found) : console.log('nao achou') }
    console.log(post)        

  }
  function SearchPostByTags(){
    setPost([])
    setCardOption(false)
    console.log('procurar por Tags')
    // const found = posts.filter((post)=>post.content.tags ? post.content.tags[0] === tag : undefined)
    const found = posts.filter((post) => post.content.tags?.find((tag_aux) => tag_aux === tag ))
    console.log(found)
    { found != undefined ? setPost(found) : console.log('nao achou') }
    console.log(post)        

  }
  function SearchPostById(id: string){
    setPost([])
    setCardOption(false)
    console.log('procurar por id')
    const found = posts.find((post)=>post.id === id)
    { found != undefined ? setPost([found]) : console.log('nao achou') }
    console.log(post)        

  }
  function SearchAll(){
    setPost(posts)
    setCardOption(true)
  }

    return(
        <div className={styles.container}>
          <div className={styles.buttonAll}>
            <h3>Procurar Post</h3>
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
                onClick={SearchPostByTitle}
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
              onClick={SearchPostByTags}
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
                onClick={() => SearchPostById(id)} 
                disabled={id.length > 0 ? false: true}                
            >
                <MagnifyingGlass size={20}/>
            </button>
          </form>
          
          {post ? 
              post.map(post => {
                return (
                  <Post
                    id={post.id}
                    author={post.author}
                    content={post.content}
                    publishedAt={post.publishedAt}
                    commentOFF
                    admin={user.admin}
                    card={cardOption}
                  />
                )
              })
          :
              <div></div>
          }
        </div>
    )
}