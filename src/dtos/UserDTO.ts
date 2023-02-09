import { CompanyDTO } from "./CompanyDTO";

export type UserDTO = {
    id: string;
    name: string;
    company: CompanyDTO
    email: string;
    avatar: string;
    admin: boolean;
    role?: string;
}