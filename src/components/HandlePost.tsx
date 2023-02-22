
import { useEffect, useState } from "react";
import { Post, PostProps } from "./Post";

import cuid from 'cuid';

import styles from './HandlePost.module.css'
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { AIcreater } from "./AIcreater";


interface Author{
    name: string;
    role: string;
    avatarUrl: string;
}
interface Props{
    setIsLoading: (status:boolean) => void
}

export function HandlePost({setIsLoading}:Props){

    const {user} = useAuth()
    const [selectIA,setSelectIA] = useState(false)
    
    const [post,setPost] =useState<PostProps>();

    const [title,setTitle] = useState('');
    const [tags,setTags] = useState('');
    const [description,setDescription] = useState('');
    const [link1,setLink1] = useState('');
    const [link2,setLink2] = useState('');
    const [video,setVideo] = useState('');

    const author:Author = {
        name: user.name,
        role: user.role? user.role : 'usuário',
        avatarUrl: user.avatar? user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX5693WrTfiATMpxukDK1bqvl42n8JZDG1tA&usqp=CAU'

    }

    async function handleSubmit(){
        
    
        try {

            const res = await api.post('/post',post,)
            console.log('POST ENVIADO',res)
            
            
        } catch (error) {
            console.log('Erro ao enviar o post')
            throw error
        }
    }

    function handleView(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        console.log(title)
        console.log(tags)
        console.log(description)
        console.log(link1)
        console.log(video)
        var aux = ''
        video ? aux = video.split('=')[1] : aux = ''

        console.log(aux)
        const post:PostProps = {
            id : cuid(),
            author : author,
            createdAt : new Date,
            title: title,
            tags: tags,
            description: description,
            link1: link1,
            link2: link2,                
            video: aux,
            
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
    function loadingAI(){
        if (post?.description){
            setTitle(post.title)
            setTags(post.tags)
            setDescription(post.description)
                        
        }
    }
    useEffect(()=>{
        loadingAI()
    },[post])

    return (
        <div className={styles.container}>
            <div className={styles.double}>
                <h2>Criar Post</h2>
                <button style={{maxWidth: '20rem'}} type="reset" onClick={()=>setSelectIA(!selectIA)}>
                    Sem idéia? Utilize nossa Inteligência Artificial e se supreenda
                </button>
            </div>
            {selectIA ? 
                <AIcreater
                    setText={setPost}
                />
                :
                null
            }
            
            <form onSubmit={handleView}>
                <h3> Título </h3>
                <input
                    type='text'
                    placeholder='Título'
                    required
                    onChange={(event) => setTitle(event.target.value)}
                    value={title}                
                />
                
                <h3> Tags </h3>
                <input
                    type='text'
                    placeholder='escreva as tags'  
                    required
                    onChange={(event) => setTags(event.target.value)}
                    value={tags}                
                />

                <h3> Descrição </h3>
                <textarea
                    name="description"
                    placeholder='Descrição do vídeo'
                    aria-multiline
                    required={true}
                    onChange={(event) => setDescription(event.target.value)}
                    value={description}  
                />

                <h3> Link </h3>
                <input
                    type='url'
                    placeholder='link'
                    onChange={(event) => setLink1(event.target.value)}
                    value={link1}                  
                />

                <h3> Link 2 </h3>
                <input
                    type='url'
                    placeholder='link'
                    onChange={(event) => setLink2(event.target.value)}
                    value={link2}                  
                />

                <h3> Link vídeo </h3>
                <input
                    type='url'
                    placeholder='Link vídeo'
                    onChange={(event) => setVideo(event.target.value)}
                    value={video}  
                />
                <button
                    type='submit'               
                >
                    Visualizar Post
                </button>
                


            </form>    

            {post ? 
                <div>
                    <Post
                        id={post.id}
                        author={post.author}
                        description={post.description}
                        createdAt={post.createdAt}
                        commentOFF={true}
                        tags={post.tags}
                        title={post.title}
                        video={post.video}
                        comments={post.comments}
                        link1={post.link1}
                        link2={post.link2}
                        updatedAt={post.updatedAt}
                        admin={false}
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