# TMDB Proxy Worker

一个基于 Cloudflare Workers 的轻量级 TMDB API 代理：
- 透传 `Authorization: Bearer <TMDB_TOKEN>` 到 TMDB
- 设置 CORS 允许前端直接调用
- 处理 `OPTIONS` 预检请求
- 使用 KV 缓存 200 响应 10 分钟

## 快速开始

### 一键导入到 Cloudflare
1. 将本项目推送到你的 GitHub 仓库。
2. 在 Cloudflare Dashboard 进入 `Workers & Pages` → `Create Worker` → `Import from GitHub`。
3. 选择该仓库，Cloudflare 会识别 `wrangler.toml` 与 `worker.js` 并创建服务。
4. 在 `Settings` → `Variables and bindings` 添加 KV 绑定：
   - 类型：`KV namespaces`
   - 绑定名称：`TMDB_CACHE`
   - 关联你创建的 KV 命名空间
