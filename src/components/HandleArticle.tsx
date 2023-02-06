
import { useState } from "react";
import { Article, ArticleProps } from "./Article";

import cuid from 'cuid';

import styles from './HandleArticle.module.css'


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

    const [article,setArticle] =useState<ArticleProps>();

    const [title,setTitle] = useState('');
    const [tags,setTags] = useState('');
    const [abstract,setAbstract] = useState('');
    const [introduction,setIntroduction] = useState('');
    // const [development,setDevelopment] = useState<{subtitle: string, content: string}[]>([]);
    const [subtitle,setSubtitle] = useState([''])
    const [contentDev,setContentDev] = useState([''])
    const [conclusion,setConclusion] = useState('');
    const [references,setReferences] = useState('');
    const [link,setLink] = useState('');
    const [link2,setLink2] = useState('');
    const [video,setVideo] = useState('');

    const user:Author = {
        name: 'Renato Pantoja',
        role: 'Contador Chefe',
        avatarUrl: 'https://www.pantojacontabilidade.com.br/images/renato2.jpeg'

    }

    function handleSubmit(){
        console.log('ARTICLE ENVIADO')
        console.log(article)
    }
    function handleView(){
        
        let development:DevelopmentProps[] = [];
        for(let index = 0; subtitle[index] ; index++) {
            development = [...development,{subtitle: subtitle[index],content: contentDev[index]}];            
        }
        console.log(title)
        console.log(tags)
        console.log(abstract)
        console.log(introduction)
        console.log(development)
        console.log(conclusion)
        console.log(references)
        var aux = ''
        video ? aux = video.split('=')[1] : aux = ''

        console.log(aux)
        const article:ArticleProps = {
            id : cuid(),
            author : user,
            publishedAt : new Date,
            content: {
                title: title,
                tags: tags.split(' '),
                abstract: abstract,
                introdction: introduction,
                development: inputFields,
                conclusion: conclusion,
                references: references,
                link: link,
                link2: link2, 
            }
        }
        setArticle(article)
        
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
  
    return (
        <div className={styles.container}>
            <h2>Criar Artigo</h2>
            <form>
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
                                    placeholder='Subtítulo'
                                    
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

            {article ? 
                <div>
                    <Article
                        id={article.id}
                        author={article.author}
                        content={article.content}
                        publishedAt={article.publishedAt}
                        commentOFF={true}
                    />
                    <button
                        type='submit'
                        onClick={handleSubmit}                
                    >
                        Enviar Artigo
                    </button>
                </div>

            :
            <div></div>
            }
        </div>
    )
}