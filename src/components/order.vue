<template>
    <div style="margin: 10px">
        <div class="header" >
            <b >订单管理</b>
        </div>
        <el-table
                :data="tableData"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="orderId"
                    label="编号"
                    width="250">
            </el-table-column>
            <el-table-column
                    prop="tableId"
                    label="桌号"
                    width="280">
            </el-table-column>
            <el-table-column
                    prop="memId"
                    label="会员"
                    width="280">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="总价"
                    width="280">
            </el-table-column>
            <el-table-column
                    prop="detail" >
                <template slot-scope="scope">
                    <el-button type="primary" @click="getDetail(scope.row)">详情</el-button>
                    <el-button type="danger" @click="deleteOrder(scope.row)">删除</el-button>
                </template>

            </el-table-column>
        </el-table>
        <el-dialog  title="订单详情" :visible.sync="orderDetail">
            <el-table :data="orderData">
                <el-table-column property="id"  width="200" v-if="shows===1"></el-table-column>
                <el-table-column property="orderId" label="菜品编号" width="200"></el-table-column>
                <el-table-column property="dishId" label="菜品编号" width="150"></el-table-column>
                <el-table-column property="dishName" label="菜品名称" width="150"></el-table-column>
                <el-table-column property="price" label="菜品价格"></el-table-column>
                <el-table-column
                        prop="delete" >
                    <template slot-scope="scope">
                        <el-button type="danger" @click="deleteDish(scope.row)">删除</el-button>
                    </template>

                </el-table-column>
            </el-table>
        </el-dialog>
    </div>

</template>

<script>
    // 要保证取到
    let dish;
    export default {
        name:"order.vue",
        data() {
            return {
                newDishForm: false,
                orderDetail:false,
                formLabelWidth: '120px',
                tableData:[],
                orderData:[],
                fileList:[],
                dishID:'',
                dishName:'',
                dishIntroduce:'',
                dishPrice:'',
                dishVPrice:'',
                dishStatus:'',
                dishQuantity:'',
                picUrl: '',
                shows:2
            }
        },

        mounted:function () {
            var that=this;
            this.$http.get("/order/list",).then(function (res) {
                    let data=JSON.parse(res.data.content);
                for(let i=0;i<data.length;i++){
                    if(data[i].memId===0){
                        data[i].memId='无';
                    }
                }
                    that.tableData=data;
            })
        },
        methods: {
            getDetail(row){
                let that=this;
                this.$http.get("/order/"+row.orderId,).then(function (res) {
                    that.orderData= JSON.parse(res.data.content);
                });
                this.orderDetail=true;
            },
            deleteDish(row){
                let that=this;
                this.$confirm('您确定要删除该菜品吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('/order/change',"id="+row.id+"&orderId="+row.orderId+"&dishId="+row.dishId,  ).then(
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
                                that.$router.go(0);
                            },100);
                        }
                    )
                }).catch(() => {

                });
            },
            deleteOrder(row){
                let it = this;
                this.$confirm('您确定要删除该订单吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that=this;
                    this.$http.post('/order/delete',"id="+row.orderId,  ).then(
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