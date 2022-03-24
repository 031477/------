<template>
  <div class="box">
    <div class="demo-input-suffix">
      <el-input
        placeholder="请输入书名"
        prefix-icon="el-icon-search"
        v-model="bookName"
        style="max-width: 200px"
      >
      </el-input>
      <el-button  icon="el-icon-search"
          @click="searchbook(bookName)" type="primary" plain>搜索</el-button>
    </div>
    <!-- <el-button @click="showdata()" style="margin-left: 30px"
          >全部图书</el-button
        > -->
    <div class="increase">
      <el-button  type="primary" @click="dialogFormVisible = true" style="margin-right: 30px"
        >增加图书</el-button>
    </div>
    <div class="table">
      <el-table
        height="500px"
        :data="tableData"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="bookname" label="书名" sortable width="300">
        </el-table-column>
        <el-table-column prop="author" label="作者" width="300">
        </el-table-column>
        <el-table-column prop="publisher" label="出版社" width="300">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
                     <el-button
            size="mini"
            type="success"
            @click="create(scope.$index, scope.row)"
            >借书</el-button
          >
            <el-button size="mini"  @click="updatebook(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
               @click="open(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="增加图书"
      :visible.sync="dialogFormVisible"
      :modal="false"
    >
      <el-form :model="bookForm">
        <el-form-item label="书名" prop="bookname" :label-width="formLabelWidth">
          <el-input v-model="bookForm.bookname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author" :label-width="formLabelWidth">
          <el-input v-model="bookForm.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版社" prop="publisher" :label-width="formLabelWidth">
          <el-input v-model="bookForm.publisher" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false,resetForm(bookForm)">取 消</el-button>
        <el-button
          type="primary"
          @click="addBook(bookForm),resetForm(bookForm)"
          >确 定</el-button>
      </div>
    </el-dialog>
     <!-- 修改图书 -->
     <el-dialog
      title="修改图书"
      :visible.sync="Isupdate"
      :modal="false"
    >
      <el-form :model="bookForm">
        <el-form-item label="书名" prop="bookname" :label-width="formLabelWidth">
          <el-input v-model="updateInfo.bookname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author" :label-width="formLabelWidth">
          <el-input v-model="updateInfo.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版社" prop="publisher" :label-width="formLabelWidth">
          <el-input v-model="updateInfo.publisher" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Isupdate = false">取 消</el-button>
        <el-button
          type="primary"
          @click="updateBook(updateInfo)"
          >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    resetForm(a){
      a.bookname="";
      a.author="";
      a.publisher=""
    },
    //图书展示
    showdata() {
      this.$axios.get("http://127.0.0.1:7001/api/book/show").then((res) => {
        this.tableData = res.data;
      });
    },
    
    //增加图书
    addBook(a) {
      console.log(a);
      this.$axios.post("http://127.0.0.1:7001/api/book", a).then((res) => {
        console.log(a,"1111");
        if (res.data.data.code == 200) {
          this.$message.success({ message: "增加成功", center: true });
        } else {
          this.$message.error({ message: "增加失败", center: true });
        }
        this.dialogFormVisible = false;
        this.showdata();
      });
    },
     //删除图书
    open(row) {
      console.log(row, "a");
      // this.deletebookdata = a;
      this.$confirm("此操作将删除该书籍, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deletebook(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            center: true,
          });
        });
    },
    deletebook(row) {
      console.log(row);
      this.$axios
        .delete("http://127.0.0.1:7001/api/book/delete?_id=" + row._id)
        .then((res) => {
          console.log(res);
          if (res.data.data.code == 200) {
            this.$message.success({ message: "删除成功", center: true });
          } else {
            this.$message.error({ message: "删除失败", center: true });
          }
          this.showdata();
        });
    },
    //修改图书
    updatebook(index, row) {
      this.Isupdate = true;
      this.updateInfo = row;
      console.log(row);
    },
    updateBook(aa) {
      this.$axios
        .put("http://127.0.0.1:7001/api/book/update?", aa)
        .then((res) => {
          console.log(res);
          if (res.data.data.code == 200) {
            this.$message.success({ message: "修改完成", center: true });
            this.Isupdate = false;
            this.showdata();
          } else {
            this.$message.error({ message: "修改失败", center: true });
          }
        });
    },
    // 借书
     create(index, row) {
      console.log(row);
      var test = row;
      this.$axios
        .post("http://127.0.0.1:7001/api/userbook/create", test)
        .then((res) => {
          console.log(res);
          if (res.data.data.code == 200) {
            this.$message.success({ message: "借书成功", center: true });
          } else {
            this.$message.error({ message: "借书失败", center: true });
          }
        });
      this.$axios
        .delete("http://127.0.0.1:7001/api/book/delete?_id=" + test._id)
        .then((res) => {
          console.log(res);
          this.showdata();
        });
    },

     //图书查找
    searchbook(a) {
      this.$axios
        .get("http://127.0.0.1:7001/api/book/findname?name=" + a)
        .then((res) => {
          console.log(res);
          if (res.data === "没有") {
            this.$message.error({ message: "没有数据", center: true });
          } else {
            this.$message.success({ message: "查找完成", center: true });
          }
          this.tableData = res.data;
        });
    },

    // handleEdit(index, row) {
    //   console.log(index, row);
    // },
    // handleDelete(index, row) {
    //   console.log(index, row);
    // },
    handleClick(row) {
      console.log(row);
    },
  },
  mounted() {
    this.showdata();
  },
  data() {
    return {
       updateInfo: {
        bookname: "",
        author: "",
        publisher: "",
      },
      Isupdate: false,
      deletebookdata: "",
      tableData: [],
      bookForm: {
        bookname: "",
        author: "",
        publisher: "",
        // introduction: "",
        // image: "",
      },
      formLabelWidth: "120px",
      visible: false,
      dialogFormVisible: false,
      bookName: "",
    };
  },
  created() {},
};
</script>

<style>
.table {
  position: relative;
  top: 100px;
}
.demo-input-suffix {
  position: absolute;
  top: 100px;
}
.increase {
  position: absolute;
  right: 0px;
  top: 100px;
}
/* .cell{
  display: inline-block;
  height: 30px;
      overflow:auto;
} */
</style>
