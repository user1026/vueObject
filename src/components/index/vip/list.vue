<template>
  <div>
    <el-table :data="list" style="width: 100%;margin-bottom: 20px;" row-key="id" border
      :tree-props="{children: 'children'}">
      <el-table-column prop="uid" label="用户编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" sortable width="180">
      </el-table-column>
      <el-table-column prop="phone" label="电话号">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="up(scope.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script>
  export default {
    name: 'list',
    props: ['list', 'childmenu'],
    data() {
      return {
        
      };
    },
    mounted() {
      
    },
    methods: {
      up(id) {
        this.$parent.upload(id);
      },
    },
  };
</script>

<style lang="less" scoped>

</style>