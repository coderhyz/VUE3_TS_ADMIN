// 品牌ts类型
export interface ResponseData {
    code: number,
    message: string | null,
    ok: boolean
}
// 品牌所含属性
export interface Trademark {
    createTime?: string,
    id?: number,
    logoUrl: string,
    tmName: string,
    updateTime?: string
}
// 品牌数组
export type TrademarkList = Trademark[]
// 响应的品牌类型
export interface getTrademarkResponseData extends ResponseData {
    data: {
        records: TrademarkList,
        current: number,
        pages: number,
        searchCount: boolean,
        size: number,
        total: number
    }
}
