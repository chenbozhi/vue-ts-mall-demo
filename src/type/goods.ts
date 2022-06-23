// 商品接口
export interface IGoods{
    userId: number,   // 商品归属用户id
    id: number,   // 商品id
    title: string,   // 商品标题
    introduce: string   // 商品介绍
}

// 商品查询接口
export interface IQueryGoods extends IGoods, IPage{
}

// 商品具体展示数据
export class GoodsPages{
    // 被选择的数据, 查询时用
    selected_data: IQueryGoods = {
        userId: 0,
        id: 0,
        title: "",
        introduce: "",
        current_page: 1,
        data_count: 0,
        single_page_size: 5
    }
    // 展示的商品数据
    goods_list: IGoods[] = []
}