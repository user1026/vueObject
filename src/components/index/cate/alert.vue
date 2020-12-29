<template>
  <div>
    <el-dialog :title="childmenu.isup==true?'编辑':'添加'" :visible.sync="childmenu.isshow">
      {{form}}
      <el-form :model="form">
        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择上级菜单">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option :label="item.catename" :value="item.id" v-for="item in list" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" prop="catename" :label-width="formLabelWidth">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="form.pid!==0" label="图片" prop="title" :label-width="formLabelWidth">
          <el-upload class="avatar-uploader"  action="#"
          :http-request="httpRequest" :show-file-list="false"  :on-change="changeImg2"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
    cateadd,
    cateup,
    cateinfo
  } from '../../../util/http.js';
  export default {
    name: 'alert',
    props: ["childmenu", 'list'],
    data() {
      return {
        formLabelWidth: '100px',
        form: {
          pid: 0,
          catename: "",
          img: null,
          status: 2,
        },
        imageUrl:'',
      };
    },
    
    methods: {
      formempty() {
        this.form = {
          pid: 0,
          catename: "",
          img: {},
          status: 2,
        }
        this.imageUrl='';
      },
      httpRequest(){},
      add() {
       
        if (this.childmenu.isup == true) {
          //this.form.id = this.childmenu.id;
          cateup(this.form).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.$parent.init();
              this.childmenu.isshow = false;
              this.childmenu.isup = false;
              this.formempty();
            }
          })
        } else {
          cateadd(this.form).then(res => {
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
      
      rest() {
        this.childmenu.isshow = false;
        this.childmenu.isup = false;
      },
      upload(id) {
        cateinfo(id).then(res => {
          this.form = res.data.list;
          this.form.img='http://localhost:3000'+this.form.img;
          this.form.id = id;
        })
      },
      changeImg2(e){
        let file=e.raw;
        //判断
        this.imageUrl=URL.createObjectURL(file)
        this.form.img=file;
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
</style>