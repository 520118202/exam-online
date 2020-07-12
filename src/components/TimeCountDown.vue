<template>
	<div>
		<div style="text-align:center;color:red;">
			<h2>{{showTimeLeft}}</h2>
		</div>
	</div>
</template>
<script>
	export default {
		name: "timeCountDown",
		props: {
			totalTime: Number,
		},
		data() {
			return {
				timeLeft: 0,
				bundleIntervalEvent: ""
			};
		},
		computed: {
			//用计算属性显示结果
			showTimeLeft() {
				//剩余秒数<=0
				if (this.timeLeft <= 0) {
					// 结束event
					this.$emit('hand-in', true)
					return "考试时间已到";
				}
				// 剩余秒数>0
				else {
					let day = Math.floor(this.timeLeft / 86400);
					let hour = Math.floor((this.timeLeft % 86400) / 3600);
					let min = Math.floor(((this.timeLeft % 86400) % 3600) / 60);
					let sec = Math.floor(((this.timeLeft % 86400) % 3600) % 60);
					// return (day + "天  " + (hour < 10 ? "0" : "") + hour + ": " + (min < 10 ? "0" : "") + min + ": " + (sec < 10 ? "0" :
					// 	"") + sec);
					return ("倒计时 " + (hour < 10 ? "0" : "") + hour + ": " + (min < 10 ? "0" : "") + min + ": " + (sec < 10 ? "0" :
						"") + sec);
				}
			}
		},
		methods: {
			//将分钟初始化成秒
			initSecondsLeft() {
				// let currentDate = new Date();
				// let tmp = this.endDate.split(/[- : /]/);
				// let toEndDate = new Date(tmp[0], tmp[1] - 1, tmp[2], tmp[3], tmp[4], tmp[5]);
				//参数日期 > 当前日期 => 获取剩余秒数
				// if (toEndDate > currentDate) {
				// 	// this.timeLeft = Math.floor((toEndDate.getTime() - currentDate.getTime()) / 1000);
				// 	this.timeLeft = Math.floor((toEndDate.getTime() - currentDate.getTime()) / 1000);
				// } else {
				// 	this.timeLeft = 0;
				// }
				this.timeLeft = this.totalTime * 60;
			},
			//间隔事件: 剩余秒数--, 当剩余秒数为0时,清除间隔事件.
			intervalEvent() {
				if (this.timeLeft > 0) {
					this.timeLeft--;
				} else {
					clearInterval(this.bundleIntervalEvent);
				}
			},
		},
		mounted() {},
		created() {
			//初始化剩余秒数
			this.initSecondsLeft();
			//执行间隔事件.
			this.bundleIntervalEvent = setInterval(this.intervalEvent, 1000);
		},
		beforeDestroy() {
			clearInterval(this.bundleIntervalEvent);
		}
	};
</script>
