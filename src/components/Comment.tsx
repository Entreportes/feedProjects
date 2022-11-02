import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react'
import { Avatar } from './Avatar'
import styles from './Comment.module.css'

interface CommentProps{
    content: string;
    onDeleteComment: (comment: string) => void;
}


export function Comment({content, onDeleteComment}:CommentProps){

    const [likeCount, setLikeCount] = useState(0);

    function handleLikeComment(){ //colocando nesse formato por conta da atualizacao do estado e utilizando em seguida 
        setLikeCount((likeCount) => {
            return likeCount + 1
        })
    }


    function handleDeleteComment(){
        onDeleteComment(content)
    }

    return(
        <div className={styles.comment}>
            <Avatar
                src='http://github.com/entreportes.png'
                hasBorder={false}
            />
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Lucas</strong>
                            <time title="1 de novembro" dateTime='2022-01-11 12:30:00'>Cerca de 1h atrás</time>
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