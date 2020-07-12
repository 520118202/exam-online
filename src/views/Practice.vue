<template>
	<div id="practice">

		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>组卷模块</span>
			</div>
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="单选题:">
					<el-slider v-model="form.choice_number" :step="1" :max="10" show-stops></el-slider>
				</el-form-item>
				<el-form-item label="填空题:">
					<el-slider v-model="form.fill_number" :step="1" :max="10" show-stops></el-slider>
				</el-form-item>
				<el-form-item label="判断题:">
					<el-slider v-model="form.judge_number" :step="1" :max="10" show-stops></el-slider>
				</el-form-item>
				<el-form-item label="编程题:">
					<el-slider v-model="form.program_number" :step="1" :max="10" show-stops></el-slider>
				</el-form-item>
				<el-form-item label="难易度:">
					<el-rate v-model="form.level" :texts="level" show-text></el-rate>
				</el-form-item>
			</el-form>
			<el-button type="primary" @click="toAnswer">生成试卷并开始答题</el-button>
		</el-card>
		<el-table :data="pagination.results" style="width: 61%" v-loading="loading" border>
			<el-table-column type="index" width="50">
			</el-table-column>
			<el-table-column prop="creat_time" label="练习时间" width="250px" sortable>
				<template slot-scope="scope">
					<i class="el-icon-time"></i>
					<span style="margin-left: 10px">{{ scope.row.create_time.replace('T', ' ').substring(0, 19) }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="练习名称" width="250px">
			</el-table-column>
			<el-table-column>
				<template slot-scope="scope">
					<router-link target="_blank" :to="{path:'/record',query:{practice_id:scope.row.id}}">
						<el-button type="text" size="small">查看记录</el-button>
					</router-link>
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
				form: {
					choice_number: 1,
					fill_number: 1,
					judge_number: 1,
					program_number: 1,
					level: 1,
				},
				exam: {
					name: '模拟测试',
					total_time: 120
				},
				practice: {},
				level: ["入门", "简单", "普通", "较难", "困难"],
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
			this.getPracticeInfo()
			this.loading = true
		},
		methods: {
			toAnswer() {
				//用localStorage存储考试信息和试卷信息
				axios.post(`api/practices/`, {
					name: '模拟练习',
					student_id: this.$store.state.student.id,
				}).then(res => {
					console.log(res.data); //处理成功的函数 相当于success
					this.practice = res.data;
					localStorage.removeItem('practice');
					localStorage.removeItem('paper');
					sessionStorage.removeItem("isPractice")
					localStorage.setItem("practice", JSON.stringify(this.practice));
					localStorage.setItem("paper", JSON.stringify(this.form));
					this.$store.commit("setIsPractice", true)
					this.$router.push({
						name: 'Answer',
						params: {}
					})
				}).catch(function(error) {
					console.log(error) //错误处理 相当于error
				});
			},
			//获取模拟练习
			getPracticeInfo() {
				this.$axios(`api/practices/?format=json`, {
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
			//改变每页条数
			handleSizeChange(val) {
				// console.log(`每页 ${val} 条`);
				this.page_size = val
				this.getPracticeInfo()
			},
			//跳转到多少页
			handleCurrentChange(val) {
				// console.log(`当前页: ${val}`);
				this.page = val
				this.getPracticeInfo()
			}
		},
	}
</script>

<style lang="scss" scoped>
	#practice {
		align-items: center;
	}

	.el-card {
		width: 700px;
		margin: 50px 200px;
	}

	.el-slider {
		width: 500px;
		margin: 0px 20px;
	}

	.el-rate {
		margin: 10px 100px 0px 0px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.el-table {
		margin-left: 200px;
	}
</style>
