<template>
  <div>
    <my-header></my-header>

    <div class="m-content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>

        <el-form-item label="摘要" prop="description">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <edit v-model="ruleForm.content"></edit>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import MdEditor from 'md-editor-v3' // 引入支持Vue3以上版本的富文本编辑器
import 'md-editor-v3/lib/style.css'
export default {
  name: 'BlogEdit.vue',
  components: {
    edit: MdEditor,
    'my-header': Header
  },
  data() {
    return {
      ruleForm: {
        id: '',
        title: '',
        description: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
        ],
        description: [{ required: true, message: '请输入摘要', trigger: 'blur' }],
        content: [{ trequired: true, message: '请输入内容', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          this.$http
            .post('/blog/edit', this.ruleForm, {
              headers: {
                Authorization: localStorage.getItem('token')
              }
            })
            .then((res) => {
              console.log(res)
              _this.$alert('操作成功', '提示', {
                confirmButtonText: '确定',
                callback: () => {
                  _this.$router.push('/blogs')
                }
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  async created() {
    const blogId = this.$route.params.blogId
    console.log(blogId)
    // const _this = this
    if (blogId) {
      // 常规的axios写法
      // this.$http.get('/blog/' + blogId).then((res) => {
      //   const blog = res.data.data
      //   _this.ruleForm.id = blog.id
      //   _this.ruleForm.title = blog.title
      //   _this.ruleForm.description = blog.description
      //   _this.ruleForm.content = blog.content
      // })
      // 解构赋值接收请求结果
      const { data: res } = await this.$http.get('/blog/' + blogId)
      if (res.code != 200) {
        // 此处返回状态码非200的情况会直接被拦截器拦截，如果必须要执行该段逻辑，可以去掉后置拦截，或者在拦截器中规定好不需要拦截的状态码，例如针对某些要特殊处理的返回407，拦截器中放行，代码中if(res.code == 407)进行处理
        console.log(res.msg)
      }
      const blog = res.data
      this.ruleForm.id = blog.id
      this.ruleForm.title = blog.title
      this.ruleForm.description = blog.description
      this.ruleForm.content = blog.content
    }
  }
}
</script>

<style scoped>
.m-content {
  text-align: center;
}
</style>
