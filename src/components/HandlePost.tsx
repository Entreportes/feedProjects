
import { useState } from "react";
import { Post, PostProps } from "./Post";

import cuid from 'cuid';

import styles from './HandlePost.module.css'


interface Author{
    name: string;
    role: string;
    avatarUrl: string;
}


export function HandlePost(){

    const [post,setPost] =useState<PostProps>();

    const [title,setTitle] = useState('');
    const [tags,setTags] = useState('');
    const [description,setDescription] = useState('');
    const [link,setLink] = useState('');
    const [link2,setLink2] = useState('');
    const [video,setVideo] = useState('');

    const user:Author = {
        name: 'Renato Pantoja',
        role: 'Contador Chefe',
        avatarUrl: 'https://media.licdn.com/dms/image/C4E03AQGILoJReGu_qw/profile-displayphoto-shrink_800_800/0/1634658040297?e=1680134400&v=beta&t=bL5n-0s8Bht0hcY1aGHzeaMujMkcA69U9bR1Owu3Oxg'

    }

    function handleSubmit(){
        console.log(post)
        console.log('POST ENVIADO')
    }
    function handleView(){
        console.log(title)
        console.log(tags)
        console.log(description)
        console.log(link)
        console.log(video)
        var aux = ''
        video ? aux = video.split('=')[1] : aux = ''

        console.log(aux)
        const post:PostProps = {
            id : cuid(),
            author : user,
            publishedAt : new Date,
            content: {
                title: title,
                tags: tags.split(' '),
                paragragh: description,
                link: link,
                link2: link2,                
                video: aux,
            }
            // content: [
            //     {type:'title', content: title},
            //     {type:'tags', content: tags},
            //     {type:'paragraph', content: description},
            //     {type:'link', content: link},
            //     {type:'link', content: link2},
            //     aux ? {type:'video', content: aux}  : {type:'link', content: ''}        
            // ]
        }
        setPost(post)
        
    }


    return (
        <div className={styles.container}>
            <h3>Criar Post</h3>
            <form>
                <label> Título </label>
                <input
                    type='text'
                    placeholder='Título'
                    required
                    onChange={(event) => setTitle(event.target.value)}
                    value={title}                
                />
                
                <label> Tags </label>
                <input
                    type='text'
                    placeholder='Tags'  
                    onChange={(event) => setTags(event.target.value)}
                    value={tags}                
                />

                <label> Descrição </label>
                <textarea
                    name="description"
                    placeholder='Descrição do vídeo'
                    aria-multiline
                    required={true}
                    onChange={(event) => setDescription(event.target.value)}
                    value={description}  
                />

                <label> Link </label>
                <input
                    type='url'
                    placeholder='link'
                    onChange={(event) => setLink(event.target.value)}
                    value={link}                  
                />

                <label> Link 2 </label>
                <input
                    type='url'
                    placeholder='link'
                    onChange={(event) => setLink2(event.target.value)}
                    value={link2}                  
                />

                <label> Link vídeo </label>
                <input
                    type='url'
                    placeholder='Link vídeo'
                    onChange={(event) => setVideo(event.target.value)}
                    value={video}  
                />
                <button
                    type='button'
                    onClick={handleView}                
                >
                    Visualizar Post
                </button>
                


            </form>    

            {post ? 
                <div>
                    <Post
                        id={post.id}
                        author={post.author}
                        content={post.content}
                        publishedAt={post.publishedAt}
                        commentOFF={true}
                    />
                    <button
                        type='submit'
                        onClick={handleSubmit}                
                    >
                        Enviar Post
                    </button>
                </div>

            :
            <div></div>
            }
        </div>
    )
}