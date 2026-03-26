// Surge Panel 腳本 - WARP Info 使用 Cloudflare cdn-cgi/trace
// 顯示 IPv4、託管中心 (loc | colo)、隱私保護狀態

$httpClient.get("https://cloudflare.com/cdn-cgi/trace", function(error, response, data) {
    if (error) {
        $done({
            title: "WARP Info",
            content: "無法連線到 Cloudflare\n請確認 WARP+ 已連線",
            style: "alert",
            icon: "cloud.fill",
            "icon-color": "#FF3B30"
        });
        return;
    }

    try {
        const lines = data.trim().split('\n');
        const info = {};
        lines.forEach(line => {
            const [key, value] = line.split('=').map(p => p.trim());
            if (key) info[key] = value;
        });

        const ipv4 = info.ip || "未知";
        const loc = info.loc || "??";
        const colo = info.colo || "未知";
        const warpStatus = info.warp || "off";   // 直接顯示 on / plus / off

        const content = `IPv4: ${ipv4}\n` +
                        `\n託管中心: ${loc} | ${colo}` +
                        `\n隱私保護: ${warpStatus}`;

        $done({
            title: "WARP Info",
            content: content,
            style: "info",
            icon: "cloud.fill",
            "icon-color": "#FF9500"
        });
    } catch (e) {
        $done({
            title: "WARP Info",
            content: "資料解析失敗",
            style: "alert"
        });
    }
});