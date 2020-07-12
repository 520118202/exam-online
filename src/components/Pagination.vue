<template>
	<div id="pagination">
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[5, 10]"
		 :page-size="page_size" layout="total, sizes, prev, pager, next, jumper" :total="count">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		name: 'pagination',
		data() {
			return {
				page: 1,
				page_size: 5
			}
		},
		props: {
			count: Number,
		},
		methods: {
			//改变每页条数
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.page_size = val
				this.$emit('size-change', val)
			},
			//跳转到多少页
			handleCurrentChange(val) {
				// console.log(`$当前页: ${val}`);
				this.page = val
				this.$emit('current-change', val)
			}
		}
	}
</script>

<style  lang="scss" scoped>
	#pagination {
		margin-top: 30px;
	}
</style>
