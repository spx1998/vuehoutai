<template>
    <div style="margin: 10px">
        <div class="header" >
            <b >分类管理</b>
            <el-button type="primary" style="float:right;height:40px;margin:20px 50px" @click="newTable">新增分类</el-button>

        </div>
        <el-table
                :data="typeData"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="typeID"
                    label="编号"
                    width="570">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="名称"
                    width="600">
            </el-table-column>

            <el-table-column
                    prop="operate" >
                <template slot-scope="scope">
                    <el-button  type="danger" @click="deleteWarning(scope.row)" >删除</el-button>
                </template>

            </el-table-column>
        </el-table>

    </div>

</template>

<script>
    let dish;
    export default {
        name: "type.vue",
        data() {
            return {
                shows:[],
                formLabelWidth: '120px',
                typeData: [],
            }
        },

        mounted: function () {
            let that = this;
            this.$http.get("/dish/type", {
            }).then(function (res) {
                that.typeData = JSON.parse(res.data.content);
            })
        },
        methods: {
            newTable() {
                let that = this;
                this.$prompt('请输入名称', '新建分类', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(
                    ({value}) => {
                        that.$http.post('/dish/type/add', "name=" + value).then(
                            function (res) {
                                if (res.data.status === 'ok') {
                                    that.$message({
                                        type: 'success',
                                        message: '新增分类成功'
                                    });
                                } else {
                                    that.$message({
                                        type: 'error',
                                        message: '新增失败'
                                    });
                                }
                                setTimeout(function () {
                                    that.$router.go(0);
                                }, 400);
                            }
                        );
                    }).catch(() => {
                });
            }
            ,
            deleteWarning(row, index) {
                console.log(index);
                console.log(this.shows);
                console.log(this.shows[index]);
                let it = this;
                this.$confirm('您确定要删除该餐桌吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this;
                    this.$http.post('/dish/type/delete', "id=" + row.typeID, ).then(
                        function (res) {
                            if (res.data.status === 'ok') {
                                that.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                that.shows=2;
                            } else {
                                that.$message({
                                    type: 'error',
                                    message: '删除失败!'
                                });
                            }
                            setTimeout(function () {
                                it.$router.go(0);
                            }, 100);

                        }
                    )
                }).catch(() => {

                });
            },

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