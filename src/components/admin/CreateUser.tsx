
import React, { useEffect, useState } from 'react';
import { CompanyDTO } from '../../dtos/CompanyDTO';
import { UserDTO } from '../../dtos/UserDTO';
import styles from './CreateUser.module.css';

interface RegisterUserProps {
  setUser: (user: UserDTO) => void;
  userAux?: UserDTO | undefined | null
}

export const CreateUser: React.FC<RegisterUserProps> = ({ setUser, userAux=undefined }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [admin, setAdmin] = useState(false);
  const [role, setRole] = useState('');
  // const [company, setCompany] = useState('Acme');
  const id = ''
  const company = {} as CompanyDTO

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('handleSubmit Create User')
    const user: UserDTO = { name, email, avatar, admin, role, id, company };
    setUser(user);
    
    setName("");
    setEmail("");
    setAvatar("");
    setAdmin(false);
    setRole("");
  };
  useEffect(()=>{
    if (userAux !== undefined && userAux !== null){
      setName(userAux.name);
      setEmail(userAux.email);
      setAvatar(userAux.avatar? userAux.avatar : 'avatar');
      setAdmin(userAux.admin);
      setRole(userAux.role ? userAux.role : '');
    }
  },[])

  return (
    <form id="my-form2" className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.double}>
        <h3>Registrar usuário</h3>
        <button type='submit' form="my-form2">Salvar </button>
      </div>
      <div>
        <label htmlFor="name">Nome:</label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">E-mail:</label>
        <input
          id="email"
          type="email"
          value={email}
          required
          onChange={event => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="avatar">Link da imagem:</label>
        <input
          id="avatar"
          type="url"
          value={avatar}
          onChange={event => setAvatar(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="admin">Administrador:
          <input
            id="admin"
            type="checkbox"
            checked={admin}
            onChange={event => setAdmin(event.target.checked)}
          />          
        </label>
      </div>
      <div>
        <label htmlFor="name">Cargo:</label>
        <input
          id="role"
          type="text"
          value={role}
          onChange={event => setRole(event.target.value)}
        />
      </div>
      {/* <div>
        <label htmlFor="role">Role:</label>
        <select
          id="role"
          value={role}
          onChange={event => setRole(event.target.value)}
        >
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="product_manager">Product Manager</option>
        </select>
      </div> */}
      {/* <div>
        <label htmlFor="company">Company:</label>
        <select
          id="company"
          value={company}
          onChange={event => setCompany(event.target.value)}
        >
          <option value="Acme">Acme</option>
          <option value="Wayne Enterprises">Wayne Enterprises</option>
          <option value="Stark Industries">Stark Industries</option>
        </select>
      </div> */}
    </form>
    )
  }
