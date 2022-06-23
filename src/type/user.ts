import {IRole, IRoleWithAuth} from "@/type/role";

// 用户接口
export interface IUser {
    id: number,  // 用户id
    nickName: string,  // 用户昵称
    role: IRole[],   // 用户角色, 可能有多个,所以是数组
    userName: string  // 用户名
}

// 用户查询接口
export interface IQueryUser{
    nickName: string,  // 用户别名
    role: number  // 角色编号
}

// 用户编辑接口
export interface IUserEdit {
    id: number,  // 用户id
    nickName: string,  // 用户昵称
    role: number[],   // 用户角色
    userName: string  // 用户名
}

// 用户具体展示数据
export class UserPages{
    // 没有做分页是因为,用户和角色数据往往比较少
    selected_data: IQueryUser = {
        nickName: "",
        role: 0
    }
    user_list: IUser[] = []   // 用户列表
    role_with_auth_list: IRoleWithAuth[] = []   // 角色列表
    editShow = false  // 是否显示编辑用户弹出窗
    // 编辑用户时用到的对象
    editUser: IUserEdit = {
        id: 0,
        nickName: "",
        role: [],
        userName: ""
    }
}