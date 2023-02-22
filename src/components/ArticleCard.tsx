import { ArticleProps } from "./Article";
import styles from './ArticleCard.module.css'
import { Avatar } from "./Avatar";



export function ArticleCard({id, author, title, abstract, tags ,createdAt }:ArticleProps){

    return(
        <div className={styles.container}>
            <div className={styles.card}>
                <Avatar
                    src={author.avatar}
                    style={{margin:'8px'}}
                />
                <h3>{author.name}</h3>
                <div>
                    <div className={styles.tags}> 
                        {tags.split(' ')?.map( tag => (<a href={`/ensino/${tag}?`} target="_blank">#{tag} </a>))}
                    </div>
                    <h3>{title}</h3>
                </div>
            </div>
            <p>{abstract}</p>
        </div>
    )
}