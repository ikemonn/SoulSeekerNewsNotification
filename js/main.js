URL = 'http://m-mercury.qpyou.cn/mercury_new/';

chrome.cookies.set({
    "url": URL,
    "name": "mq_appid",
    "value": "com.com2us.soulcollector.normal2.freefull.apple.global.ios.universal"
});

chrome.cookies.set({
    "url": URL,
    "name": "mq_appver",
    "value": "1.3.7"
});

chrome.cookies.set({
    "url": URL,
    "name": "mq_lan",
    "value": "ja"
});

chrome.cookies.set({
    "url": URL,
    "name": "mq_vid",
    "value": "31299208"
});

// setInterval(function(){
    var xhr = new XMLHttpRequest();
    METHOD = 'GET';
    xhr.open(METHOD, URL, true);
    // DOMのParseには 'document' を指定する
    xhr.responseType = 'document';
    xhr.onload = function(e) {
        if (this.status === 200) {
            console.log(this.responseXML);
            // 掲載されている「お知らせ」「イベント」のニュース情報
            var newsData = {};

            // 「お知らせ」のニュース一覧の内容を配列に追加
            var infoDom = this.responseXML.getElementsByClassName('top');
            for (var i = 0; i < infoDom.length; i++) {
                var ancharDom = infoDom[i].getElementsByTagName('a');
                // 保存するデータ
                var data = {
                    type:'link',
                    url:ancharDom[0].href,
                    title:ancharDom[0].innerText
                };

                newsData[ancharDom[0].href] = data;
            }
            // 「お知らせ」のニュース一覧の内容を配列に追加
            var eventDom = this.responseXML.getElementsByClassName('eventlist');
            for (var i = 0; i < eventDom.length; i++) {
                var imgDom = eventDom[i].getElementsByTagName('img');
                for (var j = 0; j < imgDom.length; j++) {
                    var data = {
                        type:'img',
                        url:imgDom[j].src
                    };
                    newsData[imgDom[j].src] = data;
                }
            }

            var isReSave = false;
            // 保存していた情報の数と、取得してきた情報の数が違うときは、再保存
            if (localStorage.length !== newsData.length) {
                isReSave = true;
            } else {
                // 保存していた情報と異なる情報が取得できたときは、再保存
                for (key in newsData) {
                    if (localStorage.getItem(key) === null) {
                        isReSave = true;
                        break;
                    }
                }
            }

            // localStorageの内容をクリアして再保存
            if (isReSave === true) {
                console.log("再保存だよ");
                localStorage.clear();
                for (link in newsData) {
                    localStorage.setItem(link, JSON.stringify(newsData[link]));
                }
            }

            // localStorageすべての情報の取得
            for (var i = 0; i < localStorage.length; i++) {
                var saveKey = localStorage.key(i);
                var saveData = JSON.parse(localStorage.getItem(saveKey));
                console.log(localStorage.getItem(saveKey));
                console.log(saveData);

                if (saveData.type === 'img') {
                    $('body').append('<img src="' + saveData.url + '"></img>');
                } else if (saveData.type === 'link') {
                    $('body').append('<li><a href="' + saveData.url + '" target="_blank">' + saveData.title + '</a></li>');
                } else {
                    console.log('想定していないタイプが取得されました');
                }


            }


        }
    };

    xhr.send();
// } , 10000);
