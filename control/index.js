const _fs = require("fs");
const fs = _fs.promises;
const path = require("path");
const { chatApi, chatModel, chatToken, WB_UID, BARK_TOKEN, PUSH_DEER_TOKEN } = require("../config");

// 取微博数据
const getWbData = async () => {
  if (!chatToken) return console.log("AI Token未配置");
  const tempIDData = await getTempID();
  try {
    const res = await fetch(`https://m.weibo.cn/api/container/getIndex?type=uid&value=${WB_UID}&containerid=107603${WB_UID}&t=${Date.now()}`, {
      headers: { "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36" }
    });
    const resData = await res.json();
    const onlineID = resData.data.cards[0].profile_type_id;
    if (onlineID == tempIDData) return console.log("微博动态暂未更新");
    const wb_text = resData.data.cards[0].mblog.text.replace(/<[^<]+?>/g, "");
    const feeling = await getAiRes(wb_text);
    barkNotify(BARK_TOKEN, PUSH_DEER_TOKEN, feeling, wb_text);
    console.log({ wb_text, feeling });
    await fs.writeFile(path.resolve(__dirname, "..", "tempID"), onlineID, "utf8");
  } catch (error) {
    console.log("微博数据获取失败，请稍后再试");
  }
};

// AI 分析
const getAiRes = async MSG => {
  const template = `分析 “${MSG}” 发表这段动态的人的心情，并综合结果，使用 高兴、烦躁、生气、难过、沮丧、害怕、崩溃、痛苦、惊讶、愤怒、厌恶、欲望 中的 任意一个来回答我，并带上情绪的程度，你不需要过多解释，按格式回答我，例如：【生气50%】`;
  const options = {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json", authorization: `Bearer ${chatToken}` },
    body: JSON.stringify({ model: chatModel, messages: [{ role: "user", content: template }], stream: false, max_tokens: 512, temperature: 0.7, top_p: 0.7, top_k: 50, frequency_penalty: 0.5, n: 1 })
  };

  try {
    const res = await fetch(chatApi, options);
    const resData = await res.json();
    return resData.choices[0].message.content;
  } catch (error) {
    return "分析失败，请稍后再试";
  }
};

// 即时通知
const barkNotify = async (BARK_TOKEN, PUSH_DEER_TOKEN, title, content) => {
  if (!BARK_TOKEN && !PUSH_DEER_TOKEN) return;
  try {
    BARK_TOKEN && fetch(`https://api.day.app/${BARK_TOKEN}/` + encodeURIComponent(`当前心情: ${title}`) + "/" + `微博动态内容: ${encodeURIComponent(content)}`);
    PUSH_DEER_TOKEN && fetch(`https://api2.pushdeer.com/message/push?pushkey=${PUSH_DEER_TOKEN}&text=当前心情: ${title}%0A微博动态内容: ${content}`);
    console.log(`${BARK_TOKEN && "Bark"} ${PUSH_DEER_TOKEN && "PushDeer"} 通知成功`);
  } catch (error) {
    console.log(`${BARK_TOKEN && "Bark"} ${PUSH_DEER_TOKEN && "PushDeer"} 通知成功`);
  }
};

// 读取文件
const getTempID = async () => {
  const PATH = path.resolve(__dirname, "..", "tempID");
  try {
    return await fs.readFile(PATH, "utf8");
  } catch (err) {
    await fs.mkdir(path.dirname(PATH), { recursive: true });
    await fs.writeFile(PATH, "");
    return await fs.readFile(PATH, "utf8");
  }
};

module.exports = { getWbData };
