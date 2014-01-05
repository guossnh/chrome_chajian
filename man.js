//判断搜索引擎类型
function checkForValidUrl(tabId, changeInfo, tab) { 
if("complete"==tab.status){
var url=tab.url.substr(0,18)
if("http://www.baidu.c"==url||"http://www.zhihu.c"==url||"http://www.bing.co"==url||"http://www.so.com/"==url||"http://www.soso.co"==url||"http://cn.bing.com"==url){
   chrome.pageAction.show(tabId);
}
else{
}
}
};
//当页面更新时添加监听
chrome.tabs.onUpdated.addListener(checkForValidUrl);