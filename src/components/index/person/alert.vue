<template>
  <div>
    <el-dialog :title="childmenu.isup==true?'编辑':'添加'" :visible.sync="childmenu.isshow" @closed="rest">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限">
          <el-tree :data="treelist" :default-checked-keys="form.menus" show-checkbox node-key="id" :props="defaultProps"
            ref="keylist">
          </el-tree>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rest">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    personadd,
    personup,
    personinfo,
    menutree,
  } from '../../../util/http.js';
  export default {
    name: 'alert',
    props: ["childmenu", 'list'],
    data() {
      return {
        formLabelWidth: '100px',
        form: {
          rolename: '',
          menus: [],
          status: 2,
        },
        treelist: [],
        // treelist: [{
        //   id: 0,
        //   label: '系统设置',
        //   children: [{
        //     id: 8,
        //     label: '菜单管理',
        //   }, {
        //     id: 9,
        //     label: '角色管理',
        //   }, {
        //     id: 10,
        //     label: '管理员管理',
        //   }]
        // }, {
        //   id: 11,
        //   label: '商城管理',
        //   children: [{
        //       id: 12,
        //       label: '商品分类',
        //     },
        //     {
        //       id: 13,
        //       label: '商品规格',
        //     }, {
        //       id: 14,
        //       label: '商品管理',
        //     }, {
        //       id: 15,
        //       label: '会员管理',
        //     }, {
        //       id: 16,
        //       label: '轮播图管理',
        //     }, {
        //       id: 17,
        //       label: '秒杀活动',
        //     }
        //   ]
        // }],
        defaultProps: {
          children: 'children',
          label: 'title'
        }
      };
    },
    mounted() {
      menutree().then(res => {
           this.treelist=res.data.list;
      })
    },
    methods: {
      formempty() {
        this.form = {
          rolename: '',
          menus: [],
          status: 2,
        }
      },
      add() {
        
        if (this.childmenu.isup == true) {
          this.form.id = this.childmenu.id;
          this.form.menus = this.$refs.keylist.getCheckedKeys();
          personup(this.form).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.$parent.init();
             this.rest();
              this.formempty();
            }
          })
        } else {
          this.form.menus = this.$refs.keylist.getCheckedKeys();
          personadd(this.form).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.$parent.init();
             this.rest();
              this.formempty();
            }
          })
        }
      },
      changePid() {
        this.form.pid == 0 ? this.form.type = 1 : this.form.type = 2;
      },
      rest() {
        this.childmenu.isshow = false;
        this.childmenu.isup = false;
      },
      upload(id) {
        this.form = {};
        personinfo(id).then(res => {
          this.form = res.data.list;
          this.form.menus = res.data.list.menus.split(',').map(val => {
            return parseInt(val);
          })
        })
      }
    },
  };
</script>

<style lang="less" scoped>

</style>