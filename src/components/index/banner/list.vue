<template>
    <div>
      <el-table :data="list" style="width: 100%;margin-bottom: 20px;" row-key="id" border
        :tree-props="{children: 'children'}" >
        <el-table-column prop="id" label="编号" sortable width="180">
        </el-table-column>
        <el-table-column prop="title" label="标题" sortable width="180">
        </el-table-column>
        <el-table-column  label="图片">
          <template slot-scope="scope">
            <img v-if="scope.row.img!=='null'" :src="scope.row.img" alt="#">
        </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
            <el-button type="info" v-else>禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="up(scope.row.id)">编辑</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
    
    import {
      bannerdel,
    } from '../../../util/http.js'
    export default {
      name: 'list',
      props: ['list','childmenu'],
      data() {
        return {
  
        };
      },
      mounted() {
  
      },
      methods: {
         up(id) {
            this.$parent.sendlist(id);
        },
        del(id) {
          let _this = this;
          _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
           bannerdel(id).then(res => {
              if (res.data.code == 200) {
                _this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                _this.$parent.init();
              }
            })
          }).catch(() => {
            _this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
  
        }
      },
    };
  </script>
  
  <style lang="less" scoped>
  img{
    width: 100%;
    height: auto;
  }
  </style>