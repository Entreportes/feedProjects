import axios from 'axios';
import { MagnifyingGlassPlus } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { CompanyDTO } from '../../dtos/CompanyDTO';
import { UserDTO } from '../../dtos/UserDTO';
import { SearchCompany } from '../SearchCompany';
import styles from './CreateClient.module.css';
import { CreateUser } from './CreateUser';


interface Props {
    edit?:boolean;
    companyId?: string;
    delite?: boolean;
}

export function CreateClient({edit=false, companyId}:Props){
  const [corporateName, setCorporateName] = useState('');
  const [fantasyName, setFantasyName] = useState('');
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState('');
  const [address, setAddress] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [ie, setIe] = useState('');
  const [nire, setNire] = useState('');
  const [email, setEmail] = useState('');
  const [editUser,setEditUser] = useState(false);

  const handleChangeCNPJ = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    let formattedCnpj = inputValue
      
    formattedCnpj = formattedCnpj.replace(/\D/g, "");
    formattedCnpj = formattedCnpj.replace(/(\d{2})(\d)/, "$1.$2");
    formattedCnpj = formattedCnpj.replace(/(\d{3})(\d)/, "$1.$2");
    formattedCnpj = formattedCnpj.replace(/(\d{3})(\d)/, "$1/$2");
    formattedCnpj = formattedCnpj.replace(/(\d{4})(\d)/, "$1-$2");
    setCnpj(formattedCnpj);
  };
  
  const handleCEP = (event: React.ChangeEvent<HTMLInputElement>) => {
        let formattedCep = event.target.value;
        formattedCep = formattedCep.replace(/\D/g, "");
        formattedCep = formattedCep.replace(/(\d{5})(\d)/, "$1-$2");
        setCep(formattedCep)
  }
  const handleIe = (event: React.ChangeEvent<HTMLInputElement>) => {
    let formattedIe = event.target.value;
    formattedIe = formattedIe.replace(/\D/g, "");
    formattedIe = formattedIe.replace(/(\d{3})(\d)/, "$1.$2");
    formattedIe = formattedIe.replace(/(\d{3})(\d)/, "$1.$2");
    formattedIe = formattedIe.replace(/(\d{3})(\d)/, "$1.$2");
  
    setIe(formattedIe)
  }

  function handleSubmit (event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    console.log(userToRegister)
    console.log({
      corporateName,
      fantasyName,
      cep,
      uf,
      address,
      cnpj,
      ie,
      nire,
      email
    });
  }
  
  
    const ufList = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
        'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
        'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
      ];

    const [userToRegister, setUserToRegister] = useState<UserDTO | null>(null)
    const [userToRegisterAux, setUserToRegisterAux] = useState<UserDTO | null>(null)
    const handleUserChange = (newUser: UserDTO) => {
        setUserToRegister(newUser);
      };
    // const handleSubmitUser = (values: { name: string; email: string; avatarUrl: string; admin: boolean; role: string; company: string }) => {
    //     console.log(values);
    //     console.log('handleSubmitUser')
    //     const userAux = {
    //         name:values.name,
    //         admin:values.admin,
    //         avatar:values.avatarUrl,
    //         company:values.company,
    //         email:values.email,
    //         role:values.role

    //     } as UserDTO
    //     setUserToRegister(userAux)
    //     // ... submit the values to your API or store them somewhere
    //   };
    async function loadCompanyData(companyId:string|undefined){
        console.log('EMPRESA ID: ',companyId)
        //FAZER CHAMADA PARA API
        const company = {
            id: companyId,
            corporateName: 'Empresa Teste Ltda',
            fantasyName: 'Empresa teste',
            avatar: 'https://feed-projects-kyh7nfkb4-entreportes.vercel.app/assets/logo_ignite_simbol.a7b6d80d.svg',
            cnpj: '00.000.000/0000-00',
            email: 'renato@emprestateste.com',
            address: 'endereço aqui',
            cep: '71.993-540',
            ie: '000.000.000.000',
            nire: '00000000000',
            uf: 'Distrito Federal',
            owner: {
                admin: true,
                company: companyId,
                email: 'renato@emprestateste.com',
                name: 'Renato Pantoja',
                role: 'CEO',
            }
        } as unknown as CompanyDTO
        setUserToRegister(company.owner)
        setCorporateName(company.corporateName)
        setFantasyName(company.fantasyName)
        setCep(company.cep)
        setUf(company.uf)
        setAddress(company.address)
        setCnpj(company.cnpj)
        setIe(company.ie)
        setNire(company.nire)
        setEmail(company.email)
        
    }

    function deleteCompany(companyId:string){
        
        console.log('deletar:',companyId)
    } 

    interface Address {
        cep: string;
        logradouro: string;
        complemento: string;
        bairro: string;
        localidade: string;
        uf: string;
      }
      
    async function getAddressFromCEP(cep: string){
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) {
        throw new Error(`Falhou para encontrar o CEP: ${cep}`);
        
    }
    const address = await response.json() as Address;
    if(address.cep === undefined) return
    setUf(address.uf)
    setAddress(address.logradouro + ' ' + address.localidade + '-' + address.uf)
    }
    // if(cep.length === 9) getAddressFromCEP(cep)

    function changeUser(){
        setUserToRegisterAux(userToRegister)
        setUserToRegister(null)

    }
    useEffect(() =>{
        if(cep.length === 9) getAddressFromCEP(cep)
    },[cep])
    useEffect(() => {
        console.log('useEffect')
        setUserToRegister(null)
        if(edit && companyId !== ''){
            console.log('carregar dados da empresa')
            loadCompanyData(companyId)
        }else{
            console.log('entrou else')
            setUserToRegister(null)
            setCorporateName('')
            setFantasyName('')
            setCep('')
            setUf('')
            setAddress('')
            setCnpj('')
            setIe('')
            setNire('')
            setEmail('')

        }
      },[companyId]);
  return (
    <div className={styles.container}>
        
        <form onSubmit={handleSubmit} className={styles.form} id="my-form">
            {companyId ? <h1>{companyId}</h1>:null}
            <div>
                <label htmlFor="corporateName">Razão Social: </label>
                <input
                type="text"
                id="corporateName"
                placeholder="Empresa X Ltda"
                required
                value={corporateName}
                onChange={(e) => setCorporateName(e.target.value)}
                
                />
            </div>
            <div>
                <label htmlFor="fantasyName">Nome Fantasia:</label>
                <input
                    type="text"
                    id="fantasyName"
                    placeholder="Empresa X"
                    value={fantasyName}
                    required
                    onChange={(e) => setFantasyName(e.target.value)}

                />
            </div>
        
        
            <div className={styles.double}>
                <div>
                    <label htmlFor="cnpj">CNPJ:</label>
                    <input
                        type="text"
                        id="cnpj"
                        value={cnpj}
                        placeholder="00.000.000/0000-00"
                        onChange={handleChangeCNPJ}
                        maxLength={18}
                    
                    />
                </div>
                <div>
                    <label htmlFor="ie">IE:</label>
                    <input
                        type="text"
                        id="ie"
                        value={ie}
                        onChange={handleIe}
                        maxLength={15}
                        placeholder="000.000.000.000"
                    
                    />
                </div>
                <div>
                    <label htmlFor="ie">NIRE:</label>
                    <input
                        type="text"
                        id="nire"
                        value={nire}
                        maxLength={11}
                        placeholder="00000000000"
                        onChange={(e) => setNire(e.target.value)}                    
                    />
                </div>
            </div>
        
            <div>
                <div className={styles.double}>
                    <div>
                        <label htmlFor="cep">CEP:</label>
                        <input
                            type="text"
                            id="cep"
                            value={cep}
                            onChange={handleCEP}
                            maxLength={9}
                            placeholder="00000-000"
                        />
                        <button type='reset' onClick={() => {getAddressFromCEP(cep.replace('.',''))}} disabled={cep.length != 9 ? true:false}><MagnifyingGlassPlus size={15} /></button>
                    </div>
                    <div>
                        <label htmlFor="uf">UF:</label>
                        <select  value={uf} onChange={(e) => setUf(e.target.value)}>
                            <option value="" disabled>
                                Selecione uma UF
                            </option>
                            {ufList.map((uf) => (
                                <option key={uf} value={uf}>
                                {uf}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div>
                <label htmlFor="address">Endereço:</label>
                <input
                type="text"
                id="address"
                placeholder='Rua Borboletas Psicodélicas, Jabaquara'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                
                />
            </div>
            <div>
                <label htmlFor="ie">E-mail: </label>
                <input
                    type="email"
                    id="email"
                    placeholder='contato@empresaX.app'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            
        
        </form>
        {(userToRegister !== null ) ? 
            <div className={styles.form}>
                <div>
                    <div className={styles.double}>
                        <h3>Administrador</h3>
                        <button className={styles.buttonReset} type='reset' onClick={changeUser}>Alterar</button>
                    </div>
                    {userToRegister !== null ?
                        <div>
                            <p>Name: {userToRegister.name}</p>
                            <p>Email: {userToRegister.email}</p>
                            <p>Avatar URL: {userToRegister.avatar}</p>
                            <p>Admin: {userToRegister.admin ? "Sim" : "Não"}</p>
                            <p>Role: {userToRegister.role}</p>
                        </div>
                    : null}
                    
                </div>
            
                <button type='submit' form="my-form"><h3>Registrar Empresa</h3></button>
            </div>
            :
            <div className={styles.form}>
                <CreateUser
                    setUser={handleUserChange}
                    userAux={userToRegisterAux}
                />
                
            </div>
        }
    </div>

  )
}
