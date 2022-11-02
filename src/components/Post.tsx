import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'

import { format, formatDistance, formatDistanceToNow } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface Author{
    name: string;
    role: string;
    avatarUrl: string;
}

interface PostProps {
    author: Author;
    publishedAt: Date;
    content: {
        type: 'paragraph'|'link';
        content: string;
    }[]
}


export function Post({author, publishedAt, content}:PostProps){

    const [comments,setComments] = useState([
        'Post muito bacana!'
    ])

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

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault()
        setComments([...comments,newCommentText])
        setNewCommentText('')
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Campo obrigatório!')
    }

    function deleteComment(commentToDelete:string){
        console.log(`Deletar comentario ${commentToDelete} .`)

        const commentWithoutDeleteOne = comments.filter(comment =>{
            return comment !== commentToDelete
        })
        setComments(commentWithoutDeleteOne)
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
                </time>
            </header>
            
            <div className={styles.content}>
               {content.map(line => {
                if(line.type === 'paragraph'){
                    return <p key={line.content}>{line.content}</p>
                }else if (line.type === 'link'){
                    return <p key={line.content}><a href={line.content}>{line.content}</a></p>
                }
               })}
            </div>
            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea
                    name="comment"
                    placeholder='Escreva um comentário...'
                    onChange={handleNewCommentChange}
                    value={newCommentText}
                    required={true}
                    onInvalid={handleNewCommentInvalid}
                />
                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>
            <div className={styles.commentFormList}>
                {comments.map(comment => {
                    return (
                        <Comment
                            key={comment}
                            content={comment}
                            onDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>

        </article>

    )
}