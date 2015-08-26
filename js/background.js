

console.log("hoge");
// setInterval(function(){
    var xhr = new XMLHttpRequest();
    URL = 'http://m-mercury.qpyou.cn/mercury_new/';
    METHOD = 'GET';
    xhr.open(METHOD, URL, true);

    xhr.setRequestHeader('Cookie', 'mq_appid=com.com2us.soulcollector.normal2.freefull.apple.global.ios.universal');
    xhr.setRequestHeader('Cookie', 'mq_appver=1.3.7');
    xhr.setRequestHeader('Cookie', 'mq_lan=ja');
    xhr.setRequestHeader('Cookie', 'mq_vid=31299208');


    xhr.send();
    // DOMのParseには 'document' を指定する
    xhr.responseType = 'document';
    xhr.onload = function(e) {
        if (this.status === 200) {
            console.log(this.responseXML);
            // // ポイント部分のDOMを取得
            // var evtCountDom = this.responseXML.getElementById("EVTcount");
            // var numImgDom = evtCountDom.getElementsByTagName("img");
            // var numCount = numImgDom.length;
            // var eventPoint = 0;
            // for (var i = 0; i < numCount; i++) {
            //     // ポイントを算出
            //     eventPoint += Math.pow(10, numCount - (i + 1)) * numImgDom[i].getAttribute("alt");
            // }
            // chrome.browserAction.setBadgeText({text:String(eventPoint)});
        } else {
            console.log("えらー");
        }
    };

    xhr.send();
// } , 10000);
