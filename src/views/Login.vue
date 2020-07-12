<template>
	<div id="login">
		<el-container>
			<el-header>
				<h1 style="color: #FFFFFF;margin-top: 50px;">Python在线考试系统</h1>
			</el-header>
			<el-main>
				<div id="login-from">
					<el-form ref="loginForm" status-icon :model="loginForm" :rules="rules">
						<el-form-item label="学号" prop="username">
							<el-input v-model="loginForm.username" autocomplete="off"></el-input>
							</el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
							</el-input>
						</el-form-item>
						<slide-verification @check-result="checkResult"></slide-verification>
						<br />
						<el-button type="primary" @click.native.prevent="handLogin('loginForm')">登录</el-button>
						<div class="text-foot">
							还没有账号?
							<router-link to="/register" class="register-link">
								注册
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
			return {
				confirmSuccess: false,
				loginForm: {
					username: null,
					password: null,
				},
				rules: {
					username: [{
						required: true,
						message: '请输入学号',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				}
			}
		},
		components:{
			SlideVerification
		},
		methods: {
			//获取滑块验证结果
			checkResult(message) {
				this.confirmSuccess = message
			},
			//处理登录
			handLogin(formName) {
				//清理缓存信息
				localStorage.clear()
				sessionStorage.clear()
				if (this.confirmSuccess) {
					const msg = this
					this.$refs[formName].validate((valide) => {
						if (valide) {
							axios.post(`api/jwt-auth/`, this.loginForm).then(res => {
								console.log(res); //处理成功的函数 相当于success
								if (res.status == 200) {
									this.$message({
										message: '登录成功',
										type: 'success'
									});
									this.$store.commit("setUser", res.data.user)
									this.$store.commit("setStudent", res.data.student)
									this.$store.commit("setAuthorization", res.data.token)
									this.$router.push('/exam')
								}
							}).catch(function(error) {
								//错误处理 相当于error
								msg.$message('登录失败，账号或密码错误');
								console.log(error) 
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
	#login {
		height: 700px;
		// background-color: #244d6f;
		background-image: url(../assets/bg.jpg);
		background-repeat: no-repeat;
		background-size: cover; 
	}

	#login-from {
		margin: 50px 540px;
		width: 400px;
		height: 400px;
		border-radius: 10px;
		background-color: #FFFFFF;
	}

	.el-form {
		padding-top: 50px;
		margin: 50px 50px;
		width: 300px;
	}

	.el-input {

	}

	.el-button {
		width: 100%;
	}
	
	.text-foot {
		// text-align: center;
		// padding: 10px;
		font-weight: 700;
		margin-top: 20px;
		// color: var(--color-semidark);
	}
</style>
