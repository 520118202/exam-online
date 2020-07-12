<template>
	<div class="center">
		<el-form ref="centerForm" status-icon :model="centerForm" :rules="rules" label-width="80px">
			<h1>个人中心</h1>
			<el-form-item label="姓名" prop="name">
				<el-input v-model="centerForm.name"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="gender">
				<el-select v-model="centerForm.gender" placeholder="请选择性别">
					<el-option label="男" value="m"></el-option>
					<el-option label="女" value="f"></el-option>
				</el-select>
			</el-form-item>
			<!-- <el-form-item label="年级" prop="year">
				<el-select v-model="centerForm.year" placeholder="请选择年级">
					<el-option label="2016级" value="2016"></el-option>
					<el-option label="2017级" value="2017"></el-option>
					<el-option label="2018级" value="2018"></el-option>
					<el-option label="2019级" value="2019"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="专业" prop="major">
				<el-input v-model="centerForm.major"></el-input>
			</el-form-item> -->
			<el-form-item label="班级" prop="clazz">
				<el-select v-model="centerForm.clazz" placeholder="请选择年级">
					<el-option v-for="item in clazzOptions" :key="item.id" :label="item.year + item.major + item.clazz" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="updateInfo('centerForm')">确认修改</el-button>
				<el-button @click="cancel">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				centerForm: {
					name: null,
					gender: null,
					year: null,
					major: null,
					clazz: null,
					clazz_id: null,
					user: null
				},
				clazzOptions: [], //班级下拉数据
				rules: {
					name: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 10,
							message: '长度在 2 到 8 个字符',
							trigger: 'blur'
						}
					],
					gender: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					// year: [{
					// 	required: true,
					// 	message: '请选择年级',
					// 	trigger: 'change'
					// }],
					// major: [{
					// 		required: true,
					// 		message: '请输入专业',
					// 		trigger: 'blur'
					// 	},
					// 	{
					// 		min: 8,
					// 		max: 30,
					// 		message: '长度在 8 到 30 个字符',
					// 		trigger: 'blur'
					// 	}
					// ],
					clazz: [{
							required: true,
							message: '请选择班级',
							trigger: 'change'
						},
					]
				}
			}
		},
		methods: {
			updateInfo(formName) {
				this.$refs[formName].validate((valide) => {
					if (valide) {
						this.centerForm.clazz_id = this.centerForm.clazz;
						this.$axios.patch(
							`/api/students/${this.centerForm.id}/?format=json`,
							this.centerForm
						).then(res => {
							console.log(res)
							if (res.status == 200) {
								this.$message({
									message: '更新个人信息成功',
									type: 'success'
								});
								//更新缓存
								this.$store.commit("sestStudent", this.centerForm)
							} else {
								this.$message({
									type: '更新个人信息失败',
									type: 'error'
								});
							}
						}).catch(error => {
							console.log(error)
						})
					} else {
						//表单验证失败
					}
				});
			},
			// 获取班级信息
			getClazzInfo() {
				this.$axios(`/api/clazzs/?format=json`, {
					// params: {
					// }
				}).then(res => {
					console.log(res.data)
					this.clazzOptions = res.data
				}).catch(error => {
					console.log(error)
				})
			},
			cancel() {
				this.$router.push('/')
			}
		},
		created() {
			this.centerForm = this.$store.state.student;
			this.getClazzInfo()
		}
	}
</script>

<style lang="scss" scoped>
	#center {}

	.el-form {
		margin-left: 350px;
		width: 400px;
	}

	.el-select {
		width: 320px;
	}

	.el-input {}
</style>
