import { UserDTO } from "./UserDTO";

export type CompanyDTO = {
    id: string;
    corporateName: string; 
    fantasyName: string;
    cep: string;
    uf: string;
    address: string;
    ie: string;
    nire: string;
    email: string;
    avatar?: string;
    cnpj: string;
    owner: UserDTO


}