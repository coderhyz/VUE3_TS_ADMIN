// 用于操作token的工具函数
// 获取token
export const Get_Token = () => {
    return localStorage.getItem("Token") || "";
}
// 设置token
export const Set_Token = (token: string) => {
    localStorage.setItem("Token", token);
}
// 删除token
export const Remove_Token = () => {
    localStorage.removeItem("Token");
}