<template>
  <div class="app-container">
    <el-button type="primary" @click="newbuild" plain>新建</el-button>
    <el-table v-loading="tableLoading" @row-dblclick="openDetail" :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div>姓名:{{ props.row.name}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="createon" :formatter="formatter" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="adress" label="地址">
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <el-row>
        <el-form>
          <el-form-item label="名字" prop="name">
            <el-input v-model="formValidae.name" placeholder="请输入名字"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="adress">
            <el-input v-model="formValidae.adress" placeholder="请输入地址"></el-input>
          </el-form-item>
          <el-form-item label="日期" prop="createon">
            <el-date-picker v-model="formValidae.createon" style="width:100%" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="enterInsert">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { parseTime } from "@/utils";
import { Message } from 'element-ui'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      tableData: [],
      dialogVisible: false,
      formValidae: {},
      currentPage: 1,
      total: 0,
      pageSize: 10,
      tableLoading: false
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
    this.listLoading = false
  },
  methods: {
    openDetail(row, event) {
      this.formValidae = row;
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      this.tableLoading = true;
      this.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.tableLoading = true;
      this.currentPage = val;
      this.fetchData();
    },
    formatter(row, column) {
      if (column.property === "createon") {
        return parseTime(row[column.property], "{y}-{m}-{d}");
      }
    },
    handleClose() {
      this.dialogVisible = false;
      this.formValidae = {};
    },
    // return parseTime(row[column.property], "{y}-{m}-{d}");
    fetchData() {
      this.tableLoading = true;
      this.$store
        .dispatch("TableSelectAll", { currentPage: this.currentPage, pageSize: this.pageSize })
        .then(response => {
          this.tableData = response.tableinfoList;
          this.total = response.total;
          this.tableLoading = false;
        })
        .catch(() => {
          console.log("no");
        });
    },
    newbuild() {
      this.dialogVisible = true;
    },
    enterInsert() {
      this.$store
        .dispatch("TableInsert", this.formValidae)
        .then(response => {
          this.dialogVisible = false;
          Message.success("新建成功")
          this.fetchData();
        })
        .catch(() => {
          console.log("no");
        });
    }
  }
}
</script>
