import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'
import YouTube from 'react-youtube';

import { format, formatDistanceToNow, parseISO, getDate, toDate, parse, formatISO } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR'
import { ChangeEvent, FormEvent, InvalidEvent, useState} from 'react';
import { useAuth } from '../hooks/useAuth';
import { Trash } from 'phosphor-react';
import { api } from '../services/api';
import cuid from 'cuid';



interface Author{
    name: string;
    role: string;
    avatarUrl: string;
}

interface CommentProps{
    id: string;
    author: Author;
    comment: string;
    publishedAt: Date;
}
export interface PostProps{
    id: string;
    author: Author;
    createdAt?: Date;
    updatedAt?: Date;
    title: string;
    tags: string;
    description?: string;
    link1?: string;
    link2?: string;
    image?: string;
    video?: string;
    comments?: CommentProps[]
}


type PostComponentProps = PostProps & {
    commentOFF?: boolean;
    admin?: boolean;
    card?: boolean;

}
export async function getPost(){
    
    const [posts,setPosts] = useState<PostProps[]>([])
    const [loading,setLoading] = useState(false)

    try {
        setLoading(true)
        const response = await api.get('/posts',
            
        )
        setPosts(response.data)

    } catch (error) {
        console.log('não foi possível carregar os posts')
        throw error
    }finally{
        setLoading(false)
    }
    return posts
}

export function Post({id, author, tags, createdAt = new Date, title, description, commentOFF=false, admin=false, card=false, link1, link2, video}: PostComponentProps){

    const [comments,setComments] = useState<CommentProps[]>([])

    const [newCommentText,setNewCommentText] = useState('');
    const {user} = useAuth()
    const createdAtAux = new Date(createdAt)

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
    
    const publishedAtDateFormatted = format(createdAtAux, "d 'de' LLLL 'às' HH:mm'h'",{
        locale: ptBR
    })

    const publishedDateRelativeToNow= formatDistanceToNow(createdAtAux,{
        locale: ptBR,
        addSuffix: true,
    })

    function handleCreateNewComment() {
        console.log('entrou aqui')
        //event.preventDefault()
        const newComment = {
            id: cuid(),
            author: author,
            comment:newCommentText,
            publishedAt: new Date(),

        } as CommentProps
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
        console.log('deletar Post', title)
        console.log('deletar Post id:', id)
    }

    const isNewCommentEmpty = newCommentText.length === 0;
    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar
                        src={author.avatarUrl? author.avatarUrl : 'oajfo'}
                    />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time title={publishedAtDateFormatted} dateTime={createdAtAux.toISOString()}>
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
                { title ? <h3>{title}</h3> : null}
                { tags ? tags.split(' ').map( tag => (<a key={tag} href={`/ensino/#${tag}?`} target="_blank">#{tag} </a>)) : null }
                     
                { description ? <p>{description}</p> : null}
                { link1 ? <p key={link1}><a href={link1}>{link1}</a></p> : null}
                { link2 ? <p key={link2}><a href={link2}>{link2}</a></p> : null}
                { video ? 
                    
                    <YouTube
                        videoId = {video}
                        opts= {opts} 
                    />
                : null }
            </div>
            :
            <div className={styles.content}>                
                { title ? <h3>{title}</h3> : null}
                { tags ? tags.split(' ').map( tag => (<a href={`/ensino/#${tag}?`} target="_blank">#{tag} </a>)) : null }
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