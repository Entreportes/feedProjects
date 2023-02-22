
import { parseISO } from 'date-fns'
import { useState } from 'react';
import styles from './AIcreater.module.css'
import {MagnifyingGlass, User } from 'phosphor-react'
import { useAuth } from '../hooks/useAuth';
import { ArticleProps } from './Article';
import { openAI } from '../services/openAi';
import cuid from 'cuid';
import {Spinner} from 'phosphor-react'
import { MenuBar } from './MenuBar';


interface Props{
  setText: React.Dispatch<React.SetStateAction<ArticleProps>>;
  setIsLoading2: (status:boolean) => void
}
export function AIcreaterArticle({setText, setIsLoading2 }:Props){
  
  const [article,setArticle] =useState<ArticleProps>({} as ArticleProps);

  const [question,setQuestion] = useState('');
  const [abstract,setAbstract] = useState('');
  const [topic,setTopic] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>('');
  const personaList = ['jovem', 'adolescente', 'experiente', 'leigo', 'que conhece o tema' ]
  const [terms,setTerms] = useState('');
  const [persona,setPersona] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState('')

  

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
        setIsLoading2(true)
        await openAI.createCompletion({
        prompt,
        max_tokens: 20,
        n: 5,
        model: engine,
        temperature: temperature
      }).then((response: any) => {
        const choices = response.data.choices;
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
      setIsLoading2(false)
    }

  }
  async function loadAbstract(contentAux: string): Promise<string>{
    
    const prompt = ` Crie um resumo do seguinte texto: "${contentAux}"`
    console.log('prompt RESUMO: ',prompt)
    const maxTokens = 160;
    const n = 1;
    const engine = 'text-curie-001';
    const temperature = 0.3;
    let abstract =''
    try {
      setIsLoading(true)
      setIsLoading2(true)
      await openAI.createCompletion({
      prompt,
      
      max_tokens: maxTokens,
      n: n,
      model: engine,
      temperature: temperature
      }).then((response: any) => {
        const choices = response.data.choices;
        setAbstract(choices[0].text)
        abstract = choices[0].text
        console.log('response RESUMO:',choices[0].text)
        return (choices[0].text as String)
      }).catch((error: any) => {
        console.log(error);
        throw error
      });
      return (abstract)
    
    } catch (error) {
      console.log('erro ao gerar o texto')
      throw error
    }finally{
      setIsLoading(false)
      setIsLoading2(false)
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    
    const prompt = `Por favor, faça uma redação de no mínimo 6 parágrafos sobre "${selectedSuggestion}" ${persona ? `voltado para um público ${persona}` : ''} ${terms? `, e inclua os seguintes termos: ${terms}` : ''}. `;
    // const prompt = 'me sugira 3 temas sobre contabilidade. Envie as informações no formato [item1: "sugestão 1",item1: "sugestão ",item3: "sugestão 3"]'
    
    console.log('prompt REDAÇÃO: ',prompt)
    const maxTokens = 2048;
    const n = 1;
    const engine = 'text-davinci-003';
    const temperature = 0.6;
    try {
        setIsLoading(true)
        setIsLoading2(true)
        await openAI.createCompletion({
          prompt,
          max_tokens: maxTokens,
          n: n,
          model: engine,
          temperature: temperature,

        })     
      .then(async (response: any) => {
        const choices = response.data.choices;
        // setContent(choices[0].text)
        const content = choices[0].text
        console.log('response REDAÇÃO:',content)
        const abstract = await loadAbstract(content) 
        const textAux: ArticleProps = {
          author: user,
          id: cuid(),
          tags: terms,
          title: topic,
          abstract: abstract,
          content:{
            inputFields: [{subtitle:selectedSuggestion, content: content}]
          },
          references: 'Inteligência artifical eContabil',
        }
        console.log('SALVANDO:',textAux)
        setText(textAux)
      })
      .catch((error: any) => {
        console.log(error);
      });
      
      
    } catch (error) {
      console.log('erro ao gerar o texto')
      throw error
    }finally{
      setIsLoading(false)
      setIsLoading2(false)
    }

  }
  return(
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
  )
          
          
}