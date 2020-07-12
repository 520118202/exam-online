<template>
	<div id="register">
		<el-container>
			<el-header>
				<h1 style="color: #FFFFFF;margin-top: 50px;">Python在线考试系统</h1>
			</el-header>
			<el-main>
				<div id="register-from">
					<el-form ref="registerForm" status-icon :model="registerForm" :rules="rules">
						<el-form-item label="学号" prop="username">
							<el-input v-model="registerForm.username" autocomplete="off"></el-input>
							</el-input>
						</el-form-item>
						<el-form-item label="姓名" prop="name">
							<el-input v-model="registerForm.name" autocomplete="off"></el-input>
							</el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
							</el-input>
						</el-form-item>
						<el-form-item label="确认密码" prop="checkpwd">
							<el-input type="password" v-model="registerForm.checkpwd" autocomplete="off"></el-input>
							</el-input>
						</el-form-item>
						<slide-verification @check-result="checkResult"></slide-verification>
						<br />
						<el-button type="primary" @click.native.prevent="handRegister('registerForm')">注册</el-button>
						<div class="text-foot">
							已有账号?
							<router-link to="/login" class="login-link">
								登录
							</router-link>
						</div>
					</el-form>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import SlideVerification from '@/components/SlideVerification.vue'
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.registerForm.checkpwd !== '') {
						this.$refs.registerForm.validateField('checkpwd');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.registerForm.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				confirmSuccess: false,
				registerForm: {
					username: null,
					password: null,
					checkpwd: null,
					name: null,
				},
				rules: {
					username: [{
							required: true,
							message: '请输入学号',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 15,
							message: '长度在 6 到 15 个字符',
							trigger: 'blur'
						}
					],
					password: [{
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
					],
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
					]
				}
			}
		},
		components: {
			SlideVerification
		},
		methods: {
			//获取滑块验证结果
			checkResult(message) {
				this.confirmSuccess = message
			},
			//处理注册
			handRegister(formName) {
				if (this.confirmSuccess) {
					const msg = this
					this.$refs[formName].validate((valide) => {
						if (valide) {
							axios.post(`api/register/`, this.registerForm).then(res => {
								console.log(res); //处理成功的函数 相当于success
								if (res.status == 200) {
									this.$message({
										message: '注册成功',
										type: 'success'
									});
									this.$router.push('/login')
								} else {
									this.$message({
										message: res.data.msg,
										type: 'error'
									});
								}
							}).catch(function(error) {
								msg.$message('注册失败');
								console.log(error) //错误处理 相当于error
							});
						} else {
							//表单验证失败
						}
					});
				} else {
					//未通过验证
					this.$message('请拖动滑块进行验证！');
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	#register {
		// height: 700px;
		/* background-color: #244d6f; */
		background-image: url(../assets/bg.jpg);
		background-repeat: no-repeat;
		background-size: cover;
	}

	#register-from {
		margin: 0px 540px;
		width: 400px;
		height: 600px;
		border-radius: 10px;
		background-color: #FFFFFF;
	}

	.el-form {
		padding-top: 20px;
		margin: 50px 50px;
		width: 300px;
	}

	.el-input {}

	.el-button {
		width: 100%;
	}

	.text-foot {
		font-weight: 700;
		margin-top: 20px;
	}
</style>
