// 分页接口
interface IPage{
    single_page_size: number,   // 一页有多少条数据
    data_count: number,  // 总共有多少数据
    current_page: number  //当前页码
}