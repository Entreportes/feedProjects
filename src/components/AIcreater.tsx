
import { useState } from 'react';
import styles from './AIcreater.module.css'
import { Post, PostProps } from "./Post";
import { useAuth } from '../hooks/useAuth';
import { ArticleProps } from './Article';
import { openAI } from '../services/openAi';
import cuid from 'cuid';
import {Spinner} from 'phosphor-react'
import Loading from './Loading';

interface Props{
  setText: React.Dispatch<React.SetStateAction<PostProps | undefined>>;
}
export function AIcreater({setText}:Props){
  const [post,setPost] =useState<PostProps>({} as PostProps);
  const [article,setArticle] =useState<ArticleProps>({} as ArticleProps);

  const [question,setQuestion] = useState('');
  const [topic,setTopic] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>('');
  const personaList = ['jovem', 'adolescente', 'experiente', 'leigo', 'que conhece o tema' ]
  const [terms,setTerms] = useState('');
  const [size,setSize] = useState(500);
  const [persona,setPersona] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  

  const {user} =useAuth()

  async function handleSuggestions(type:string) {
    // const prompt = `Sugira uma dúvida sobre o tema: "${topic}"`;
    const prompt = `Sugira um e apenas ${type} relacionado a "${topic}"`;
    // const prompt = 'poderia me enviar o link de um vídeo relacionado a esse post?'
    console.log('prompt: ',prompt)
    const engine = 'text-curie-001';
    const temperature = 0.7;
    try {
        setIsLoading(true)
        await openAI.createCompletion({
        prompt,
        max_tokens: 30,
        n: 5,
        model: engine,
        temperature: temperature
      }).then((response: any) => {
        const choices = response.data.choices;
        console.log('response:',response)
        const newSuggestions = choices.map((choice: any) => choice.text.trim());
        setSuggestions(newSuggestions)
        setSelectedSuggestion(newSuggestions[0])
      }).catch((error: any) => {
        console.log(error);
      });
      
    } catch (error) {
      console.log('erro ao gerar o tema')
      throw error
    }finally{
      setIsLoading(false)
    }

  }
  

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    
    const prompt = `Crie um post sobre "${selectedSuggestion}" ${persona ? `voltado para um público ${persona}` : ''} ${terms? `, e inclua os seguintes termos: ${terms}` : ''}.`;
    // const prompt = 'me sugira 3 temas sobre contabilidade. Envie as informações no formato [item1: "sugestão 1",item1: "sugestão ",item3: "sugestão 3"]'
    
    console.log('prompt: ',prompt)
    const maxTokens = 500;
    const n = 1;
    const engine = 'text-davinci-003';
    const temperature = 0.6;
    try {
        setIsLoading(true)
        await openAI.createCompletion({
        prompt,
        max_tokens: maxTokens,
        n: n,
        model: engine,
        temperature: temperature
      }).then((response: any) => {
        const choices = response.data.choices;
        console.log('response:',response)
        // Itere sobre as escolhas e imprima o texto gerado
        // for (let i = 0; i < choices.length; i++) {
        //   console.log(`Post- ${i+1}: ${choices[i].text}`);
        // }
        // if(type = 'article') setText({
        //   author: user,
        //   id: cuid(),
        //   tags: terms,
        //   title: question,
        //   abstract: 'Resumo aqui',
        //   content:{
        //     inputFields: [{subtitle: 'Subtítulo', content: choices.text}]
        //   },
        //   references: 'Inteligência artifical',

        // } as ArticleProps)
        const textAux: PostProps = {
          author: {
            avatarUrl: 'https://feed-projects-git-master-entreportes.vercel.app/assets/logo_ignite_simbol.a7b6d80d.svg',
            name: 'eContabil',
            role: 'Inteligência Artificial',
          },
          id: cuid(),
          tags: terms,
          title: selectedSuggestion,
          description: choices[0].text,
        }
        console.log('SALVANDO:',textAux)
        setText(textAux)
      }).catch((error: any) => {
        console.log(error);
      });
      
      
      // if(type='article') setText(article)
      // setText(post)
    } catch (error) {
      console.log('erro ao gerar o texto')
      throw error
    }finally{
      setIsLoading(false)
    }

  }
  return(
    <Loading
      isLoading={isLoading}
      text="Fazendo nossa mágica"
    >
      <form onSubmit={handleSubmit}>
        <div className={styles.container}>
          <div className={styles.buttonAll}>
            <h2>AI Post creater </h2>
            
          </div>
          <h3> Tema: </h3>
          <input
              type='text'
              placeholder='A importância da contabilidade numa empresa brasileira'
              required
              onChange={(event) => setTopic(event.target.value)}
              value={topic}                            
          />
          <div className={styles.buttons}>
            <button 
              type="reset" 
              onClick={()=>handleSuggestions('um tema')}
              disabled={!topic}
            >
              Temas relacionados
            </button>
            <button 
              type="reset" 
              onClick={()=>handleSuggestions('uma questão')}
              disabled={!topic}
            >
              Questões relacionadas
            </button>
            <button 
              type="reset" 
              onClick={()=>handleSuggestions('um título')}
              disabled={!topic}
            >
              Títulos relacionados
            </button>
          </div>
          {isLoading ? 
            null
            :
            suggestions.length? (
              <div>
                <select value={selectedSuggestion} onChange={(event)=>setSelectedSuggestion(event.target.value)}>
                  <option value={topic}>
                      {topic}
                    </option>
                  {suggestions.map((suggestion, index) => (
                    <option key={index} value={suggestion}>
                      {suggestion}
                    </option>
                  ))}
                </select>
                
                <h3> Incluir termos: </h3>
                <input
                    type='text'
                    placeholder= 'escreva as palavras chaves importantes que deseja incluir'  
                    onChange={(event) => setTerms(event.target.value)}
                    value={terms}                
                />
                <h3> Público alvo: </h3>
                <select  value={persona} onChange={(e) => setPersona(e.target.value)}>
                  {personaList.map((persona) => (
                      <option key={persona} value={persona}>
                      {persona}
                      </option>
                  ))}
                </select>
                <button 
                  type='submit'
                  disabled={isLoading}
                >
                  {isLoading ? <div> <Spinner /> Estamos trabalhando</div>: 'Fazer nossa mágica'}
                </button>
              </div>
              )
              :
              null
          }
          
          
          
          
            
            
        </div>
      </form>
    </Loading>
  )
          
          
}