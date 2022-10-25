<template>
  <div >
    <el-form :inline="true" :model="selected_data" class="search-form">

      <el-form-item label="商品名称">
        <el-input v-model="selected_data.title" placeholder="请输入商品名称" />
      </el-form-item>

      <el-form-item label="商品详情">
        <el-input v-model="selected_data.introduce" placeholder="请输入商品详情" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSearchGoods()">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="showedDataList.compDataList" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="180" />
      <el-table-column prop="title" label="商品名称" width="180" />
      <el-table-column prop="introduce" label="商品详情" />
    </el-table>

    <el-pagination background
                   layout="prev, pager, next"
                   :total="selected_data.data_count"
                   :page-size="selected_data.single_page_size"
                   @current-change="currentChange"
                   @size-change="sizeChange"
    />
  </div>
</template>

<script lang="ts">
import { getGoodsList } from '@/request/api';
import {computed, defineComponent, onMounted, reactive, toRefs, watch} from 'vue';
import {GoodsPages, IGoods} from "@/type/goods";

export default defineComponent({
  setup () {
    const goods_data = reactive(new GoodsPages())

    // 获取全部商品数据, 因为多个地方使用,所以封装为方法
    const p_getGoodsList = () => {
      getGoodsList().then(res => {
        console.log('gg', res)
        goods_data.goods_list = res.data.data
        goods_data.selected_data.data_count = res.data.data.length
      })
    }

    onMounted(() => {
      p_getGoodsList()  // 获取全部商品数据
    })

    // 点击查询商品按钮时触发
    const onSearchGoods = () => {
      // console.log(goods_data.selected_data.title)
      // console.log(goods_data.selected_data.introduce)
      let search_res: IGoods[] = []  // 接受查询商品的结果
      if(goods_data.selected_data.title || goods_data.selected_data.introduce){
        if(goods_data.selected_data.title){
          search_res = goods_data.goods_list.filter((value) => {
            return value.title.indexOf(goods_data.selected_data.title) !== -1
          })
        }
        else {
          if(goods_data.selected_data.introduce){
            search_res = goods_data.goods_list.filter((value) => {
              return value.introduce.indexOf(goods_data.selected_data.introduce) !== -1
            })
          }
        }
      }
      else {
        search_res = goods_data.goods_list
      }
      goods_data.goods_list = search_res
      goods_data.selected_data.data_count = goods_data.goods_list.length
    }

    // 计算属性, 切割出实际上需要展示的数据
    const showedDataList = reactive({
      compDataList: computed(() => {
        return goods_data.goods_list.slice(
            (goods_data.selected_data.current_page - 1) * goods_data.selected_data.single_page_size,
            goods_data.selected_data.current_page * goods_data.selected_data.single_page_size,
        )
      })
    })

    // 当前页改变时触发
    const currentChange = (page: number) => {
      goods_data.selected_data.current_page = page
    }

    // 当单页数量改变时触发
    const sizeChange = (page_size: number) => {
      goods_data.selected_data.single_page_size = page_size
    }

    //watch 监听
    watch([() => goods_data.selected_data.title, () => goods_data.selected_data.introduce], () => {
      if(goods_data.selected_data.title === "" && goods_data.selected_data.introduce === ""){
        p_getGoodsList()
      }
    })
    return {
      ...toRefs(goods_data),
      onSearchGoods,
      currentChange,
      sizeChange,
      showedDataList
    }
  }
})
</script>

<style scoped>
  .search-form{
    padding: 10px 0 0 10px;
  }
</style>