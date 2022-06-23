import service from "@/request/index";
import {ILoginData} from "@/type/login";

// 登录接口
export function login(data: ILoginData) {
    return service({
        url: "/login",
        method: "POST",
        data
    })
}

// 商品列表接口
export function getGoodsList(){
    return service({
        url: "/getGoodsList",
        method: "GET"
    })
}

// 用户列表接口
export function getUserList(){
    return service({
        url: "/getUserList",
        method: "GET"
    })
}

// 角色列表接口
export function getRoleList(){
    return service({
        url: "/getRoleList",
        method: "GET"
    })
}

// 权限列表接口
export function getAuthorityList(){
    return service({
        url: "/getAuthorityList",
        method: "GET"
    })
}