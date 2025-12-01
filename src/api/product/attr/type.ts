// 接口基础返回数据
export interface ResponseData {
    code: number;
    message: string;
    ok: boolean;
}
// 商品分类接口返回数据类型
export interface AttrCategoryResponseData extends ResponseData {
    data: AttrCategoryData[];
}
// 商品分类数据类型
export interface AttrCategoryData {
    id: number;
    name: string;
}
// 商品属性值
export interface AttrValue {
    attrId: number;
    id: number;
    valueName: string;
}
export type attrValueList = AttrValue[]
export interface Attr {
    attrName: string;
    attrValueList: attrValueList;
    categoryId: number;
    categoryLevel: number;
    id: number;
}
// 接口返回响应的属性与属性值数据类型
export interface AttrInfoResponseData extends ResponseData {
    data: Attr[];
}