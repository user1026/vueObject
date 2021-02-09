<template>
  <div class="goodlist">
    <el-table :data="list" style="width: 100%;margin-bottom: 20px;" row-key="id" border
      :tree-props="{children: 'children'}" >
      <el-table-column prop="id" label="商品编号" sortable width="120">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" sortable width="120">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="80">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="80">
      </el-table-column>
      <el-table-column  label="图片">
        <template slot-scope="scope">
          <img v-if="scope.row.img!=='null'" :src="scope.row.img" alt="#">
      </template>
      </el-table-column>
      <el-table-column label="是否新品" width="100">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnow===1">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖" width="100">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot===1">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
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
    goodsdel,
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
        
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          goodsdel(id).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.$parent.init();
            }
          })
        }).catch(() => {
          this.$message({
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
  width: 100px;
  height: auto;
  margin: 0 auto;
}
</style>