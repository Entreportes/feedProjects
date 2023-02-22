import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Article.module.css'

import { format, formatDistanceToNow, parseISO, getDate, toDate, parse } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR'
import { ChangeEvent, InvalidEvent, useState} from 'react';
import { UserDTO } from '../dtos/UserDTO';
import { api } from '../services/api';



interface DevelopmentProps{
    subtitle: string;
    content: string;
}



export interface ArticleProps{
    id: string;
    author : UserDTO;
    title: string,
    tags: string,
    abstract: string,
    content: {
        inputFields: DevelopmentProps[]
    },
    references: string,
    link1?: string,
    link2?: string, 
    createdAt?: Date,
    updatedAt?: Date,
}

// export interface ArticleProps2{
//     id: string;
//     author: UserDTO;
//     publishedAt: Date;
//     content: {
//         title: string;
//         tags?: string[];
//         abstract: string;
//         development?: DevelopmentProps[]
//         references?: string;
//         link1?: string;
//         link2?: string;
//         image?: string;
//     }
// }

type ArticleComponentProps = ArticleProps & {
    commentOFF?: boolean
}



export async function getArticle(){
    
    const [articles,setArticles] = useState<ArticleProps[]>([])
    const [loading,setLoading] = useState(false)

    try {
        setLoading(true)
        const response = await api.get('/articles',
            
        )
        setArticles(response.data)

    } catch (error) {
        console.log('não foi possível carregar os artigos')
        throw error
    }finally{
        setLoading(false)
    }
    return articles
}


export function Article({id, author, title, abstract, references, tags, link1, link2, createdAt = new Date, content, commentOFF=false}:ArticleComponentProps){


    const [newCommentText,setNewCommentText] = useState('');

    

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
    }
    
    const publishedAtDateFormatted = format(createdAt, "d 'de' LLLL 'às' HH:mm'h'",{
        locale: ptBR
    })

    const publishedDateRelativeToNow= formatDistanceToNow(createdAt,{
        locale: ptBR,
        addSuffix: true,
    })

    return(
        <article className={styles.Article}>
            <header>
                <div className={styles.author}>
                    <Avatar
                        src={author.avatar}
                    />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time title={publishedAtDateFormatted} dateTime={createdAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>
            
            <div className={styles.content}>
                { title ? <h1>{title}</h1> : null}
                { tags ? tags.split(' ').map( tag => (<a key={tag} href={`/artigos/${tag}?`} target="_blank">{tag} | </a>)) : null }
                     
                { abstract ? 
                    <div>
                        <h2>Resumo</h2>
                        <p>{abstract}</p> 
                    </div>
                : null}
                { content.inputFields ? 
                    content.inputFields.map( aux => {
                        return(
                            <div key={aux.content}>
                                <h3>{aux.subtitle}</h3>
                                <p>{aux.content}</p>
                            </div>
                        )
                    }):
                    null
                }
                { references ? 
                    <div>
                        <h2>Referências</h2>
                        <p>{references}</p> 
                    </div>
                : null}
                { link1 ? <p key={link1}><a href={link1}>{link1}</a></p> : null}
                { link2 ? <p key={link2}><a href={link2}>{link2}</a></p> : null}
                  
            </div>

        </article>

    )
}