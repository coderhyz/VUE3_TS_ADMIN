import request from '@/utils/request'
import type { AttrCategoryResponseData, AttrInfoResponseData } from './type'
//商品属性接口
const ATTR_API = {
    //一级分类请求地址
    C1_URL: "/admin/product/getCategory1",
    //二级分类请求地址
    C2_URL: "/admin/product/getCategory2",
    //三级分类请求地址
    C3_URL: "/admin/product/getCategory3",
    // 获取分类下已有的属性与属性值
    ATTR_INFO_URL: "/admin/product/attrInfoList",
    // 添加或者修改属性与属性值
    ADD_OR_UPDATE_ATTR_URL: "/admin/product/saveAttrInfo",
    // 删除属性与属性值
    DELETE_ATTR_URL: "/admin/product/deleteAttr/"
}
//获取一级分类数据
export const reqCategory1List = () => {
    return request.get<any, AttrCategoryResponseData>(ATTR_API.C1_URL)
}
//获取二级分类数据
export const reqCategory2List = (category1Id: number | string) => {
    return request.get<any, AttrCategoryResponseData>(`${ATTR_API.C2_URL}/${category1Id}`)
}
//获取三级分类数据
export const reqCategory3List = (category2Id: number | string) => {
    return request.get<any, AttrCategoryResponseData>(`${ATTR_API.C3_URL}/${category2Id}`)
}
/**
 * 商品基础属性接口
 */
// 获取分类下已有的属性与属性值
/**
 * @param category1Id 一级分类id
 * @param category2Id 二级分类id
 * @param category3Id 三级分类id
 */
export const reqAttrInfoList = (category1Id: number | string, category2Id: number | string, category3Id: number | string) => {
    return request.get<any, AttrInfoResponseData>(`${ATTR_API.ATTR_INFO_URL}/${category1Id}/${category2Id}/${category3Id}`)
}
// 添加或者修改属性与属性值
export const reqAddOrUpdateAttr = (data: any) => {
    return request.post<any, any>(ATTR_API.ADD_OR_UPDATE_ATTR_URL, data)
}
// 删除属性与属性值
export const reqDeleteAttr = (attrId: number | string) => {
    return request.delete<any, any>(`${ATTR_API.DELETE_ATTR_URL}${attrId}`)
}