var url;//声明全局变量用于储存当前页面的url
var tab;//生命全局变量用于放置tab信息
var thing;//全局变量，用于存储获取的搜索框的内容
var src;//生命全局变量，用于储存将要跳转的网页
/* 
状态表示符
百度主页（http://www.baidu.com/）==1
百度搜索之后（http://www.baidu.com/*）==2
知乎主页(http://www.zhihu.com/)==3
知乎搜索后（http://www.zhihu.com/*）==5
Bing主页（http://cn.bing.com/）==7
Bing搜索后（http://cn.bing.com/*）==8
360主页（http://www.so.com/）==9
360搜索之后（http://www.so.com/*）==10
soso主页（http://www.soso.com/）==11
soso搜索后（http://www.soso.com/*）==12
*/
var status=0;
//页面载入后对页面添加监听
window.onload=function(){
document.getElementById("name1").addEventListener("click",changetab_one);
document.getElementById("name2").addEventListener("click",changetab_two);
document.getElementById("name3").addEventListener("click",changetab_three);
document.getElementById("name4").addEventListener("click",changetab_four);
document.getElementById("name5").addEventListener("click",changetab_five);
};


//这是通过tabs的其他方法取得当前页面的tab和url
chrome.tabs.query({active  : true,lastFocusedWindow: true              
}, function(array_of_Tabs) {
     tab = array_of_Tabs[0];
     url = tab.url;
});


//通过判断网址类别分别注入不同的代码来获取搜索框的值
function clickPageAction(tab2){
//截取字符串符合最短的那一个网址，嘿360是最短的
	var all_url=url;
	url=url.substr(0,18)
	if("http://www.baidu.c"==url)
		{
		if(all_url=="http://www.baidu.com/"){
		status=1;
		}
		chrome.tabs.executeScript({code: 'document.getElementById("kw").value;'},baidu)
		}
	if("http://www.zhihu.c"==url)
		{
		chrome.tabs.executeScript({code: 'document.getElementById("q").value;'},zhihu)
		}
	if("http://www.bing.co"==url||"http://cn.bing.com"==url)
		{
		if(all_url=="http://cn.bing.com/"){
		status=7;
		}
		chrome.tabs.executeScript({code: 'document.getElementById("sb_form_q").value;'},bing)
		}
	if("http://www.so.com/"==url)
		{
		if(all_url=="http://www.so.com/"){
		status=9;
		}
		chrome.tabs.executeScript({code: 'document.getElementById("keyword").value;'},sanliuling)
		}
	if("http://www.soso.co"==url)
		{
		if(all_url=="http://www.soso.com/"){
		status=11;
		}
		chrome.tabs.executeScript({code: 'document.getElementById("upquery").value;'},soso)
		}	
	else{
	}
};


//以下五个方法分别对应五种情况下隐藏相应的搜索
function baidu(name){
display("two");
thing=name;
}

function zhihu(name){
display("one");
thing=name;
}

function bing(name){
display("three");
thing=name;
}

function sanliuling(name){
display("four");
thing=name;
}

function soso(name){
display("five");
thing=name;
}


//隐藏元素的方法   传进来一个id
function display(id){   
var traget=document.getElementById(id);   
    if(traget.style.display=="none")  
    { traget.style.display="";  
    }else{ traget.style.display="none";   
    }   
}  
//调用浏览器的跳转方法
function changetab(){
chrome.pageAction.hide(tab.id);
window.close();
chrome.tabs.update(tab.id, {url:src});
}
//点击元素后的完成链接的拼接
function changetab_one(){
	src="http://www.zhihu.com/search?q="+thing;
	if(status==11||status==9||status==7||status==1)
	{
		src="http://www.zhihu.com/"
	}
	changetab();
}
function changetab_two(){
	src="http://www.baidu.com/s?ie={inputEncoding}&wd="+thing;
	if(status==11||status==9||status==7||status==1)
	{
		src="https://www.baidu.com/"
	}
	changetab();
}
function changetab_three(){
	src="http://cn.bing.com/search?q="+thing;
	if(status==11||status==9||status==7||status==1)
	{
		src="http://cn.bing.com/"
	}
	changetab();
}
function changetab_four(){
	src="http://www.so.com/s?ie=utf-8&src=360sou_home&q="+thing;
	if(status==11||status==9||status==7||status==1)
	{
		src="http://www.so.com/"
	}
	changetab();
}
function changetab_five(){
	src="http://www.soso.com/q?cid=ie7.os&ie=utf-8&w="+thing;
	if(status==11||status==9||status==7||status==1)
	{
		src="http://www.soso.com/"
	}
	changetab();
}

//当点击时调用方法用来注入js代码
chrome.tabs.getCurrent(clickPageAction);

