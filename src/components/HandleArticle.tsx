
import { useEffect, useState } from "react";
import { Article, ArticleProps } from "./Article";

import cuid from 'cuid';

import styles from './HandleArticle.module.css'
import { ArticleCard } from "./ArticleCard";
import { ArticlePreview } from "./ArticleOpenAI";
import { useAuth } from "../hooks/useAuth";


interface Author{
    name: string;
    role: string;
    avatarUrl: string;
}
interface DevelopmentProps{
    subtitle: string;
    content: string;
}

export function HandleArticle(){

    const [articles,setArticles] =useState<ArticleProps[]>([]);

    const [title,setTitle] = useState('');
    const [tags,setTags] = useState('');
    const [abstract,setAbstract] = useState('');
    const [introduction,setIntroduction] = useState('');
    const [conclusion,setConclusion] = useState('');
    const [references,setReferences] = useState('');
    const [link,setLink] = useState('');
    const [link2,setLink2] = useState('');
    const [video,setVideo] = useState('');

    // const user:Author = {
    //     name: 'Renato Pantoja',
    //     role: 'Contador Chefe',
    //     avatarUrl: 'https://www.pantojacontabilidade.com.br/images/renato2.jpeg'

    // }
    const {user} = useAuth()

    function handleSubmit(){
        console.log('ARTIGO ENVIADO')
        console.log(articles)
    }
    function handleView(){
        
        
        var aux = ''
        video ? aux = video.split('=')[1] : aux = ''

        console.log(aux)
        let article:ArticleProps = {
            id : cuid(),
            author : user,
            publishedAt : new Date,
            content: {
                title: title,
                tags: tags.split(' '),
                abstract: abstract,
                introduction: introduction,
                development: inputFields,
                conclusion: conclusion,
                references: references,
                link: link,
                link2: link2, 
            }
        }
        setArticles([...articles,article])
        handleSubmit()
        
    }
    const [inputFields, setInputFields] = useState([{ subtitle: "", content: "" }]);
     
    const handleFormChange = (index: any , event:React.ChangeEvent<HTMLTextAreaElement>): void => {
        
        let data = [...inputFields] as any;
        
        data[index][event.target.name] = event.target.value;

        setInputFields(data)
        

    }
    const addFields = () => {
        let newfield = { subtitle: '', content: '' }
        setInputFields([...inputFields, newfield])
    }
    const removeFields = (index: any) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }
    useEffect(() => {

    },articles)
  
    return (
        <div className={styles.container}>
            <h2>Criar Artigo</h2>
            <form onSubmit={handleView}>
                <h3> Título: </h3>
                <input
                    type='text'
                    placeholder='Título'
                    required
                    onChange={(event) => setTitle(event.target.value)}
                    value={title}                
                />
                
                <h3> Tags: </h3>
                <input
                    type='text'
                    placeholder='Tags'  
                    onChange={(event) => setTags(event.target.value)}
                    value={tags}                
                />

                
                <h3>Introdução:</h3>
                <textarea
                    name="introduction"
                    placeholder='Introdução'
                    aria-multiline
                    required={true}
                    onChange={(event) => setIntroduction(event.target.value)}
                    value={introduction}  
                />


                <h3>Resumo:</h3>
                <textarea
                    name="abstract"
                    placeholder='Resumo'
                    aria-multiline
                    required={true}
                    onChange={(event) => setAbstract(event.target.value)}
                    value={abstract}  
                />

                <h3> Desenvolvimento: </h3>
                {inputFields.map((input,index) => {
                    return(
                        <div key={index} className={styles.development}>
                            <div className={styles.subtitle}>
                                <h5>Subtítulo:</h5>
                            
                                <textarea
                                    name="subtitle"
                                    placeholder='Desenvolvimento'
                                    style={{overflow: 'hidden'}}
                                    required={true}
                                    value={input.subtitle}
                                    onChange={event => handleFormChange(index, event)}
                                />
                                <button type="reset" onClick={()=>removeFields(index)}>-</button>
                            </div>
                            <h5> Conteúdo:</h5>
                            <textarea
                                name="content"
                                placeholder='Desenvolvimento...'
                                aria-multiline
                                className={styles.contentDev}
                                required={true}
                                value={input.content}
                                onChange={event => handleFormChange(index, event)}
                            />
                        </div>
                    )
                })}
                <button type="reset" onClick={addFields}>Adicionar Subtítulo</button>

                
                
                <h3>Conclusão:</h3>
                <textarea
                    name="development"
                    placeholder='Conclusão...'
                    aria-multiline
                    required={true}
                    onChange={(event) => setConclusion(event.target.value)}
                    value={conclusion}  
                />

                <h3>Referências:</h3>
                <textarea
                    name="development"
                    placeholder='Fontes'
                    aria-multiline
                    required={true}
                    onChange={(event) => setReferences(event.target.value)}
                    value={references}  
                />

                <h3> Link: </h3>
                <input
                    type='url'
                    placeholder='link'
                    onChange={(event) => setLink(event.target.value)}
                    value={link}                  
                />

                <h3> Link 2: </h3>
                <input
                    type='url'
                    placeholder='link'
                    onChange={(event) => setLink2(event.target.value)}
                    value={link2}                  
                />

                {/* <h3> Link vídeo </h3>
                <input
                    type='url'
                    placeholder='Link vídeo'
                    onChange={(event) => setVideo(event.target.value)}
                    value={video}  
                /> */}
                <button
                    type='button'
                    onClick={handleView}                
                >
                    Visualizar Artigo
                </button>
            </form>
            {articles[length] ? 
                <Article 
                    id={articles[length].id}
                    author={articles[length].author}
                    content={articles[length].content}
                    publishedAt={articles[length].publishedAt}
                    commentOFF                 
                />
                :
                null
        
            }
            <button
                type='submit'
                onClick={handleSubmit}                
            >
                Enviar Artigo
            </button>  
            <ArticlePreview
                title="The Effects of Climate Change on Polar Bears"
                abstract="This study investigates the impacts of climate change on the polar bear population in the Arctic. Results suggest that the polar bear population is declining due to the loss of sea ice habitat and a decrease in food availability."
                keywords={["climate change", "polar bears", "Arctic", "sea ice", "habitat", "food availability"]}
                user={user}
                articleId="https://github.com/renatomh.png" 
            />

            
            {articles ? 
                <div >
                    {articles.map( (article) => {
                        
                        return(
                            <ArticleCard
                                key={article.id}
                                id={article.id}
                                author={article.author}
                                content={article.content}
                                publishedAt={article.publishedAt}
                                commentOFF={true}
                            />
                        )
                    })}
                    {/* <Article
                        id={articles[length-1].id}
                        author={articles[length-1].author}
                        content={articles[length-1].content}
                        publishedAt={articles[length-1].publishedAt}
                        commentOFF                   
                    /> */}
                    {/* { articles[articles.length-1].id != '' ?
                        <div>
                            <ArticleCard
                                id={articles[articles.length].id}
                                author={articles[articles.length].author}
                                content={articles[articles.length].content}
                                publishedAt={articles[articles.length].publishedAt}
                            />
                            <button
                                type='submit'
                                onClick={handleSubmit}                
                            >
                                Enviar Artigo
                            </button>
                        </div>
                    :null} */}
                </div>

            :
            <div></div>
            }
        </div>
    )
}