import request from '@/utils/request'
//商品分类接口
const ATTR_API = {
    //一级分类请求地址
    C1_URL: "/admin/product/getCategory1",
    //二级分类请求地址
    C2_URL: "/admin/product/getCategory2",
    //三级分类请求地址
    C3_URL: "/admin/product/getCategory3",
}
//获取一级分类数据
export const reqCategory1List = () => {
    return request.get<any, any>(ATTR_API.C1_URL)
}
//获取二级分类数据
export const reqCategory2List = (category1Id: number | string) => {
    return request.get<any, any>(`${ATTR_API.C2_URL}/${category1Id}`)
}
//获取三级分类数据
export const reqCategory3List = (category2Id: number | string) => {
    return request.get<any, any>(`${ATTR_API.C3_URL}/${category2Id}`)
}