import { HierarchyTag } from "./HierarchyTag";
import { User } from "./User";
export interface Account {
    account_id:number;
    name: string;
    parentId: number;
    HierarchyTag: HierarchyTag;
    userRoleDTOS: Set<User>
}