import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Article.module.css'

import { format, formatDistanceToNow, parseISO, getDate, toDate, parse } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR'
import { ChangeEvent, InvalidEvent, useState} from 'react';
import { UserDTO } from '../dtos/UserDTO';



interface DevelopmentProps{
    subtitle: string;
    content: string;
}

export interface ArticleProps{
    id: string;
    author: UserDTO;
    publishedAt: Date;
    content: {
        title?: string;
        tags?: string[];
        abstract: string;
        introduction: string;
        development: DevelopmentProps[]
        conclusion: string;
        references?: string;
        link?: string;
        link2?: string;
        image?: string;
    }
    commentOFF?: boolean
}
interface CommentProps{
    author: string
    comment: string;
    publishedAt: Date;
}


export function Article({id, author, publishedAt, content, commentOFF=false}:ArticleProps){

    const [comments,setComments] = useState<CommentProps[]>([])

    const [newCommentText,setNewCommentText] = useState('');

    

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
    }
    
    const publishedAtDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'",{
        locale: ptBR
    })

    const publishedDateRelativeToNow= formatDistanceToNow(publishedAt,{
        locale: ptBR,
        addSuffix: true,
    })

    function handleCreateNewComment() {
        //event.preventDefault()
        const newComment:CommentProps = {
            author:"Usuário não conectado",
            comment:newCommentText,
            publishedAt: new Date()
        }
        console.log(newCommentText)
        newCommentText.replaceAll('\n',"{'\n'}")
        setComments([...comments,newComment])
        setNewCommentText('')
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Campo obrigatório!')
    }

    function deleteComment(commentToDelete:string){
        console.log(`Deletar comentario ${commentToDelete} .`)

        const commentWithoutDeleteOne = comments.filter(comment =>{
            return comment.comment !== commentToDelete
        })
        setComments(commentWithoutDeleteOne)
    }

    const isNewCommentEmpty = newCommentText.length === 0;
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
                <time title={publishedAtDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>
            
            <div className={styles.content}>
                { content.title ? <h1>{content.title}</h1> : null}
                { content.tags ? content.tags.map( tag => (<a href={`/artigos/${tag}?`} target="_blank">{tag} | </a>)) : null }
                     
                { content.abstract ? 
                    <div>
                        <h2>Resumo</h2>
                        <p>{content.abstract}</p> 
                    </div>
                : null}
                { content.introduction ? 
                    <div>
                        <h2>Introdução</h2>
                        <p>{content.introduction}</p> 
                    </div>
                : null}
                { content.development ? 
                    content.development.map( aux => {
                        return(
                            <div key={aux.content}>
                                <h3>{aux.subtitle}</h3>
                                <p>{aux.content}</p>
                            </div>
                        )
                    }):
                    null
                }
                { content.conclusion ? 
                    <div>
                        <h2>Conclusão</h2>
                        <p>{content.conclusion}</p> 
                    </div>
                : null}
                { content.references ? 
                    <div>
                        <h2>Referências</h2>
                        <p>{content.references}</p> 
                    </div>
                : null}
                { content.link ? <p key={content.link}><a href={content.link}>{content.link}</a></p> : null}
                { content.link2 ? <p key={content.link2}><a href={content.link}>{content.link}</a></p> : null}
                  
            </div>
            {commentOFF ?
            
            <h6>Id: {id}</h6>
            :
            <div>
                <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                    <strong>Deixe seu feedback e dúvidas</strong>
                    <textarea
                        name="comment"
                        placeholder='Escreva um comentário...'
                        aria-multiline
                        onChange={handleNewCommentChange}
                        value={newCommentText}
                        required={true}
                        onInvalid={handleNewCommentInvalid}
                    />
                    {/* <footer> */}
                        <button type='submit'  onClick={handleCreateNewComment} disabled={isNewCommentEmpty}>Publicar</button>
                    {/* </footer> */}
                </form>
                <div className={styles.commentFormList}>
                    {comments.map(comment => {
                        return (
                            <Comment
                                key={comment.comment}
                                content={comment.comment}
                                onDeleteComment={deleteComment}
                                publishedAt={comment.publishedAt}
                                author={author}
                            />
                        )
                    })}
                </div>
            </div>
            }

        </article>

    )
}