
import { useState } from 'react';
import styles from './SearchCompany.module.css'
import {MagnifyingGlass, User } from 'phosphor-react'
import { useAuth } from '../hooks/useAuth';
import { UserDTO } from '../dtos/UserDTO';
import { CompanyDTO } from '../dtos/CompanyDTO';

interface Props{
  edit?: boolean;
  setCompanyId: (companyId: string) => void
}
export function SearchCompany({edit=false, setCompanyId}:Props){
    
    const [name,setName] = useState('');
    const [id,setId] = useState('');
    const [cardOption,setCardOption] = useState(false);
    // const [company, setCompany] = useState<CompanyDTO[]>([{}as CompanyDTO])
    const [company, setCompany] = useState<string[]>([])
    // const [companyId, setCompanyId] = useState('');
    let companyId = ['']

    const {user} = useAuth()

  function SearchCompanyByName(){
    setCardOption(false)
    //chamada api
    setCompany(['1'])
    companyId=['1']
    setCompanyId('IdProcuraPorNome')
    console.log('procurar por titulo')
  }

  function SearchCompanyById(id: string){
    setCardOption(false)
    //chamada api
    setCompany(['1'])
    setCompanyId('IdProcuraPorId')
    console.log('procurar por titulo')
  }
  function SearchAll(){
    setCardOption(true)
    //chamada api
    setCompany(['1','2','3'])
    setCompanyId('IdProcuraPorTodos')
    console.log('procurar por titulo')
  }

    return(
        <div className={styles.container}>
          <div className={styles.buttonAll}>
            {edit ? <h3>Editar Empresa</h3> : <h3>Procurar Empresa</h3>}
            {user.admin && edit ? 
              <button
                type='reset'
                onClick={() => SearchAll()}                
              >
                <MagnifyingGlass size={20}/> Todos
              </button>
            : null
            }
          </div>
          <form><h4> Nome: </h4>            
            <input
                type='text'
                placeholder='nome fantasia'
                required
                onChange={(event) => setName(event.target.value)}
                value={name}
                               
            />
            <button
                type='reset'
                onClick={SearchCompanyByName}
                disabled={name.length > 0 ? false: true}                 
            >
                <MagnifyingGlass size={20}/>
            </button>
          </form>
          <form><h4> Id: </h4>
            <input
              type='text'
              placeholder='Id da empresa'  
              onChange={(event) => setId(event.target.value)}
              value={id}                
            />
            <button
                type='reset'
                onClick={() => SearchCompanyById(id)} 
                disabled={id.length > 0 ? false: true}                
            >
                <MagnifyingGlass size={20}/>
            </button>
          </form>
          <div className={styles.list}>
            <h4>Lista de empresas:</h4>
            <select
              id="role"
              value={companyId}
              onChange={event => setCompanyId(event.target.value)}
            >
              <option disabled>Empresas</option>
              <option value="Id1"><h5>Empresa1</h5></option>
              <option value="Id2">Empresa2</option>
              <option value="Id3">Empresa3</option>
            </select>
          </div>
          
          {company && !edit ? 
              company.map(company => {
                return (
                  <div>
                    <h2>CompanyId:</h2>
                    <h1>{companyId} - edit {edit ? 'true':'false'}</h1>
                    <h3>card: {cardOption ? 'true':'false'}</h3>
                  </div>
                )
              })
          :
              <div>edit: {edit ? 'true':'false'}</div>
          }
        </div>
    )
}