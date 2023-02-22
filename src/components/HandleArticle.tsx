
import { useEffect, useState } from "react";
import { Article, ArticleProps } from "./Article";

import cuid from 'cuid';

import styles from './HandleArticle.module.css'
import { ArticleCard } from "./ArticleCard";
import { ArticlePreview } from "./ArticleOpenAI";
import { useAuth } from "../hooks/useAuth";
import { Trash } from "phosphor-react";
import { api } from "../services/api";
import { AIcreaterArticle } from "./AIcreaterArticle";
import { boolean } from "yup";
import Loading from "./Loading";


interface Author{
    name: string;
    role: string;
    avatarUrl: string;
}
interface DevelopmentProps{
    subtitle: string;
    content: string;
}
// interface Props{
//     setIsLoading: (status:boolean) => void
// }

export function HandleArticle(){

    const [articles,setArticles] =useState<ArticleProps[]>([]);
    const [article,setArticle] =useState<ArticleProps>({}as ArticleProps);
    const [selectIA,setSelectIA] = useState(false)

    const [title,setTitle] = useState('');
    const [tags,setTags] = useState('');
    const [abstract,setAbstract] = useState('');
    const [references,setReferences] = useState('');
    const [link,setLink] = useState('');
    const [link2,setLink2] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    // const user:Author = {
    //     name: 'Renato Pantoja',
    //     role: 'Contador Chefe',
    //     avatarUrl: 'https://www.pantojacontabilidade.com.br/images/renato2.jpeg'

    // }
    const {user} = useAuth()
    
      
    async function handleSubmit(){
        
        try {
            setIsLoading(true)
            const res = await api.post('/article',article,)
            console.log('ARTIGO ENVIADO',res)
            
            
        } catch (error) {
            console.log('Erro ao enviar o arquivo')
            throw error
        }finally{
            setIsLoading(false)
        }
    }

    function handleView(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
       
        let articleToSend = {
            id: cuid(),
            author: user,
            title: title,
            tags: tags,
            abstract: abstract,
            content: {
                inputFields
            },
            references: references,
            link1: link,
            link2: link2,
        }as ArticleProps
        setArticle(articleToSend)
        setArticles([...articles,articleToSend])
        
    }
    const [inputFields, setInputFields] = useState([{ subtitle: "Introdução", content: "" },{ subtitle: "Desenvolvimento", content: "" },{ subtitle: "Conclusão", content: "" }]);
     
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
    function loadingAI(){
        
        setTitle(article.title)
        setTags(article.tags)
        setAbstract(article.abstract)
        console.log('INPUTFIELDS',article.content.inputFields[0])
        setInputFields(article.content.inputFields)
        setReferences(article.references)

        console.log(article.abstract,tags)
                        
        
    }
    
    useEffect(()=>{
        if (article.content?.inputFields[0] !== undefined){
            loadingAI()
        }
    },[article])
  
    return (
      <Loading
        isLoading={isLoading}
        text="Fazendo nossa mágica..."
      >
        <div className={styles.container}>
            <div className={styles.double}>
                <h2>Criar Artigo</h2>
                <button style={{maxWidth: '20rem'}} type="reset" onClick={()=>setSelectIA(!selectIA)}>
                    Sem idéia? Utilize nossa Inteligência Artificial e se supreenda
                </button>
            </div>
            {selectIA ? 
                <AIcreaterArticle
                    setText={setArticle}
                    setIsLoading2={setIsLoading}
                />
                :
                null
            }
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
                    required                
                />


                <h3>Resumo:</h3>
                <textarea
                    name="abstract"
                    placeholder='Resumo'
                    aria-multiline
                    required
                    onChange={(event) => setAbstract(event.target.value)}
                    value={abstract}  
                />

                <h3> Capítulos: </h3>
                {inputFields.map((input,index) => {
                    return(
                        <div key={index} className={styles.development}>
                            <div className={styles.subtitle}>
                                <h5>Subtítulo:</h5>
                            
                                <textarea
                                    name="subtitle"
                                    placeholder='Dê um subtítulo'
                                    style={{overflow: 'hidden'}}
                                    required={true}
                                    value={input.subtitle}
                                    onChange={event => handleFormChange(index, event)}
                                />
                                <button type="reset" onClick={()=>removeFields(index)} disabled={inputFields.length > 1 ? false : true}>
                                    <Trash size={20}/>
                                </button>
                            </div>
                            <h5> Conteúdo:</h5>
                            <textarea
                                name="content"
                                placeholder='Escreva sobre o capitulo'
                                aria-multiline
                                className={styles.contentDev}
                                required={true}
                                value={input.content}
                                onChange={event => handleFormChange(index, event)}
                            />
                        </div>
                    )
                })}
                <button type="reset" onClick={addFields}>+ capítulo</button>

                
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
                    type='submit'
                >
                    Visualizar Artigo
                </button>
            </form>
            {articles[length] ? 
                
                <div>
                    <Article 
                        id={article.id}
                        author={article.author}
                        content={article.content}
                        createdAt={article.createdAt}
                        abstract={article.abstract}
                        references={article.references}
                        tags={article.tags}
                        title={article.title}
                        link1={article.link1}
                        link2={article.link2}
                        updatedAt={article.updatedAt}
                        
                        commentOFF   
                                   
                    />
                    
                    <button type="reset" onClick={handleSubmit} style={{marginTop: "1rem"}}>
                        Enviar Artigo
                    </button>
                </div>
                :
                null
        
            }
             
            {/* <ArticlePreview
                title="The Effects of Climate Change on Polar Bears"
                abstract="This study investigates the impacts of climate change on the polar bear population in the Arctic. Results suggest that the polar bear population is declining due to the loss of sea ice habitat and a decrease in food availability."
                keywords={["climate change", "polar bears", "Arctic", "sea ice", "habitat", "food availability"]}
                user={user}
                articleId="https://github.com/renatomh.png" 
            /> */}

            
            {articles ? 
                <div >
                    {articles.map( (article) => {
                        
                        return(
                            <ArticleCard
                                id={articles[length].id}
                                author={articles[length].author}
                                content={articles[length].content}
                                createdAt={articles[length].createdAt}
                                abstract={articles[length].abstract}
                                references={articles[length].references}
                                tags={articles[length].tags}
                                title={articles[length].title}
                                link1={articles[length].link1}
                                link2={articles[length].link2}
                                updatedAt={articles[length].updatedAt}
                                
                                   
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
            null
            }
        </div>
      </Loading>
    )
}