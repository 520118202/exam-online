<template>
	<div id="password">
		<el-form ref="pwdForm" status-icon :model="pwdForm" :rules="rules">
			<h1>修改密码</h1>
			<el-form-item label="原密码" prop="oldpwd">
				<el-input v-model="pwdForm.oldpwd" autocomplete="off"></el-input>
				</el-input>
			</el-form-item>
			<el-form-item label="新密码" prop="newpwd">
				<el-input type="password" v-model="pwdForm.newpwd" autocomplete="off"></el-input>
				</el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="checkpwd">
				<el-input type="password" v-model="pwdForm.checkpwd" autocomplete="off"></el-input>
				</el-input>
			</el-form-item>
			<el-button type="primary" @click.native.prevent="updatePwd('pwdForm')">确认更改</el-button>
			<el-button @click="cancel">取消</el-button>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.pwdForm.checkpwd !== '') {
						this.$refs.pwdForm.validateField('checkpwd');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.pwdForm.newpwd) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				pwdForm: {
					oldpwd: null,
					newpwd: null,
					checkpwd: null,
					userid: null
				},
				rules: {
					oldpwd: [{
						required: true,
						message: '请输入原密码',
						trigger: 'blur'
					}],
					newpwd: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 10,
							message: '长度在 6 到 15 个字符',
							trigger: 'blur'
						},
						{
							validator: validatePass,
							trigger: 'blur'
						}
					],
					checkpwd: [{
							required: true,
							message: '请再次输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 15,
							message: '长度在 6 到 10 个字符',
							trigger: 'blur'
						},
						{
							validator: validatePass2,
							trigger: 'blur'
						}
					]
				}
			}
		},
		computed: {
			getType() {
				return this.$route.params.type;
			}
		},
		methods: {
			updatePwd(formName) {
				this.$refs[formName].validate((valide) => {
					if (valide) {
						this.$axios.patch(
							`/api/update-pwd/?format=json`,
							this.pwdForm
						).then(res => {
							console.log(res)
							if (res.status == 200 && res.data.msg == 'success') {
								this.$message({
									message: '更新密码成功',
									type: 'success'
								});
							} else {
								this.$message({
									message: '原密码不正确，更新失败',
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
			cancel() {
				this.$router.push('/')
			}
		},
		created() {
			this.pwdForm.userid = this.$route.params.student.user
		}
	}
</script>

<style lang="scss" scoped>
	#password {}

	.el-form {
		margin-left: 350px;
		width: 400px;
	}

	.el-select {
		width: 320px;
	}

	.el-input {}
</style>
