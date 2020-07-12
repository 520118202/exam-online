<template>
	<div id="grade">
		<el-table :data="pagination.results" style="width: 100%" v-loading="loading" border>
			<el-table-column type="index" width="50">
			</el-table-column>
			<el-table-column prop="creat_time" label="评卷时间" sortable>
				<template slot-scope="scope">
					<i class="el-icon-time"></i>
					<span style="margin-left: 10px">{{ scope.row.create_time.replace('T', ' ').substring(0, 19) }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="exam.name" label="考试名称" width="300">
				<template slot-scope="scope">
					<el-popover trigger="hover" placement="top">
						<p>考试名称: {{ scope.row.exam.name }}</p>
						<p>考试日期: {{ scope.row.exam.exam_date }}</p>
						<p>考试时长: {{ scope.row.exam.total_time }}</p>
						<p>所属专业: {{ scope.row.exam.major }}</p>
						<p>考试须知: {{ scope.row.exam.tips }}</p>
						<div slot="reference" class="name-wrapper">
							<el-tag size="medium">{{ scope.row.exam.name }}</el-tag>
						</div>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column prop="score" label="得分" width="150" sortable>
				<template slot-scope="scope">
					<i class="el-icon-trophy"></i>
					<span style="margin-left: 10px">{{ scope.row.score }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="exam.exam_date" label="考试时间" width="180" sortable>
				<template slot-scope="scope">
					<i class="el-icon-time"></i>
					<span style="margin-left: 10px">{{ scope.row.exam.exam_date }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="score" label="筛选" width="200" :filters="[{ text: '及格', value: 'pass' }, { text: '不及格', value: 'fail' }]"
			 :filter-method="filterScore" filter-placement="bottom-end">
				<template slot-scope="scope">
					<el-tag v-if="scope.row.score >= 60" type="success" disable-transitions>及格</el-tag>
					<el-tag v-if="scope.row.score < 60" type="warning" disable-transitions>不及格</el-tag>
				</template>
			</el-table-column>
		</el-table>
		<Pagination :count="pagination.count" @size-change="handleSizeChange" @current-change="handleCurrentChange"></Pagination>
	</div>
</template>

<script>
	import Pagination from '@/components/Pagination.vue'
	export default {
		data() {
			return {
				loading: false,
				page: 1,
				page_size: 5,
				pagination: {
					count: null,
					next: null,
					previous: null,
					results: []
				}
			}
		},
		components: {
			Pagination
		},
		created() {
			this.getGradeInfo()
			this.loading = true
		},
		methods: {
			//获取成绩信息
			getGradeInfo() {
				this.$axios(`api/grades/?format=json`, {
					params: {
						page: this.page,
						page_size: this.page_size,
						student_id: this.$store.state.student.id,
					}
				}).then(res => {
					this.pagination = res.data
					this.loading = false
					// console.log(this.pagination)
				}).catch(error => {
					console.log(error)
				})
			},
			//过滤及格和不及格
			filterScore(value, row) {
				if (value === 'pass') {
					return row.score >= 60;
				} else if (value === 'fail') {
					return row.score < 60
				} else {
					return row.score > 0
				}
			},
			//改变每页条数
			handleSizeChange(val) {
				// console.log(`每页 ${val} 条`);
				this.page_size = val
				this.getGradeInfo()
			},
			//跳转到多少页
			handleCurrentChange(val) {
				// console.log(`当前页: ${val}`);
				this.page = val
				this.getGradeInfo()
			}
		}
	}
</script>

<style>

</style>
