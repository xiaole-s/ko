//音频管理
ko.AudioManager = function () {
    //私有变量来存储多个音频文件
    var ko1Audios = {};

    //加载
    function load(url, name) {
        name = name || url.split("/").slice(-1)[0].split("."
                                    ).slice(0, -1).join(".");
        //没有该声音文件就添加
        if (!ko1Audios[name]) {
            var au;//当前音频
            if (typeof Audio !== "undefined") {
                var au = new Audio();
                au.src = url;
            }
            //兼容Android移动端
            else if (window["PhoneGap"] && window["device"]
                && device.platform == "Android") {
                au = new Media("/android_asset/www/" + url);
            }
            else {//浏览器不支持Audio
                au = document.createElement('embed');
                if (au != null) {
                    au.setAttribute("display", "none");
                    au.setAttribute("autostart", false);
                    au.setAttribute("enablejavascript", true);
                    au.setAttribute("src", url);
                    document.body.appendChild(au);
                }
            }
            ko1Audios[name] = au;
        }
    }
    //预加载
    this.preLoad = function (urls, names) {
        for (var i = 0, len = urls.length; i < len; i++) {
            load(urls[i], names[i]);
        }
    };
    //播放声音
    this.play = function (url, name, vol) {
        vol = vol || 1;//默认值为1
        load(url, name);
        au._play = function (vol) {
            //if (au.paused == false) {
            au.volume = vol;//物理距离拟声传播
            //}
            au.play();
        };
        //播放声音
        ko1Audios[name]._play(vol);
    }
}
