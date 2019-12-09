<template>
    <div>
    <div class="body">
        <div class="dowebok">
            <div class="logo"></div>
            <div class="form-item">
                <input id="username" type="text" autocomplete="off" placeholder="用户名">
                <p class="tip1">请输入用户名</p>
            </div>
            <div class="form-item">
                <input id="password" type="password" autocomplete="off" placeholder="登录密码">
                <p class="tip2">请输入密码</p>
            </div>
            <div class="form-item"><button id="submit" @click="onsubmit">登 录</button></div>
            <div class="reg-bar">
                <a class="forget" href="javascript:">忘记密码</a>
                <p class="tip3">请与root用户联系，修改密码</p>
            </div>
        </div>
    </div>
    <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
        <span>用户名或密码错误！</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
    </div>
</template>

<script>
    import {Decrypt,Encrypt} from '../crypto'
    import Vue from 'vue';
    export default {
        name: "login.vue",
        methods:{
            onsubmit:function()
            {
                $('.tip1').hide();
                $('.tip2').hide();
                $('.tip3').hide();
                var username = document.getElementById('username').value;
                if(username==null||username===''){
                    $('.tip1').show();
                    return false;
                }
                var pwd = document.getElementById("password").value;
                if(pwd==null||pwd==='') {
                    $('.tip2').show()
                    return false;
                }

                var that = this;
                this.$http
                    .post('/login',"username="+username+"&password="+Encrypt(pwd))
                    .then(function(res)
                    {
                        if(res.data.status==='ok'){
                            sessionStorage.setItem("token",res.data.content);
                            Vue.prototype.$token=res.data.content;
                            that.$router.push('owner');
                        }else if(res.data.status==='wrong'){
                            document.getElementById("password").value='';
                            that.dialogVisible=true;

                        }
                    })
                    .catch(function (error) { // 请求失败处理
                        console.log(error);
                    });

            }
        },
        data(){
            return {
                dialogVisible: false
        }
        },
        mounted:function () {
            $(function () {
                $('input').val('')
                $('.forget').on('click',function (){
                    $('.tip3').show()
                })
            })
        }
    }
</script>

<style scoped>
    .body
    {
        margin: 0;
        padding: 0;
        position: fixed;
        top:0;
        left:0;
        height: 100%;
        width: 100%;
        background: #fff url(../assets/images/backgroud.jpg) 50% 50% no-repeat;
        background-size: cover;
    }
    .dowebok { position: absolute; left: 50%; top: 50%; width: 430px; height: 550px; margin: -300px 0 0 -215px; border: 1px solid #fff; border-radius: 20px; overflow: hidden;}
    .logo { width: 104px; height: 104px; margin: 50px auto 80px; background: url(../assets/images/login.png) 0 0 no-repeat; }
    .form-item { position: relative; width: 360px; margin: 0 auto; padding-bottom: 30px;}
    .form-item input { width: 288px; height: 48px; padding-left: 70px; border: 1px solid #fff; border-radius: 25px; font-size: 18px; color: #fff; background-color: transparent; outline: none;}
    .form-item button { width: 360px; height: 50px; border: 0; border-radius: 25px; font-size: 18px; color: #1f6f4a; outline: none; cursor: pointer; background-color: #fff; }
    #username { background: url(../assets/images/emil.png) 20px 14px no-repeat; }
    #password { background: url(../assets/images/password.png) 23px 11px no-repeat; }
    .tip1 { display: none; position: absolute; left: 20px; top: 43px; font-size: 14px; color: #f50; }
    .tip2 { display: none; position: absolute; left: 20px; top: 43px; font-size: 14px; color: #f50; }
    .tip3 { display: none; position: absolute; left: 20px; top: 486px; font-size: 14px; color: #f50; }

    .reg-bar { width: 360px; margin: 20px auto 0; font-size: 14px; overflow: hidden;}
    .reg-bar a { color: #fff; text-decoration: none; }
    .reg-bar a:hover { text-decoration: underline; }
    .reg-bar .reg { float: left; }
    .reg-bar .forget { float: right; }
    .dowebok ::-webkit-input-placeholder { font-size: 18px; line-height: 1.4; color: #fff;}
    .dowebok :-moz-placeholder { font-size: 18px; line-height: 1.4; color: #fff;}
    .dowebok ::-moz-placeholder { font-size: 18px; line-height: 1.4; color: #fff;}
    .dowebok :-ms-input-placeholder { font-size: 18px; line-height: 1.4; color: #fff;}

    @media screen and (max-width: 500px) {
        * { box-sizing: border-box; }
        .dowebok { position: static; width: auto; height: auto; margin: 0 30px; border: 0; border-radius: 0; }
        .logo { margin: 50px auto; }
        .form-item { width: auto; }
        .form-item input, .form-item button, .reg-bar { width: 100%; }
    }
</style>