import { ThumbsUp, Trash, User } from 'phosphor-react'
import { useState } from 'react'
import { Avatar } from './Avatar'
import styles from './Comment.module.css'

import { format, formatDistanceToNow } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR'
import { UserDTO } from '../dtos/UserDTO';

interface CommentProps{
    content: string;
    onDeleteComment: (comment: string) => void;
    publishedAt: Date;
    author: UserDTO;
}


export function Comment({content, onDeleteComment, publishedAt, author}:CommentProps){

    const [likeCount, setLikeCount] = useState(0);

    function handleLikeComment(){ //colocando nesse formato por conta da atualizacao do estado e utilizando em seguida 
        setLikeCount((likeCount) => {
            return likeCount + 1
        })
    }
    const publishedAtDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'",{
        locale: ptBR
    })

    function handleDeleteComment(){
        onDeleteComment(content)
    }
    const publishedDateRelativeToNow= formatDistanceToNow(publishedAt,{
        locale: ptBR,
        addSuffix: true,
    })
    return(
        <div className={styles.comment}>
            <Avatar
                src= {author.avatar}
                hasBorder={false}
            />
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>{author.name}</strong>
                            <time title={publishedAtDateFormatted} dateTime={publishedAt.toISOString()}>
                                {publishedDateRelativeToNow}
                            </time>
                        </div>
                        <button onClick={handleDeleteComment} title="Deletar comentário">
                            <Trash size={20}/>
                        </button>

                    </header>
                    <p>{content}</p>
                </div>
                <footer>
                    {/* <button onClick={setLikeCount(likeCount + 1)}>  NÃO FUNCIONARIA PQ ESTA EXECUTANDO UMA FUNCAO (LOOP INFINITO)  
                        <button onClick={() => setLikeCount(likeCount + 1)}> se colocar o arrow function, funciona normalmente, pq
                        ai eh uma função (e não execução de uma função), não está sendo usado por questão de clean code
                        TODOS OS EVENTOS ONSUBIT, ONCLICK, ONBLUR , ONINVALID PRECISA RECEBER UMA FUNCAO E NAO A EXECUCAO DE UMA FUNCAO
                    
                    */}
                    <button onClick={handleLikeComment}> 
                        <ThumbsUp/>
                        Aplaudir<span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}