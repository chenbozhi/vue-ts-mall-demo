<template>
  <div>
    <el-form :inline="true" :model="selected_data" class="search-form">

      <el-form-item label="用户昵称">
        <el-input v-model="selected_data.nickName" placeholder="请输入用户昵称" />
      </el-form-item>

      <el-form-item label="用户角色">
        <el-select v-model="selected_data.role" class="m-2" size="large">
          <el-option
              :key="0"
              label="全部"
              :value="0"
          />
          <el-option
              v-for="item in role_with_auth_list"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSearchUser()">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="user_list" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="180" />
      <el-table-column prop="nickName" label="用户昵称" width="180" />
      <el-table-column prop="role" label="用户角色" >
        <template #default="scope">
          <el-button
              link
              type="primary"
              size="small"
              v-for="item in scope.row.role"
              :key="item.role"
          >
            {{item.roleName}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="操作" >
        <template #default="scope">
          <el-button
              link
              type="primary"
              size="small"
              @click="handleEditUser(scope.row)"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>

<!-- 编辑用户的弹出窗-->
  <el-dialog v-model="editShow" title="编辑用户信息">
    <el-form :model="editUser">
      <el-form-item label="用户昵称" label-width="120px">
        <el-input v-model="editUser.nickName" autocomplete="off" />
      </el-form-item>

      <el-form-item label="用户角色" label-width="120px">
        <el-select multiple v-model="editUser.role" class="m-2" size="large" placeholder="请选择角色">
          <el-option
              v-for="item in role_with_auth_list"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
          />
        </el-select>
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editShow = false">取消</el-button>
        <el-button type="primary" @click="ensureEditUser">修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, toRefs, watch} from 'vue';
import {getRoleList, getUserList} from "@/request/api";
import {IUser, UserPages} from "@/type/user";

export default defineComponent({
  setup () {
    const user_data = reactive(new UserPages())

    onMounted(() => {
      p_getUserList()  // 获取全部用户数据
      p_getRoleList()  // 获取全部角色数据
    })

    // 编辑用户弹窗
    const handleEditUser = (row: IUser) => {
      user_data.editShow = true
      user_data.editUser = {
        id: row.id,
        nickName: row.nickName,
        role: row.role.map((value) => value.role),
        userName: ""
      }
    }

    const ensureEditUser = () => {
      console.log(user_data.editUser)
      user_data.editShow = false
      let obj: any = user_data.user_list.find((value) => value.id === user_data.editUser.id)
      obj.nickName = user_data.editUser.nickName
      obj.role.splice(0, obj.role.length)  // 清除角色
      for(let item of user_data.role_with_auth_list){
        if(user_data.editUser.role.find((value) => value === item.roleId)){
          obj.role.push({
            role: item.roleId,  // 角色id
            roleName: item.roleName  // 角色名称
          })
        }
      }
    }

    // 获取全部用户数据, 因为多个地方使用,所以封装为方法
    const p_getUserList = () => {
      getUserList().then(res => {
        user_data.user_list = res.data.data
      })
    }

    // 获取全部角色数据, 因为多个地方使用,所以封装为方法
    const p_getRoleList = () => {
      getRoleList().then(res => {
        user_data.role_with_auth_list = res.data.data
      })
    }

    // 点击查询用户按钮时触发
    const onSearchUser = () => {
      let search_res: IUser[] = []  // 接受查询用户的结果
      if(user_data.selected_data.nickName || user_data.selected_data.role){
        if(user_data.selected_data.nickName){
          search_res = user_data.user_list.filter((value) => {
            return value.nickName.indexOf(user_data.selected_data.nickName) !== -1
          })
        }
        if(user_data.selected_data.role){
          search_res = user_data.selected_data.nickName ? search_res : user_data.user_list
          search_res = search_res.filter((value) => {
            return value.role.find((item) => item.role === user_data.selected_data.role)
          })
        }
      }
      else {
        search_res = user_data.user_list
      }
      user_data.user_list = search_res
    }

    // watch 监听
    watch([() => user_data.selected_data.nickName, () => user_data.selected_data.role], () => {
      if(user_data.selected_data.nickName === "" || user_data.selected_data.role === 0){
        p_getUserList()
      }
    })

    return {
      ...toRefs(user_data),
      onSearchUser,
      handleEditUser,
      ensureEditUser
    }
  }
})
</script>

<style scoped>
  .search-form{
    padding: 10px 0 0 10px;
  }
</style>