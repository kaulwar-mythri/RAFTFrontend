import { Account } from "./Account";
import { Role } from "./Role";
export interface User {
    id: number,
    name: string,
    employeeId: number,
    emailId: string,
    role: Role,
    accounts: Array<Account>
}
