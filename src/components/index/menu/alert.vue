<template>
  <div>
    <el-dialog :title="childmenu.isup==true?'编辑':'添加'" :visible.sync="childmenu.isshow">
      <el-form :model="form" :rules="rules">
        <el-form-item label="菜单名称" prop="title" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择上级菜单" @change="changePid()">
            <el-option label="顶级菜单" value="0"></el-option>
            <el-option :label="item.title" :value="item.id" v-for="item in list" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" :label-width="formLabelWidth" v-if="form.type==1">
          <el-select v-model="form.icon" placeholder="请选择菜单图标">
            <el-option v-for="item in icon" :value="item" :key="item"><i :class="item"></i></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <el-select v-model="form.url" placeholder="请选择菜单地址">
            <el-option v-for="item in url" :value="'/'+item.path" :key="item.path"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2">
          </el-switch>
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
    mapGetters
  } from "vuex";
  import {
    menuadd,
    menuup,
    menuinfo
  } from '../../../util/http.js';
  export default {
    name: 'alert',
    props: ["childmenu", 'list'],
    data() {
      return {
        formLabelWidth: '100px',
        form: {
          pid: 0,
          title: "",
          type: 1,
          icon: '',
          url: '',
          status: 2,
        },
        computed: {
          // ...mapGetters({
          //   mform: 'menu/form',
          // }),
          // form() {
          //   return this.mform;
          // },
        },
        watch: {
          // form(val) {
          //   if(this.childmenu.isup){
          //     console.log(val);
          //     this.form=val;
          //   }
          // },
        },
        rules: {
          title: [{
              required: true,
              message: '请输入活动名称',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ]
        },
        icon: ['el-icon-s-tools', 'el-icon-s-goods', 'el-icon-info', 'el-icon-s-custom', 'el-icon-s-cooperation',
          'el-icon-s-help'
        ],
        url: [],

      };
    },
    created() {

    },
    mounted() {
      this.url = this.$router.options.routes[1].children;
    },
    methods: {
       ...mapGetters({
         upform: 'menu/form',
       }),
      formempty() {
        this.form = {
          pid: 0,
          title: "",
          type: 1,
          icon: '',
          url: '',
          status: 2,
        }
      },
      add() {
        let _this = this;
        if (this.childmenu.isup == true) {
          this.form.id = this.childmenu.id;
          menuup(this.form).then(res => {
            if (res.data.code == 200) {
              _this.$message({
                message: '修改成功',
                type: 'success'
              });
              _this.$parent.init();
            }
          })
        } else {
          menuadd(this.form).then(res => {
            if (res.data.code == 200) {
              _this.$message({
                message: '添加成功',
                type: 'success'
              });
              _this.$parent.init();
              this.childmenu.isshow = false;
              _this.formempty();
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
       upload(id){
         menuinfo(id).then(res=>{
             this.form=res.data.list;
             this.form.id=id;
         })
       }
    },
  };
</script>

<style lang="less" scoped>

</style>