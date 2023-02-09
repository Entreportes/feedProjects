import { ArticleProps } from "./Article";
import styles from './ArticleCard.module.css'
import { Avatar } from "./Avatar";



export function ArticleCard({id, author,content,publishedAt }:ArticleProps){

    return(
        <div className={styles.container}>
            <div className={styles.card}>
                <Avatar
                    src={author.avatar}
                    style={{margin:'8px'}}
                />
                <div>
                    <div className={styles.tags}> 
                        {content.tags?.map( tag => (<a href={`/ensino/${tag}?`} target="_blank">#{tag} </a>))}
                    </div>
                    <h3>{content.title}</h3>
                </div>
            </div>
            <p>{content.abstract}</p>
        </div>
    )
}