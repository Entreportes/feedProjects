import styles from './HandleLinks.module.css'
import { useState } from 'react';
import { Trash,  } from 'phosphor-react'


export function HandleLinks(){
    function saveLinks(){
        console.log('links enviados',inputFields)
    }
    const [inputFields, setInputFields] = useState([
        { title: "Junta Comercial", link: "https://jucis.df.gov.br/" },
        { title: "Receita Federal", link: "https://www.gov.br/receitafederal/pt-br" },
        { title: "SEFAZ - Secretaria de Fazenda do DF", link: "https://sefaz.df.gov.br/" },
        { title: "Consulta CNPJ", link: "https://solucoes.receita.fazenda.gov.br/servicos/cnpjreva/cnpjreva_solicitacao.asp" },
        { title: "SEFAZ - Secretaria de Fazenda do DF", link: "https://sefaz.df.gov.br/" },
        { title: "Agência NET", link: "https://agnet.fazenda.df.gov.br//area.cfm?id_area=1125" },
        { title: "Emissão de certidões", link: "http://cnd.dataprev.gov.br/cws/contexto/cnd/cnd.html" },   
        { title: "Consulta Regularidade do Empregador", link: "https://consulta-crf.caixa.gov.br/consultacrf/pages/consultaEmpregador.jsf" },   
        { title: "", link: "" }
    ]);
     
    const handleFormChange = (index: any , event:React.ChangeEvent<HTMLInputElement>): void => {
        
        let data = [...inputFields] as any;
        
        data[index][event.target.name] = event.target.value;

        setInputFields(data)
        

    }
    const addFields = () => {
        let newfield = { title: '', link: '' }
        setInputFields([...inputFields, newfield])
    }
    const removeFields = (index: any) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }
    return(
        <div className={styles.container}>
            <h2> Links: </h2>
            {inputFields.map((input,index) => {
                return(
                    <div key={index} className={styles.content}>
                        <div className={styles.items}>
                            <h5>Título do Link:</h5>                        
                            <input
                                name="title"
                                placeholder='insira o título do link'
                                style={{overflow: 'hidden'}}
                                required={true}
                                value={input.title}
                                onChange={event => handleFormChange(index, event)}
                            />
                            <button type="reset" onClick={()=>removeFields(index)}>
                                <Trash size={20}/>
                            </button>
                        </div>
                        <div className={styles.items}>
                            <h5> Link:</h5>
                            <input
                                name="link"
                                placeholder='insira o link do site'
                                aria-multiline
                                className={styles.contentDev}
                                required={true}
                                value={input.link}
                                onChange={event => handleFormChange(index, event)}
                            />
                        </div>
                    </div>
                )
            })}
            <div className={styles.buttons}>
                <button type="reset" onClick={saveLinks}>Salvar Links</button>
                <button type="reset" onClick={addFields}>Adicionar Subtítulo</button>
            </div>
        </div>
    )
}