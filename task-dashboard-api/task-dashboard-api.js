 async function updatePrices() {
        const btcDisplay = document.getElementById('btc-price');
        const ethDisplay = document.getElementById('eth-price');
        const msgDisplay = document.getElementById('msg');
        const btn = document.getElementById('refresh-btn');

        // 1. 锁定阶段：禁用按钮，显示等待提示
        btn.disabled = true;
        btn.innerText = "请求中 (1.5s)...";
        btcDisplay.innerText = "---";
        ethDisplay.innerText = "---";
        msgDisplay.innerText = "正在查询，请稍候...";

        try {
           
            // 这行代码会创建一个 1500 毫秒后才完成的 Promise
            await new Promise(resolve => setTimeout(resolve, 1500));

     
            const [btcRes, ethRes] = await Promise.all([
                fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'),
                fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT')
            ]);
                            //throw触发异常状态
            if (!btcRes.ok || !ethRes.ok) throw new Error("接口响应超时");

            const btcData = await btcRes.json();
            const ethData = await ethRes.json();

            // 更新价格显示
            btcDisplay.innerText = ` BTC $${parseFloat(btcData.price).toLocaleString()}`;
            ethDisplay.innerText = ` Ether $${parseFloat(ethData.price).toLocaleString()}`;
            msgDisplay.innerText = "✅ 数据获取成功";

        } catch (error) {
            msgDisplay.innerText = "❌ 错误: " + error.message;
        } finally {
            btn.disabled = false;
            btn.innerText = "刷新数据";
        }
    }