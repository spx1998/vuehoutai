<template>
    <div style="margin: 10px">
        <div class="header" >
            <b > 个人中心</b>
        </div>
        <div class="flexLayout">
            <div class="left">
                <img src="../assets/images/user.png" style="height: 400px;margin: 90px 60px" >
            </div>
            <div class="right" style="margin: 180px 30px 0">
                <el-form :model="form" style="width: 400px">
                    <el-form-item label="用户名" :label-width="formLabelWidth">
                        <el-input v-model="form.name" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" :label-width="formLabelWidth">
                        <el-input v-model="form.phoneNumber" disabled autosize auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item style="margin: 0 90px">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="updatePwdForm(scope.row)">修改密码</el-button>
                            <i style="padding: 10px"></i>
                            <el-button type="danger" @click="logOut">退出登录</el-button>
                        </template>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-dialog  title="修改密码" :visible.sync="updatePwd" width="35%">
            <el-form :model="form2" ref="form2">
                <el-form-item label="原密码" :label-width="formLabelWidth">
                    <el-input type="password" v-model="form2.oldPwd"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" :label-width="formLabelWidth">
                    <el-input type="password" v-model="form2.newPwd"  autosize auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="再次输入" :label-width="formLabelWidth">
                    <el-input type="password" v-model="form2.repeat"  autosize auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updatePwd = false">取 消</el-button>
                <el-button type="primary" @click="changePwd">确 定</el-button>
            </div>
        </el-dialog>

    </div>

</template>

<script>
    import {Decrypt,Encrypt} from '../crypto';
    import Vue from 'vue';
    export default {
        data() {
            return {
                updatePwd:false,
                dishDetail:false,
                form: {
                    name: '',
                    phoneNumber:'',
                },
                formLabelWidth: '120px',
                tableData:[],
                form2:{
                    oldPwd:'',
                    newPwd:'',
                    repeat:''
                }
            }
        },

        mounted:function () {
            let that=this;
            this.$http.get("/info",).then(function (res) {
                let admin =JSON.parse( res.data.content);
                that.form.name=admin.name;
                that.form.phoneNumber=admin.phoneNumber;

            })
        },
        methods: {
            updatePwdForm(){
                this.form2.name=this.form.name;
                this.form2.phoneNumber=this.form.phoneNumber;
                this.updatePwd=true;
            },
            changePwd(){
                //TODO:  判断密码格式
                let that = this;
                if(that.form2.oldPwd===''||that.form2.newPwd===''||that.form2.repeat===''){
                    that.$message.error("请输入完整！");
                    that.form2=[];
                    return;
                }
                if(that.form2.newPwd!==that.form2.repeat){
                    that.$message.error("两次密码输入不一致！");
                    that.form2=[];
                    return;
                }
                this.$http.post("/admin/pwd","phoneNumber="+that.form2.phoneNumber+"&password="+Encrypt(that.form2.oldPwd)+"&newPwd="+Encrypt(that.form2.newPwd))
                    .then(function (res) {
                        if(res.data.status==='ok'){
                            that.$message({
                                type: 'success',
                                message: '修改成功!'
                            });
                        }
                        if(res.data.status==='error'){
                            that.$message({
                                type: 'error',
                                message: '修改失败!'
                            });
                        }
                        if(res.data.status==='wrong'){
                            that.$message({
                                type: 'error',
                                message: '原密码错误!'
                            });
                        }
                        setTimeout(function () {
                            that.$router.go(0);
                        },150)
                    }).catch();
            },
            logOut(){
                sessionStorage.removeItem("token");
                this.$router.replace('/');
            }
        }

    }
</script>
<style scoped>
    .header
    {
        margin: 0;
        background-color:rgb(245, 245, 245);
        color: #333;
        padding-left: 10px;
        line-height: 80px;
        height: 80px;

    }


    .flexLayout {

        display: flex;
        margin: 0;
        background-color: rgb(255, 255, 255);
        padding-left: 10px;
        line-height: 80px;
        height: 16cm;

    }

    .flexLayout .left {

        flex:0 0 200px;

        height: 100%;

    }

    .flexLayout .right {

        flex: 1;

        height: 100%;

    }
</style>