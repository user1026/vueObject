<template>
  <div>
    <el-dialog :title="childmenu.isup==true?'编辑':'添加'" :visible.sync="childmenu.isshow" @closed="rest">
      {{form}}{{Time}}
      <el-form :model="form" :rules="rules">
        <el-form-item label="活动名称" prop="title" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" :label-width="formLabelWidth">
          <el-date-picker v-model="Time" value-format="yyyy-MM-dd" type="daterange" range-separator="至"
            start-placeholder="开始月份" end-placeholder="结束月份">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid"  @change="changefirst" placeholder="请选择上级菜单">
            <el-option :label="item.catename" :value="item.id" v-for="item in getfirst" :key="item.id"
             ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid" @change="changesecond" placeholder="请选择上级菜单">
            <el-option :label="item.catename" :value="item.id" v-for="item in second"  :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="form.goodsid" placeholder="请选择上级菜单">
            <el-option :label="item.goodsname" :value="item.id" v-for="item in goods"  :key="item.id"></el-option>
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
    mapGetters,
    mapActions,
  } from "vuex";
  import {
    seckadd,
    seckup,
    seckinfo,
    catelist,
    goodslist,
  } from '../../../util/http.js';
  export default {
    name: 'alert',
    props: ["childmenu", 'list'],
    data() {
      return {
        formLabelWidth: '100px',
        form: {
          title: "",
          begintime: '',
          endtime: '',
          first_cateid: '',
          second_cateid: '',
          goodsid: '',
          status: 2,
        },
        Time: [],
        second: [],
        goods: [],
        rules: {
          title: [{
              required: true,
              message: '请输入活动名称',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 20,
              message: '长度在 2 到 20 个字符',
              trigger: 'blur'
            }
          ]
        },
      };
    },
    created() {

    },
    mounted() {

    },
    computed: {
      ...mapGetters({
        getfirst: 'cate/getcatelist',
        getspecslist: 'specs/getspecslist'
      })
    },
    methods: {
      ...mapActions({
        cateList: 'cate/cateList',
        specslist: 'specs/reqspecslist',
      }),
      formempty() {
        this.form = {
          title: "",
          begintime: '',
          endtime: '',
          first_cateid: '',
          second_cateid: '',
          goodsid: '',
          status: 2,
        }
        
      },
      add() {
        // this.form.begintime = new Date(this.Time[0]).getTime()
        // this.form.endtime = new Date(this.Time[1]).getTime()
        this.form.begintime = this.Time[0]
        this.form.endtime = this.Time[1]
        if (this.childmenu.isup == true) {
          this.form.id = this.childmenu.id;
         
          seckup(this.form).then(res => {
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
          seckadd(this.form).then(res => {
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
      changefirst() {
        console.log(11)
        this.second = [];
        catelist(this.form.first_cateid).then(res => {
          if (res.data.code == 200) {
            this.second = res.data.list;
          }
        })
      },
      rest() {
        this.childmenu.isshow = false;
        this.childmenu.isup = false;
      },
      upload(id) {
       seckinfo(id).then(res => {
          this.form = res.data.list;
          this.Time[0]=this.form.begintime;
          this.Time[1]=this.form.endtime;
          this.form.id = id;
          this.changefirst();
          this.changesecond();
          this.$set(this.Time);
        })
      },
      changesecond(){
        goodslist().then(res=>{
          if(res.data.code==200){
            this.goods = res.data.list.filter(val=>{
              return val.second_cateid==this.form.second_cateid;
             })
          }
        })
      },
    },
  };
</script>

<style lang="less" scoped>

</style>