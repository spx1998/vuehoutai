<template>
    <div style="margin: 10px">
        <div class="header" >
            <b >用户管理</b>
            <el-button type="primary" style="float:right;height:40px;margin:20px 65px" @click="newAdminForm=true">新增管理员</el-button>
        </div>
        <el-dialog title="新增管理员" width="35%" :visible.sync="newAdminForm">
            <el-form :model="form">
                <el-form-item label="管理员名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" :label-width="formLabelWidth">
                    <el-input v-model="form.phoneNumber" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="newAdminForm = false">取 消</el-button>
                <el-button type="primary" @click="newAdmin">确 定</el-button>
            </div>
        </el-dialog>
        <el-table
                :data="adminData"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="adminID"
                    label="编号"
                    width="250">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="名称"
                    width="280">
            </el-table-column>
            <el-table-column
                    prop="phoneNumber"
                    label="电话号码"
                    width="280">
            </el-table-column>
            <el-table-column
                    prop="role"
                    label="角色"
                    width="280">
            </el-table-column>
            <el-table-column
                    prop="detail" >
                <template slot-scope="scope">
                    <el-button type="primary" @click="getDetail(scope.row)">修改信息</el-button>
                    <el-button type="danger" @click="deleteWarning(scope.row)">删除</el-button>
                </template>

            </el-table-column>
        </el-table>
        <el-dialog width="35%" title="管理员信息" :visible.sync="adminDetail">
            <el-form :model="form2" ref="form2">
                <el-form-item label="管理员编号" prop="id" :label-width="formLabelWidth" >
                    <el-input v-model="form2.id" auto-complete="off" :disabled="true" :placeholder=dishID></el-input>
                </el-form-item>
                <el-form-item label="管理员名称" prop="name" :label-width="formLabelWidth" >
                    <el-input v-model="form2.name" auto-complete="off" :placeholder=dishName></el-input>
                </el-form-item>
                <el-form-item label="管理员号码" prop="phoneNumber":label-width="formLabelWidth"  >
                    <el-input v-model="form2.phoneNumber" auto-complete="off" :placeholder=dishIntroduce></el-input>
                </el-form-item>
                <el-form-item label="管理员密码" prop="password" :label-width="formLabelWidth"  >
                    <el-input v-model="form2.password" >
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="adminDetail = false">取 消</el-button>
                <el-button type="primary" @click="updateAdmin">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import {Decrypt,Encrypt} from '../crypto';
    import Vue from 'vue';
    let admin={};
    export default {
        name:"user.vue",
        data() {
            return {
                options: [
                    {
                        value: '0',
                        label: '不供应'
                    }, {
                        value: '1',
                        label: '不限量供应'
                    }, {
                        value: '2',
                        label: '限量供应'
                    }],
                newAdminForm: false,
                adminDetail:false,
                form: {
                    name: '',
                    phoneNumber:''
                },
                form2: {
                    id:'',
                    name: '',
                    phoneNumber:'',
                    password:''
                },
                formLabelWidth: '120px',
                adminData:[],
                fileList:[],
                dishID:'',
                dishName:'',
                dishIntroduce:'',
                dishPrice:'',
                dishVPrice:'',
                dishStatus:'',
                dishQuantity:'',
                picUrl: ''
            }
        },

        mounted:function () {
            var that=this;
            this.$http.get("/admin/list",).then(function (res) {
                var data=JSON.parse(res.data.content);
                for(let i=0;i<data.length;i++)
                {
                   if(data[i].role===0){
                       data[i].role='root';
                   }
                   if(data[i].role===1){
                       data[i].role='admin';
                   }
                }
                that.adminData=data;
            })
        },
        methods: {
            newAdmin(){
                let that=this;
                if(that.form.name===''||that.form.phoneNumber===''){
                    that.$message.error("管理员信息不可为空！");
                    return;
                }
                if(that.form.name.length>10){
                    that.$message.error("用户名过长！");
                    return;
                }
                if(!(/^1[3456789]\d{9}$/.test(that.form.phoneNumber))){
                    that.$message.error("请输入正确的电话号码！");
                    return;
                }
                this.$http.post("/admin/add","name="+that.form.name+"&phone="+that.form.phoneNumber).then(function (res) {
                    if(res.data.status==='wrong'){
                        that.$message.error("名称或手机号已存在！");
                    }else {
                        that.newAdminForm = false;
                        that.$router.go(0);

                    }
                })
            },
            getDetail(row){
                if (this.$refs.form2 !== undefined) {
                    this.$refs.form2.resetFields();
                }

                admin.id=this.form2.id=row.adminID;
                admin.name=this.form2.name=row.name;
                admin.phoneNumber=this.form2.phoneNumber=row.phoneNumber;
                this.adminDetail=true;
            },
            updateAdmin(){
                let that = this;
                if(!(/^1[3456789]\d{9}$/.test(that.form2.phoneNumber))){
                    that.$message.error("请输入正确的电话号码！");
                    return;
                }
                this.$http.post("/admin/update","id="+admin.id
                +"&name="+that.form2.name
                +"&phone="+that.form2.phoneNumber
                    +"&password="+Encrypt(that.form2.password)
                ,).then(
                    function (res) {
                        if(res.data.status==='error'){
                            that.$message.error('更新管理员信息失败');
                        }
                        else if(res.data.status==='wrong'){
                            that.$message.error('名称或手机号已存在');
                        }
                        else if(res.data.status==='ok'){
                            that.$message({
                                    message:'更新成功',
                                    type:'success'
                                }
                            );

                        }
                    }
                );
                this.adminDetail=false;
                setTimeout(function () {
                    that.$router.go(0);
                },300)

            },
            deleteWarning(row){
                let it = this;
                this.$confirm('您确定要删除该管理员吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that=this;
                    this.$http.post('/admin/delete',"id="+row.adminID,  ).then(
                        function (res) {
                            if(res.data.status==='ok'){
                                that.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            }else {
                                that.$message({
                                    type: 'error',
                                    message: '删除失败!'
                                });
                            }
                            setTimeout(function () {
                                it.$router.go(0);
                            },150);

                        }
                    )
                }).catch(() => {

                });
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

</style>