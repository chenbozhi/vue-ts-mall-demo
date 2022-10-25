<template>
  <div>
    <el-tree
        :data="authority_list"
        show-checkbox
        node-key="roleId"
        :check-strictly="true"
        :default-checked-keys="authority"
        ref="tree_ref"
        :props="{
          children: 'roleList',
          label: 'name'
        }"
    />
    <el-button @click="changeAuthority">确认修改</el-button>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, toRefs} from 'vue';
import {useRoute} from "vue-router";
import {AuthorityPage} from "@/type/authority";
import {getAuthorityList} from "@/request/api";

export default defineComponent({
  setup () {

    onMounted(() => {
      getAuthorityList().then(res => {
        authority_data.authority_list = res.data.data
      })
    })
    const route = useRoute()   // 当前活跃的路由
    const params: any = route.params
    const authority_data = reactive(
        new AuthorityPage(params.id, params.authority)
    )

    const changeAuthority = () => {
      console.log(authority_data.tree_ref.getCheckedKeys()
          .sort(
              function (a: number, b:number){
                return a - b
              }
          )
      )
      // 传给后台, 后台去进行修改
    }

    return {
      ...toRefs(authority_data),
      changeAuthority
    }
  }
})
</script>

<style scoped>

</style>