import { useEffect, useState } from "react"
import { SearchPost } from "../SearchPost";
import { HandleArticle } from "../HandleArticle";
import { HandlePost } from "../HandlePost";
import {MenuBar} from "../MenuBar"

import styles from "./ManageClient.module.css"
import { SearchArticle } from "../SearchArticle";
import { CreateClient } from "./CreateClient";
import { SearchCompany } from "../SearchCompany";

interface Props{
  setIsLoading: (status:boolean) => void
}

export function ManageClient({setIsLoading}:Props){

  const [navigation, setNavigation] =useState<'post'|'article'|'client'>('article')
  const [companyId,setCompanyId] = useState<string | null>(null)
  
  const items = [
      {
        title: "Posts",
        onClick: () => {
          setNavigation('post');
        }
      },
      {
        title: "Artigos",
        onClick: () => {
          setNavigation('article');
        }
      },
      {
        title: "Clientes",
        onClick: () => {
          setNavigation('client');
        }
      }
  ];
  const [options, setOptions] =useState<'create'|'search'>('create')
  const [optionsClient, setOptionsClient] =useState<'create'|'delete'|'search'|'edit'|'list'>('list')

  const itemsOption = [
      {
        title: "Criar",
        onClick: () => {
          setOptions('create');
        }
      },
      {
        title: "Procurar",
        onClick: () => {
          setOptions('search');
        }
      }
    ];
    const itemsClients = [
      
      {
        title: "Editar",
        onClick: () => {
          setOptionsClient('edit');
        }
      },
      {
        title: "Criar Nova Empresa",
        onClick: () => {
          setOptionsClient('create');
        }
      },
      {
        title: "Procurar",
        onClick: () => {
          setOptionsClient('search');
        }
      },
      {
        title: "Deletar",
        onClick: () => {
          setOptionsClient('delete');
        }
      }
    ];
    
    useEffect(() => {
      setCompanyId(null)
    },[optionsClient])
  return(
    <div>
      <h2>Gerenciamento</h2>

      <MenuBar
          items={items}
      />

      <div>
        {navigation === 'client' ?
            
            
          <div>
            <div className={styles.menuBarSecondary}>
              <h2>Empresas</h2>
              <MenuBar
                items={itemsClients}
                option= 'secondary'
              />
            </div>
            {optionsClient === "create" ?
              <CreateClient
                edit={false}
              />
              :
              optionsClient === "delete" ?
              
              <div>
                <h2>Deletar Empresa</h2>
                <SearchCompany
                  setCompanyId={setCompanyId}
                />
                {companyId ?
                  <h3>Deletar empresa: {companyId}</h3> 
                  // <CompanyCard
                  //   companyId={companyId}
                  //   delete={true}
                  // />
                : null}
              </div>
              :
              optionsClient === "edit" ?
                <div>
                  <SearchCompany
                    setCompanyId={setCompanyId}
                    edit={true}
                  />
                  {companyId ? 
                    <CreateClient
                      companyId={companyId}
                      edit={true}
                  />
                  : null}
                </div>
              
              :
              optionsClient === "search" ?
              <SearchCompany
                setCompanyId={setCompanyId}
              />
              :
              <h1>Listar empresas</h1>  
          
            }                
        
          </div>
        
        :
        navigation === 'article'  ?
            
        <div>
          <div className={styles.menuBarSecondary}>
            <h2>Artigos</h2>
            <MenuBar
              items={itemsOption}
              option= 'secondary'
            />
          </div>
          {options === "search" ?
            <SearchArticle/>
            :
            <HandleArticle/>   
        
          }                    
        </div>    
        :
        navigation === 'post' ? 
                
          <div>
            <div className={styles.menuBarSecondary}>
              <h2>Posts</h2>
              <MenuBar
                items={itemsOption}
                option= 'secondary'
              />
            </div>
            {options === "search" ?
                <SearchPost/>
              :              
                <HandlePost
                  setIsLoading={setIsLoading}
                />   
          
            }                 
            
          </div>
        :
            <div>Houston, tivemos um problema</div>

        }
      </div>
    </div>
  )
}