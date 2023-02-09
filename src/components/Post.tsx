import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'
import YouTube from 'react-youtube';

import { format, formatDistanceToNow, parseISO, getDate, toDate, parse } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR'
import { ChangeEvent, FormEvent, InvalidEvent, useState} from 'react';
import { useAuth } from '../hooks/useAuth';
import { Trash } from 'phosphor-react';



interface Author{
    name: string;
    role: string;
    avatarUrl: string;
}

// export interface PostProps{
//     id: string;
//     author: Author;
//     publishedAt: Date;
//     content: {
//       type: 'paragraph'|'link'|'video'|'title'|'tags';
//       content: string;
//     }[];
//     commentOFF?: boolean
// }
export interface PostProps{
    id: string;
    author: Author;
    publishedAt: Date;
    content: {
        title?: string;
        tags?: string[];
        paragragh?: string;
        link?: string;
        link2?: string;
        image?: string;
        video?: string;
    }
    commentOFF?: boolean;
    admin?: boolean;
    card?: boolean;
}
interface CommentProps{
    author: string
    comment: string;
    publishedAt: Date;
}


export function Post({id, author, publishedAt, content, commentOFF=false, admin=false, card=false}:PostProps){

    const [comments,setComments] = useState<CommentProps[]>([])

    const [newCommentText,setNewCommentText] = useState('');
    const {user} = useAuth()

    const opts = {
        width: '100%',
        height: '350px',
        playerVars: {
          autoplay: 0,
        },
        
    }
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
        console.log('entrou aqui')
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
    function handleDeletePost(){
        console.log('deletar Post', content.title)
        console.log('deletar Post id:', id)
    }

    const isNewCommentEmpty = newCommentText.length === 0;
    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar
                        src={author.avatarUrl}
                    />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time title={publishedAtDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                    {admin ? 
                    <button onClick={handleDeletePost} className={styles.TrashButton} title="Deletar Post">
                        <Trash 
                            size={20}
                        />
                    </button>
                    :
                    null
            
                }
                </time>
                
            </header>
            {!card ? 
            <div className={styles.content}>
                { content.title ? <h3>{content.title}</h3> : null}
                { content.tags ? content.tags.map( tag => (<a href={`/ensino/#${tag}?`} target="_blank">#{tag} </a>)) : null }
                     
                { content.paragragh ? <p>{content.paragragh}</p> : null}
                { content.link ? <p key={content.link}><a href={content.link}>{content.link}</a></p> : null}
                { content.link2 ? <p key={content.link2}><a href={content.link}>{content.link}</a></p> : null}
                { content.video ? 
                    
                    <YouTube
                        videoId = {content.video}
                        opts= {opts} 
                    />
                : null }
            </div>
            :
            <div className={styles.content}>                
                { content.title ? <h3>{content.title}</h3> : null}
                { content.tags ? content.tags.map( tag => (<a href={`/ensino/#${tag}?`} target="_blank">#{tag} </a>)) : null }
            </div>
            }
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
                                author={user}
                            />
                        )
                    })}
                </div>
            </div>
            }

        </article>

    )
}