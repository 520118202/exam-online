<template>
	<div id="layout">
		<el-container>
			<el-header>
				<el-row type="flex" justify="space-between">
					<a href="/"><img src="../assets/logo.png" height="50px" /></a>
					<el-menu :default-active="activeIndex" class="el-menu-title" mode="horizontal" @select="handleSelect"
					 background-color="#ffffff" text-color="#85baef" active-text-color="#1884f2" :router="true">
						<el-menu-item index="/exam">考试中心</el-menu-item>
						<el-menu-item index="/practice">模拟练习</el-menu-item>
						<el-menu-item index="/grade">查询成绩</el-menu-item>
						<el-menu-item index="/mistake" disabled>错题本</a></el-menu-item>
					</el-menu>
					<el-dropdown>
						<span class="el-dropdown-link" style="height: 50px;">
							<el-row>
								<!-- <img src="../assets/avatar.png" height="35px" /> -->
								<span>
									<i class="el-icon-user-solid"></i>
									<span>{{getStudent.name}}</span>
									<i class="el-icon-arrow-down el-icon--right"></i>
								</span>
							</el-row>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>
								<el-button type="text" @click="toCenter">个人中心</el-button>
							</el-dropdown-item>
							<el-dropdown-item>
								<el-button type="text" @click="toUpdatePwd">修改密码</el-button>
							</el-dropdown-item>
							<el-dropdown-item divided>
								<el-button type="text" @click="loginOut">退出登录</el-button>
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-row>
			</el-header>
			<el-main>
				<router-view />
			</el-main>
			<el-footer>
				<b>@Copyright 2019-2020. ALL Rights Reserved</b>
			</el-footer>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: "layout",
		data() {
			return {
				activeIndex: this.$route.path
			};
		},
		computed: {
			getStudent() {
				return this.$store.state.student;
			}
		},
		methods: {
			handleSelect(key, keyPath) {
				//console.log(key, keyPath);
				this.activeIndex = key
			},
			loginOut() {
				//console.log("before:" + localStorage.getItem('Authorization'))
				localStorage.clear()
				sessionStorage.clear()
				//console.log("after" + localStorage.getItem('Authorization'))
				this.$router.push('/login');
			},
			toCenter() {
				this.$router.push({
					name: 'Center',
					params: {}
				});
			},
			toUpdatePwd() {
				this.$router.push({
					name: 'Password',
					params: {}
				});
			}
		},
		created() {

		}
	}
</script>

<style lang="scss" scoped>
	#layout {
		margin: 0px 150px;
		width: 1200px;
	}

	.el-header {
		border-bottom: solid 1px #e6e6e6 !important;
	}

	.el-main {
		height: auto;
		min-height: 580px;
		_height: 580px;
	}

	.el-footer {}

	.el-dropdown img {
		margin-top: 10px;
	}

	.el-menu-item {
		font-size: 18px;
	}

	.el-dropdown {
		margin-top: 10px;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: #909090;
		font-size: 18px;
	}

	.el-icon-arrow-down {
		font-size: 18px;
	}
</style>
