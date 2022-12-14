import { Header } from './components/Header.jsx'
import {Post} from './components/Post.jsx'
import { SideBar } from './components/SideBar.jsx'
import './global.css'
import styles from './App.module.css'
import { parseISO } from 'date-fns'


interface Author{
  name: string;
  role: string;
  avatarUrl: string;
}
interface PostProps{
  id: number;
  author: Author;
  publishedAt: Date;
  content: {
    type: 'paragraph'|'link';
    content: string;
  }[];
}
const posts:PostProps[] = [
  {
    id:1,
    author:{
      avatarUrl: 'https://github.com/entreportes.png',
      name: 'Lucas Entreports',
      role: 'Engineer'
    },
    content: [
      {type:'paragraph', content: 'Boa noite, galera!'},
      {type:'paragraph', content: 'Segue mais um projeto no portifólio. É um site para dar palpites para a copa 22, se cadastrem e chamem os amigos! Segue o link'},
      {type:'link', content: 'https://natrave-copa22.vercel.app/'},

    ],
    publishedAt: parseISO('2022-11-01 19:00:00')
  },
  {
    id:2,
    author:{
      avatarUrl: 'https://github.com/renatomh.png',
      name: 'Renato Henz',
      role: 'CEO MHSW'
    },
    content: [
      {type:'paragraph', content: 'Hey, guys!'},
      {type:'paragraph', content: 'This project was developed during the RocketSeat Next Level Week - eSports event. It aims to provide an interface for finding other players to play online games with.'},
      {type:'link', content: 'https://github.com/renatomh/nlw-esports-web'},

    ],
    publishedAt: parseISO('2022-11-03 11:00:00')
  },
  {
    id:3,
    author:{
      avatarUrl: 'https://github.com/diego3g.png',
      name: 'Diego Fernandes',
      role: 'CTO @ Rocketseat'
    },
    content: [
      {type:'paragraph', content: 'Fala, galera!'},
      {type:'paragraph', content: 'Acabei de subir mais um projeto. É um projeto que fiz no NLW Return.'},
      {type:'link', content: 'jane.design/doctorcare'},

    ],
    publishedAt: parseISO('2022-05-03 20:00:00')
  }
] 




function App() {  

  return (
    <div>

      <Header/>

      <div className={styles.wrapper}>
        <SideBar/>
        <main>
          {posts.map(post =>{
            return(              
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>
      </div>
    </div>

  )
  }
export default App
