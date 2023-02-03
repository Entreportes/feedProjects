
import { parseISO } from 'date-fns'
import { useState } from 'react';
import styles from './DeletePost.module.css'
import { Post, PostProps } from "./Post";


export function DeletePost(){
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


  function SearchPostByTitle(){
    setPost([])
    console.log('procurar por titulo')
    const found = posts.filter((post)=>post.content.title === title)
    { found != undefined ? setPost(found) : console.log('nao achou') }
    console.log(post)        

  }
  function SearchPostByTags(){
    setPost([])
    console.log('procurar por Tags')
    // const found = posts.filter((post)=>post.content.tags ? post.content.tags[0] === tag : undefined)
    const found = posts.filter((post) => post.content.tags?.find((tag_aux) => tag_aux === tag ))
    console.log(found)
    { found != undefined ? setPost(found) : console.log('nao achou') }
    console.log(post)        

  }
  function SearchPostById(){
    setPost([])
    console.log('procurar por id')
    const found = posts.find((post)=>post.id === id)
    { found != undefined ? setPost([found]) : console.log('nao achou') }
    console.log(post)        

  }

    return(
        <div className={styles.container}>
          <h3>Deletar Post</h3>
          <form><label> Título </label>            
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
            >
                Buscar por título
            </button>
          </form>
          <form><label> Tags </label>
            <input
                type='text'
                placeholder='Tags'  
                onChange={(event) => setTag(event.target.value)}
                value={tag}                
            />
            <button
              type='reset'
              onClick={SearchPostByTags}                
            >
              Bucar por tag
            </button>
          </form>
          <form><label> Id </label>
            <input
              type='text'
              placeholder='Id'  
              onChange={(event) => setId(event.target.value)}
              value={id}                
            />
            <button
                type='reset'
                onClick={SearchPostById}                
            >
                Buscar por Id
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
                  />
                )
              })
          :
              <div></div>
          }
        </div>
    )
}