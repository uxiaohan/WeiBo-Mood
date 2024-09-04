const Koa = require("koa");
const { getWbData } = require("./control/index");
const { CRON_TIME } = require("./config");
const schedule = require("node-schedule");
const app = new Koa();

app.use(async ctx => {
  ctx.body = "微博心情分析 Running Successfully!";
});

// 每隔15分钟检测微博是否有新动态 有则更新
schedule.scheduleJob(CRON_TIME, getWbData);
console.log("\x1b[93m%s\x1b[0m", "微博自动检测 Runing");

// 初始化
const PORT = 52100;
app.listen(PORT, () => {
  console.log("\x1b[92m%s\x1b[0m", `微博心情分析 Running ：http://localhost:${PORT}`);
  // 首次执行
  getWbData();
});
