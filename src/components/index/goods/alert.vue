<template>
  <div>
    <el-dialog :title="childmenu.isup==true?'编辑':'添加'" :visible.sync="childmenu.isshow"  @opened="opened" @closed="rest">
      {{form}}
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid" placeholder="请选择" @change="changefirst">
            <el-option :label="item.catename" :value="item.id" v-for="item in first" :key="item.id"  ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid" placeholder="请选择" >
            <el-option :label="item.catename" :value="item.id" v-for="item in second" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="goodsname" :label-width="formLabelWidth">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" prop="market_price" :label-width="formLabelWidth">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change="changeImg2"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品规格" :label-width="formLabelWidth">
          <el-select v-model="form.specsid" placeholder="请选择" @change="changeattr">
            <el-option :label="item.specsname" :value="item.id" v-for="item in attrslist" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="formLabelWidth">
          <el-select v-model="form.specsattr" placeholder="请选择" multiple >
            <el-option :label="item" :value="item" v-for="item in attrs" :key="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2">
          </el-switch>
        </el-form-item>
        <el-form-item label="商品描述" prop="description" :label-width="formLabelWidth">
          <div id="editor" v-if="childmenu.isshow"></div>
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
  import E from "wangeditor";
  import {
    mapGetters,
    mapActions
  } from "vuex";
  import {
    catelist,
    goodsadd,
    goodsup,
    goodsinfo,
    
  } from '../../../util/http.js';
  export default {
    name: 'alert',
    props: ["childmenu", 'list'],
    data() {
      return {
        formLabelWidth: '100px',
        form: {
          first_cateid: '',
          second_cateid: "",
          goodsname: '',
          price: '',
          market_price: '',
          img: null,
          description: '',
          specsid: '',
          specsattr: '',
          isnew: 2,
          ishot: 2,
          status: 2,
        },
        imageUrl: '',

        second: [],
        attrs:[],
      }
    },
    computed: {
      ...mapGetters({
        first: 'cate/getcatelist',
        attrslist:'specs/getspecslist'
      })
    },
    watch: {

    },

    mounted() {
      
    },
    methods: {
      ...mapActions({
        cateList: 'cate/cateList',
        specslist:'specs/reqspecslist'
      }),
      formempty() {
        this.form = {
          first_cateid: '',
          second_cateid: "",
          goodsname: '',
          price: '',
          market_price: '',
          img: null,
          description: '',
          specsid: '',
          specsattr: '',
          isnew: 2,
          ishot: 2,
          status: 2,
        }
        this.imageUrl='';
        this.attrs=[];
        this.second=[];
      },
      add() {
        this.form.description=this.editor.txt.html();
        if (this.childmenu.isup == true) {
          this.form.id = this.childmenu.id;
         
          goodsup(this.form).then(res => {
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
          goodsadd(this.form).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.$parent.init();
              this.childmenu.isshow = false;
              this.formempty();
            }
          })
        }
      },
      changefirst() {
        this.second=[];
        catelist(this.form.first_cateid).then(res => {
          if (res.data.code==200) {
            this.second = res.data.list;
          }
        })
      },
      changeattr(){
        let at=this.attrslist.find(item=>item.id==this.form.specsid)
        this.attrs=at?at.attrs:[];
      },
     
      changeImg2(e) {
        let file = e.raw;
        //判断
        this.imageUrl = URL.createObjectURL(file)
        this.form.img = file;
      },
      rest() {
        this.childmenu.isshow = false;
        this.childmenu.isup = false;
      },
      upload(id) {
        goodsinfo(id).then(res => {
          this.form = res.data.list;
          this.imageUrl='http://localhost:3000'+this.form.img;
          this.form.specsattr=this.form.specsattr.split(',')
          this.form.id = id;
         this.changefirst();
        })
      },
      opened() {
      //创建编辑器
      this.editor = new E("#editor");
      this.editor.create();
      //赋值
      this.editor.txt.html(this.form.description)
    },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
  };
</script>

<style lang="less" scoped>
  .el-upload,
  .avatar-uploader-icon {
    border: 1px dotted black !important;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  #editor{
    width: 100%;
  }
</style>