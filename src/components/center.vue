<!-- TODO: 权限管理；图片；数据统计；菜品推荐；菜品分类; 密码加密-->
<template>
    <div>
        <div class="flexLayout">
        <div class="left">

                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b" style="position: absolute;height: 100%;width:200px" @tab-click="handleClick">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>个人中心</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title"></template>
                            <el-menu-item index="1-1" @click="itemClicked">个人中心</el-menu-item>
                        </el-menu-item-group>

                    </el-submenu>
                    <el-submenu index="2" >
                        <template slot="title" >
                            <i class="el-icon-menu"></i>
                            <span>餐厅管理</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title"></template>
                            <el-menu-item index="1-2" @click="itemClicked">菜品管理</el-menu-item>
                            <el-menu-item index="1-3" @click="itemClicked">订单管理</el-menu-item>
                            <el-menu-item index="1-4" @click="itemClicked">餐桌管理</el-menu-item>
                            <el-menu-item index="1-5" @click="itemClicked">分类管理</el-menu-item>
                            <el-menu-item index="1-6" @click="itemClicked">数据统计</el-menu-item>
                        </el-menu-item-group>

                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title"></template>
                            <el-menu-item index="1-7" @click="itemClicked">用户管理</el-menu-item>
                        </el-menu-item-group>

                    </el-submenu>


                </el-menu>
        </div>
        <div class="right">
            <div>
                <transition name="move" mode="out-in">
                    <!--这里的router-view用来渲染子页面-->
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>

    </div>
</template>

<script type="text/javascript">
    export default {
        // data() {
        // },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClick: function (key, keyPath) {
                console.log(key, keyPath);
            },
            itemClicked(component)
            {
                if(component.index==='1-1')
                    this.$router.push('owner');
                if(component.index==='1-2')
                this.$router.push('menu');
                if(component.index==='1-3')
                this.$router.push('order');
                if(component.index==='1-4')
                this.$router.push('table');
                if(component.index==='1-5')
                    this.$router.push('type');
                if(component.index==='1-6')
                    this.$router.push('stats');
                if(component.index==='1-7')
                    this.$router.push('user');
            }
        }
    }

</script>

<style scoped>

    @import "../assets/css/nav.css";
    @import "../assets/font/iconfont.css";
    .flexLayout {

        display: flex;

        height: 100%;

        width: 100%;

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