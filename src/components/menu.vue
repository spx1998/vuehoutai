<template>
    <!--TODO:    详情显示图片；-->
    <div style="margin: 10px">
        <div class="header">
            <b>菜品管理</b>
            <el-button type="primary" style="float:right;height:40px;margin:20px 50px" @click="newDishForm=true">新增菜品
            </el-button>
        </div>
        <el-dialog title="新菜品" width="35%" :visible.sync="newDishForm">
            <el-form :model="form">
                <el-form-item label="菜品名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜品介绍" :label-width="formLabelWidth">
                    <el-input v-model="form.introduce" type="textarea" autosize auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜品分类" prop="status" :label-width="formLabelWidth">
                    <el-select v-model="form.type" placeholder="选择分类">
                        <el-option
                                v-for="item in type"
                                :key="item.typeID"
                                :label="item.name"
                                :value="item.typeID">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜品单价" :label-width="formLabelWidth">
                    <el-input v-model="form.price" auto-complete="off">
                        <span slot="suffix">元</span>
                    </el-input>
                </el-form-item>
                <el-form-item label="会员价" :label-width="formLabelWidth">
                    <el-input v-model="form.vPrice" auto-complete="off">
                        <span slot="suffix">元</span>
                    </el-input>
                </el-form-item>
                <el-form-item label="上传图片" :label-width="formLabelWidth">
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :before-upload="beforeUpload"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="1"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="newDishForm = false">取 消</el-button>
                <el-button type="primary" @click="newDish">确 定</el-button>
            </div>
        </el-dialog>
        <el-table
                :data="tableData"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="dishID"
                    label="编号"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="供应状态"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="maxQuantity"
                    label="供应量/份"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="单价/元"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="vPrice"
                    label="会员价/元"
                    width="220">
            </el-table-column>
            <el-table-column
                    prop="detail">
                <template slot-scope="scope">
                    <el-button type="primary" @click="getDetail(scope.row)">详情</el-button>
                    <el-button type="danger" @click="deleteWarning(scope.row)">删除</el-button>
                </template>

            </el-table-column>
        </el-table>
        <el-dialog title="菜品详情" :visible.sync="dishDetail" width="35%">
            <el-form :model="form2" ref="form2">
                <el-form-item>
                    <div style="text-align:center">
                        <img :src="picUrl" alt="" :onerror=errorImg height="180" width="180">
                    </div>
                </el-form-item>
                <el-form-item label="菜品编号" prop="id" :label-width="formLabelWidth">
                    <el-input v-model="form2.id" auto-complete="off" :disabled="true" :placeholder=dishID></el-input>
                </el-form-item>
                <el-form-item label="菜品名称" prop="name" :label-width="formLabelWidth">
                    <el-input v-model="form2.name" auto-complete="off" :placeholder=dishName></el-input>
                </el-form-item>
                <el-form-item label="菜品介绍" prop="introduce" :label-width="formLabelWidth">
                    <el-input v-model="form2.introduce" auto-complete="off" autosize
                              :placeholder=dishIntroduce></el-input>
                </el-form-item>
                <el-form-item label="菜品分类" prop="status" :label-width="formLabelWidth">
                    <el-select v-model="form2.type" :placeholder=dishType>
                        <el-option
                                v-for="item in type"
                                :key="item.typeID"
                                :label="item.name"
                                :value="item.typeID">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜品状态"  prop="status" :label-width="formLabelWidth">
                    <el-select v-model="form2.status" placeholder="选择状态">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜品供应量" prop="quantity" :label-width="formLabelWidth">
                    <el-input v-model="form2.quantity" auto-complete="off" :placeholder=dishQuantity></el-input>
                </el-form-item>
                <el-form-item label="菜品单价" prop="price" :label-width="formLabelWidth">
                    <el-input v-model="form2.price" auto-complete="off" :placeholder=dishPrice>
                        <span slot="suffix">元</span>
                    </el-input>
                </el-form-item>
                <el-form-item label="会员价" prop="vPrice" :label-width="formLabelWidth">
                    <el-input v-model="form2.vPrice" auto-complete="off" :placeholder=dishVPrice>
                        <span slot="suffix">元</span>
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dishDetail = false">取 消</el-button>
                <el-button type="primary" @click="updateDish">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import Vue from 'vue';
    // 要保证取到
    let dish;
    export default {
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
                newDishForm: false,
                dishDetail: false,
                form: {
                    name: '',
                    introduce: '',
                    price: '',
                    vPrice: '',
                },
                form2: {
                    id: '',
                    name: '',
                    introduce: '',
                    price: '',
                    vPrice: '',
                    quantity: '',
                    status: ''
                },
                formLabelWidth: '120px',
                tableData: [],
                fileList: [],
                dishID: '',
                dishName: '',
                dishIntroduce: '',
                dishPrice: '',
                dishVPrice: '',
                dishStatus: '',
                dishQuantity: '',
                picUrl: '',
                type: [],
                dishType: '',
                errorImg:'this.src="' + require('../assets/images/noPicture.png') + '"',
            }
        },

        mounted: function () {
            const that = this;
            this.$http.get("/dish/list",).then(function (res) {
                let data = JSON.parse(res.data.content);
                for (let i = 0; i < data.length; i++) {
                    if (data[i].status === 1) {
                        data[i].status = '不限量';
                        data[i].maxQuantity = '#';

                    }
                    if (data[i].status === 2) {
                        data[i].status = '限量';
                    }
                    if (data[i].status === 0) {
                        data[i].status = '不供应';
                        data[i].maxQuantity = '#';

                    }
                    if (data[i].maxQuantity === -1) {
                        data[i].maxQuantity = '#';
                    }
                }
                that.tableData = data;
            });
            this.$http.get("/dish/type").then(function (res) {
                let types = JSON.parse(res.data.content);
                ;
                that.type = types;
                console.log(types[0].name);
            })
        },
        methods: {
            handleRemove(file, fileList) {
                sessionStorage.setItem("url", "");
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`只能上传一张图片`);
            },
            beforeRemove(file, fileList) {

                return this.$confirm(`确定移除 ${file.name}？`);
            },
            beforeUpload(file) {
                let fd = new FormData();
                fd.append('picture', file, file.name);
                this.$http.post('/dish/picture', fd,).then(function (res) {
                    sessionStorage.setItem("url", res.data.content);
                })
            },
            newDish() {
                let that = this;
                let isInt;
                if (that.form.name === '' || that.form.price === '' || that.form.vPrice === '') {
                    that.$message.error("名称和价格不能为空！");
                    return;
                }
                if (isNaN(that.form.type)) {
                    that.$message.error("请选择菜品类型！");
                    return;
                }
                if (!isNaN(that.form.price) && that.form.price % 1 === 0 && !isNaN(that.form.vPrice) && that.form.vPrice % 1 === 0) {
                    isInt = true;
                } else {
                    that.$message.error("价格必须是整数！");
                }
                if (that.form.price < that.form.vPrice) {
                    that.$message.error("会员价应小于产品单价！");
                    isInt = false;
                } else {
                    console.log(that.form.price + "  " + that.form.vPrice);
                }
                if (isInt) {
                    this.$http.post("/dish/add",
                        {
                            'name': that.form.name,
                            'introduce': that.form.introduce,
                            'type': that.form.type,
                            'price': that.form.price,
                            'vPrice': that.form.vPrice,
                            'picUrl': sessionStorage.getItem("url")
                        },).then((res) => {
                        that.newDishForm = false;
                        sessionStorage.removeItem("url");
                        that.$router.go(0);
                    })

                }
            },
            getDetail(row) {
                if (this.$refs.form2 !== undefined) {
                    this.$refs.form2.resetFields();
                }
                let that = this;
                this.$http.get("/dish/" + row.dishID,).then(function (res) {
                    dish = JSON.parse(res.data.content);
                    that.dishID = dish.dishID;
                    that.dishName = dish.name;
                    that.dishIntroduce = dish.introduce;
                    that.dishPrice = dish.price;
                    that.dishVPrice = dish.vPrice;
                    that.dishStatus = dish.status;
                    that.dishQuantity = dish.maxQuantity;
                    that.picUrl = 'http://39.106.81.211:81/' + dish.picUrl;
                    for (let i = 0; i < that.type.length; i++) {
                        if (that.type[i].typeID === dish.type) {
                            that.dishType = that.type[i].name;
                        }
                    }
                });
                this.dishDetail = true;
            },
            updateDish() {
                let that = this;
                this.$http.post("/dish/update", {
                    dishID: dish.dishID,
                    name: that.form2.name === '' ? dish.name : that.form2.name,
                    introduce: that.form2.introduce === '' ? dish.introduce : that.form2.introduce,
                    type: that.form2.type,
                    price: that.form2.price === '' ? dish.price : that.form2.price,
                    vPrice: that.form2.vPrice === '' ? dish.vPrice : that.form2.vPrice,
                    status: that.form2.status === '' ? dish.status : that.form2.status,
                    maxQuantity: that.form2.quantity === '' ? dish.maxQuantity : that.form2.quantity
                },).then(
                    function (res) {
                        if (res.data.status === 'error') {
                            that.$message.error('更新菜品失败');
                        } else if (res.data.status === 'ok') {
                            that.$message({
                                    message: '更新成功',
                                    type: 'success'
                                }
                            );

                        }
                    }
                )
                this.dishDetail = false;
                setTimeout(function () {
                    that.$router.go(0);
                }, 150);

            },
            deleteWarning(row) {
                let it = this;
                this.$confirm('您确定要删除该菜品吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this;
                    this.$http.post('/dish/del', "id=" + row.dishID,).then(
                        function (res) {
                            if (res.data.status === 'ok') {
                                that.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            } else {
                                that.$message({
                                    type: 'error',
                                    message: '删除失败!'
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
    .header {
        margin: 0;
        background-color: rgb(245, 245, 245);
        color: #333;
        padding-left: 10px;
        line-height: 80px;
        height: 80px;

    }

</style>