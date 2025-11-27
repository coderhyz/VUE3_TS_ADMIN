import request from '@/utils/request'
import type { getTrademarkResponseData, Trademark } from './type'
const API = {
    // 获取品牌列表的接口
    GET_TRADEMARK_LIST_URL: '/admin/product/baseTrademark/',
    ADD_TRADEMARK_URL: '/admin/product/baseTrademark/save',
    UPDATE_TRADEMARK_URL: '/admin/product/baseTrademark/update',
    DELETE_TRADEMARK_URL: '/admin/product/baseTrademark/remove/',
}
// 获取品牌列表的接口
export const reqGetTrademarkList = (page: number, limit: number) => {
    return request.get<any, getTrademarkResponseData>(API.GET_TRADEMARK_LIST_URL + `${page}/${limit}`)
}
export const reqAddTrademarkOrUpdateTrademark = (trademark: Trademark) => {
    return trademark.id ? request.put<any, any>(API.UPDATE_TRADEMARK_URL, trademark) : request.post<any, any>(API.ADD_TRADEMARK_URL, trademark)
}
// 删除品牌的接口
export const reqDeleteTrademark = (id: number) => {
    return request.delete<any, any>(API.DELETE_TRADEMARK_URL + `${id}`)
}
