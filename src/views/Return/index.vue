<template>
  <div class="container">
    <el-table :data="tabledata" stripe>
      <el-table-column prop="bookname" label="书名" width="300">
      </el-table-column>
      <el-table-column prop="author" label="作者" width="300">
      </el-table-column>
      <el-table-column
        prop="publisher"
        label="出版社"
        width="300"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="(abc = true), getDetail(scope.row)"
            ></el-button
          > -->
          <!-- <div class="paging">
            <el-pagination background layout="prev, pager, next" :total="1000">
            </el-pagination>
          </div> -->
          <!-- <el-dialog
            title=""
            :visible.sync="abc"
            width="30%"
            :modal="false"
          >
            <span id="book">
              <td>
                <img :src="oDetails.image" class="image" />
                {{ oDetails.introduction }}
              </td>
            </span>
            <span slot="footer" class="dialog-footer"> </span>
          </el-dialog> -->
          <el-button size="mini" type="success" @click="returnBook(scope.row)"
            >还书</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tabledata: [],
      abc: false,
      oDetails: "",
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.initBook();
  },
  methods: {
    initBook() {
      this.$axios.get("http://127.0.0.1:7001/api/userbook/show").then((res) => {
        this.tabledata = res.data;
        // console.log(res);
      });
    },
    returnBook(row) {
      console.log(row, "---"),
        this.$axios
          .delete(
            "http://127.0.0.1:7001/api/userbook/lendDelete?_id=" + row._id
          )
          .then((res) => {
            // console.log(res, "zj");
            var test = res.data.res;
            // console.log(test, "--ys-");
            this.initBook();
            this.$axios
              .post("http://127.0.0.1:7001/api/book", test)
              .then((res) => {
                if (res.data.data.code == 200) {
                  this.$message.success({ message: "还书成功", center: true });
                } else {
                  this.$message.error({ message: "增加失败", center: true });
                }
                // this.$router.push("/read");
              });
          });
    },
    getDetail(row) {
      console.log(row);
      this.oDetails = row;
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 50px;
}
.container >>> .el-table th.el-table__cell.is-leaf {
  border-bottom: 1 px solid #ebeef5;
  text-align: center;
}
.container >>> .el-table .el-table__cell {
  text-align: center;
}
.container >>> .el-dialog__header {
  padding: 20px 20px 0px;
  display: flex;
}
.container >>> #book {
  text-align: left;
}
.image {
  height: 25%;
  width: 25%;
  margin-right: 15px;
  float: left;
}
</style>
