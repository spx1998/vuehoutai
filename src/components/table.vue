<template>
    <div style="margin: 10px">
        <div class="header" >
            <b >餐桌管理</b>
            <i style="padding:10px"></i>共有<span style="color: red">{{sum}}</span>桌，<span style="color: red">{{sumAvailable}}</span>桌可用，<span style="color: red">{{sumUsing}}</span>桌正在使用，<span style="color: red">{{sumStop}}</span>桌已停用
            <el-button type="primary" style="float:right;height:40px;margin:20px 50px" @click="newTable">新增餐桌</el-button>

        </div>
        <el-table
                :data="tableData"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="编号"
                    width="390">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="使用状态"
                    width="390">
            </el-table-column>
            <el-table-column
                    prop="num"
                    label="座数"
                    width="390">
            </el-table-column>
            <el-table-column
                    prop="operate" >
                <template slot-scope="scope">
                    <el-button  type="danger" @click="stopWarning(scope.row,scope.$index)" v-if="shows[scope.$index]===1">停用</el-button>
                    <el-button  type="success" @click="resumeWarning(scope.row)" v-if="shows[scope.$index]===2">启用</el-button>
                </template>

            </el-table-column>
        </el-table>

    </div>

</template>

<script>
    let dish;
    export default {
        name: "table.vue",
        data() {
            return {
                shows:[],
                sum: '',
                sumAvailable: '',
                sumUsing: '',
                sumStop: '',
                formLabelWidth: '120px',
                tableData: [],
            }
        },

        mounted: function () {
            let that = this;
            this.$http.get("/table/list", {
            }).then(function (res) {
                let data = JSON.parse(res.data.content);
                let sum2 = 0;
                let sum3 = 0;
                let sum4 = 0;
                for (let i = 0; i < data.length; i++) {

                    if (data[i].status === -1) {
                        data[i].status = '不可使用';
                        sum4++;
                        that.shows[i]=2;

                    }
                    if (data[i].status === 0) {
                        data[i].status = '可使用';
                        sum2++;
                        that.shows[i]=1;

                    }
                    if (data[i].status === 1) {
                        data[i].status = '使用中';
                        sum3++;
                        that.shows[i]=1;

                    }
                }
                that.sum = sum2 + sum3 + sum4;
                that.sumAvailable = sum2;
                that.sumUsing = sum3;
                that.sumStop = sum4;
                that.tableData = data;
            })
        },
        methods: {
            newTable() {
                let that = this;
                this.$prompt('请输入座数', '新餐桌', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^[1-9]\d*$/,
                    inputErrorMessage: '请输入一个整数'
                }).then(
                    ({value}) => {
                        that.$http.post('/table/add', "number=" + value).then(
                            function (res) {
                                if (res.data.status === 'ok') {
                                    that.$message({
                                        type: 'success',
                                        message: '新增餐桌成功'
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
            stopWarning(row,index) {
                console.log(index);
                console.log(this.shows);
                console.log(this.shows[index]);
                let it = this;
                this.$confirm('您确定要停用该餐桌吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this;
                    this.$http.post('/table/cancel', "id=" + row.id, ).then(
                        function (res) {
                            if (res.data.status === 'ok') {
                                that.$message({
                                    type: 'success',
                                    message: '停用成功!'
                                });
                                that.shows=2;
                            } else {
                                that.$message({
                                    type: 'error',
                                    message: '停用失败!'
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
            resumeWarning(row) {
                let it = this;
                this.$confirm('您确定要启用该餐桌吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this;
                    this.$http.post('/table/resume', "id=" + row.id, ).then(
                        function (res) {
                            if (res.data.status === 'ok') {
                                that.$message({
                                    type: 'success',
                                    message: '启用成功!'
                                });
                                that.shows=1;
                            } else {
                                that.$message({
                                    type: 'error',
                                    message: '启用失败!'
                                });
                            }
                            setTimeout(function () {
                                it.$router.go(0);
                            }, 150);

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