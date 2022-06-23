<template>
  <div class="common-layout">
    <TopNavBar/>
    <div class="main-container">
      <LeftSideBar :menu_list="need_list"/>
      <div style="flex: 1;">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TopNavBar from "@/components/TopNavBar.vue";
import LeftSideBar from "@/components/LeftSideBar.vue";
import {useRouter} from "vue-router";
export default defineComponent({
  components: {
    TopNavBar,
    LeftSideBar
  },
  setup () {
    const router = useRouter()
    const need_list = router.getRoutes().filter(v => v.meta.isShow)
    //console.log(need_list)
    return {
      need_list
    }
  }
})
</script>

<style lang="scss">
  .main-container{
    display: flex;
  }
</style>
