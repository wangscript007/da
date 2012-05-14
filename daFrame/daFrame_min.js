﻿/**daFrame
*容器类
* @author danny.xu
* @version daFrame_1.0 2011/7/10 11:55:21
*/
(function(k,l){var m=k.document;var n=(function(){var j=function(a){return new j.fnStruct.init(a)};j.fnStruct=j.prototype={version:"daFrame v1.0 \n author: danny.xu \n date: 2011/7/10 11:55:57",cntId:0,cntObj:null,cntParentObj:null,cntMainObj:null,cntBoxObj:null,cntOverObj:null,cntScrollV:null,cntScrollH:null,cntSize:null,cntBoxSize:null,cntScale:null,cntIframeObj:null,cntImageObj:null,cntCorner:10,cntLoadingObj:null,isLocal:true,isShowScrollH:false,isShowScrollV:false,setting:{window:k,parent:null,width:0,height:0,loading:true,css:{cnt:"daCnt",main:"daCntMain",box:"daCntBox",over:"daCntOver",sclV:"scl_v",sclH:"scl_h",sclV2:"scl_v2",sclH2:"scl_h2"},border:"1px solid #666",shandow:"",style:"da",html:"",url:"",src:"",load:null,unload:null,back:null,close:null,scroll:null},init:function(a){a=this.setting=da.extend(true,{},this.setting,a);k=a.window;m=k.document;this.cntParentObj=da(a.parent);if(0>=this.cntParentObj.length){alert("daFrame温馨提示: 需要指定父亲DOM对象");return}this.cntParentObj=this.cntParentObj.dom[0];while(m.getElementById("daCnt"+this.cntId)){this.cntId++};this.cntId="daCnt"+this.cntId;this.cntSize={w:0,h:0};this.cntBoxSize={w:0,h:0};this.cntScale={w:1,h:1};this.create();this.setSize();if(""!=a.url||""!=a.src)this.loading();da.timer.call(this,30,function(){this.setCnt();this.bindEvent()});if(a.shandow)j.shandowborder(this.cntMainObj,a.shandow)},create:function(){var a=m.createElement("div"),mainObj=m.createElement("div"),overObj=m.createElement("div"),boxObj=m.createElement("div"),scrollVObj=m.createElement("a"),scrollHObj=m.createElement("a");a.id=this.cntId;a.className=this.setting.css.cnt;a.style.border=this.setting.border;boxObj.id=this.cntId+"_box";boxObj.className=this.setting.css.box;mainObj.insertBefore(boxObj,null);overObj.id=this.cntId+"_over";overObj.className=this.setting.css.over;mainObj.insertBefore(overObj,null);mainObj.id=this.cntId+"_main";mainObj.className=this.setting.css.main;a.insertBefore(mainObj,null);scrollVObj.id=this.cntId+"_scrollV";scrollVObj.className=this.setting.css.sclV;scrollVObj.href="javascript:void(0);";a.insertBefore(scrollVObj,null);scrollHObj.id=this.cntId+"_scrollH";scrollHObj.className=this.setting.css.sclH;scrollHObj.href="javascript:void(0);";a.insertBefore(scrollHObj,null);this.cntParentObj.insertBefore(a,null);this.cntObj=a;this.cntMainObj=mainObj;this.cntBoxObj=boxObj;this.cntOverObj=overObj;this.cntScrollV=scrollVObj;this.cntScrollH=scrollHObj},bindEvent:function(){var i=this;daDrag({window:k,src:this.cntScrollV,target:this.cntScrollV,cursor:"pointer",before:function(a,b,c){b.className=i.setting.css.sclV2;i.cntOverObj.style.display="block";da.daMaskShow(k,1)},move:function(a,b,c,d,e,f,g){var h=0,maxY=2+da(i.cntMainObj).height()-da(i.cntScrollV).height()-i.cntCorner;e.y=(e.y>maxY)?maxY:e.y;e.y=(e.y<h)?h:e.y;i.cntBoxObj.style.top=-(e.y/i.cntScale.h)+"px";return{x:"auto",y:e.y}},after:function(a,b,c){b.className=i.setting.css.sclV;i.cntOverObj.style.display="none";da.daMaskHide(k)}});daDrag({window:k,src:this.cntScrollH,target:this.cntScrollH,cursor:"pointer",before:function(a,b,c){b.className=i.setting.css.sclH2;i.cntOverObj.style.display="block";da.daMaskShow(k,1)},move:function(a,b,c,d,e,f,g){var h=0,maxX=2+da(i.cntMainObj).width()-da(i.cntScrollH).width()-i.cntCorner;e.x=(e.x>maxX)?maxX:e.x;e.x=(e.x<h)?h:e.x;i.cntBoxObj.style.left=-(e.x/i.cntScale.w)+"px";return{x:e.x,y:"auto"}},after:function(a,b,c){b.className=i.setting.css.sclH;i.cntOverObj.style.display="none";da.daMaskHide(k)}});if(""!=this.setting.html){this.bindWheel(this.cntBoxObj);this.cntOverObj.style.display="none"}else this.bindWheel(this.cntOverObj)},bindWheel:function(c){var d=this,nWheelDeltaStep=30,maxY,nTop;da(c).bind("mousemove",function(a){var b=da(d.cntObj).width(),hCnt=da(d.cntObj).height(),leftBox=d.cntBoxObj.offsetLeft,topBox=d.cntBoxObj.offsetTop,vRect={minX:b+(-leftBox)-50,minY:hCnt+(-topBox)-50};if(vRect.minX<a.pageX){d.showScrollBarV()}else{d.hideScrollBarV()}if(vRect.minY<a.pageY){d.showScrollBarH()}else{d.hideScrollBarH()}});c.daWheelObj=daWheel({target:c,before:function(){maxY=2+da(d.cntBoxObj).height()-da(d.cntMainObj).height(),nTop=d.cntBoxObj.offsetTop;d.showScrollBarV()},up:function(){nTop=nTop+nWheelDeltaStep},down:function(){nTop=nTop-nWheelDeltaStep},after:function(){nTop=(0<nTop)?0:(-maxY>nTop)?-maxY:nTop;d.cntBoxObj.style.top=nTop+"px";d.cntScrollV.style.top=-(nTop*d.cntScale.h)+"px";d.hideScrollBarV()}})},setCnt:function(){if(""!=this.setting.html){if("string"===typeof this.setting.html)this.cntBoxObj.innerHTML=this.setting.html;else if(this.setting.html.nodeType)this.cntBoxObj.insertBefore(this.setting.html)}else if(""!=this.setting.url){this.cntIframeObj=this.iframe();this.cntBoxObj.insertBefore(this.cntIframeObj,null)}else if(""!=this.setting.src){this.cntImageObj=this.image();this.cntBoxObj.insertBefore(this.cntImageObj,null)}},image:function(){var a=this;imageObj=m.createElement("img");imageObj.src=this.setting.src;da.loadImage(this.setting.src,function(){a.setSize();a.loading(true)});return imageObj},iframe:function(){var f=this,setting=this.setting,iframeObj=m.createElement("iframe");var g=function(a){var b=/^(\w+:)?\/\/([^\/?#]+)/.exec(a);return b&&(b[1]&&b[1].toLowerCase()!==location.protocol||b[2].toLowerCase()!==location.host)};var h=function(a,b){var c=Math.max(f.setting.width,da(b).width(),b.document.body.scrollWidth,b.document.documentElement.scrollWidth);var d=Math.max(f.setting.height,da(b).height(),b.document.body.scrollHeight,b.document.documentElement.scrollHeight);da(a).width(c);da(a).height(d);f.contentSize={w:c,h:d};f.setSize()};var i=function(){var b=m.createElement("iframe");b.scrolling="auto";b.frameBorder="0";b.src=f.setting.url;da(b).width(da(f.cntObj).width());da(b).height(da(f.cntObj).height());da(b).bind("load",function(){var a=this.contentWindow;f.loading(true);if(setting.load)setting.load.call(f)});f.isLocal=false;return b};if(g(setting.url)){iframeObj=i()}else if("da"===setting.style){iframeObj.scrolling="no";iframeObj.frameBorder="0";iframeObj.src=setting.url;da(iframeObj).bind("load",function(){if(this.contentWindow){var a=this.contentWindow;if(setting.load)setting.load.call(a,f);a.daFrameAutoSize=function(){h(iframeObj,a)};if(setting.back){a.dialogreturn=a.back=function(){try{setting.back.apply(a,arguments)}catch(e){}};a.myclosewin=a.close=function(){setting.close.apply(a,arguments)}}if(setting.unload){da(a).bind("unload",function(){if(setting.unload)setting.unload.apply(this,arguments)})}f.bindWheel(a.document.body);h(this,a);f.loading(true)}})}else if("default"===setting.style){iframeObj.scrolling="auto";iframeObj.frameBorder="0";iframeObj.src=setting.url;da(iframeObj).width(da(f.cntObj).width());da(iframeObj).height(da(f.cntObj).height());da(iframeObj).bind("load",function(){if(this.contentWindow){var a=this.contentWindow;if(setting.load)setting.load.call(a,f);a.daFrameAutoSize=function(){h(iframeObj,a)};if(setting.back){a.dialogreturn=a.back=function(){try{setting.back.apply(a,arguments)}catch(e){}};a.myclosewin=a.close=function(){setting.close.apply(a,arguments)}}if(setting.unload){da(a).bind("unload",function(){if(setting.unload)setting.unload.apply(this,arguments)})}f.loading(true)}})}return iframeObj},refresh:function(){this.loading();if(""!=this.setting.url)this.cntIframeObj.src=this.setting.url;else if(""!=this.setting.src)this.cntImageObj.src=this.setting.src},showScrollBarV:function(){if(this.isShowScrollV){if(this.TimerScrollV)da.clearTimer(this.TimerScrollV);da(this.cntScrollV).stop(true,true).fadeIn()}},hideScrollBarV:function(){if(this.isShowScrollV){if(this.TimerScrollV)da.clearTimer(this.TimerScrollV);this.TimerScrollV=da.timer.call(this,200,function(){da(this.cntScrollV).stop(true,true).fadeOut()})}},showScrollBarH:function(){if(this.isShowScrollH){if(this.TimerScrollH)da.clearTimer(this.TimerScrollH);da(this.cntScrollH).stop(true,true).fadeIn()}},hideScrollBarH:function(){if(this.isShowScrollH){if(this.TimerScrollH)da.clearTimer(this.TimerScrollH);this.TimerScrollH=da.timer.call(this,150,function(){da(this.cntScrollH).stop(true,true).fadeOut()})}},scrollBar:function(){if(this.isLocal){if(this.cntBoxSize.w>this.cntSize.w+2){this.cntScrollH.style.display="block";this.isShowScrollH=true}else{this.cntScrollH.style.display="none";this.isShowScrollH=false}if(this.cntBoxSize.h>this.cntSize.h+2){this.cntScrollV.style.display="block";this.isShowScrollV=true}else{this.cntScrollV.style.display="none";this.isShowScrollV=false}}else{this.cntScrollV.style.display=this.cntScrollH.style.display="none";this.isShowScrollH=false;this.isShowScrollV=false}},setSize:function(a,b){var c=da(this.cntParentObj),da_boxObj=da(this.cntBoxObj),wBox=da_boxObj.width(),hBox=da_boxObj.height(),wCnt=(a&&0<=a)?a:this.setting.width||c.width(),hCnt=(b&&0<=b)?b:this.setting.height||c.height();wCnt=parseInt(wCnt,10);hCnt=parseInt(hCnt,10);da(this.cntObj).width(wCnt);da(this.cntObj).height(hCnt);da(this.cntMainObj).width(wCnt);da(this.cntMainObj).height(hCnt);da(this.cntOverObj).width(wCnt);da(this.cntOverObj).height(hCnt);if(null!=this.contentSize){if(this.contentSize.w<wCnt){da(this.cntIframeObj).width(wCnt)}if(this.contentSize.h<hCnt){da(this.cntIframeObj).height(hCnt)}}if("default"===this.setting.style||!this.isLocal){da(this.cntIframeObj).width(wCnt);da(this.cntIframeObj).height(hCnt)}var d=da.isNull((wCnt-this.cntCorner)/wBox,0),hScale=da.isNull((hCnt-this.cntCorner)/hBox,0);da(this.barHObj).width(wCnt);da(this.barVObj).height(hCnt);da(this.cntScrollH).width(d*wCnt);da(this.cntScrollV).height(hScale*hCnt);this.cntScale.w=d;this.cntScale.h=hScale;this.cntSize.w=this.setting.width=wCnt;this.cntSize.h=this.setting.height=hCnt;this.cntBoxSize.w=wBox;this.cntBoxSize.h=hBox;this.scrollBar()},scroll:function(a,b){if(!this.isLocal)return;var c=this;if(this.isShowScrollH)this.showScrollBarH();if(this.isShowScrollV)this.showScrollBarV();var d=0,BoxMinY=0,BoxMaxX=(2+da(this.cntMainObj).width()-da(this.cntScrollH).width()-this.cntCorner)/this.cntScale.w,BoxMaxY=(2+da(this.cntMainObj).height()-da(this.cntScrollV).height()-this.cntCorner)/this.cntScale.h;a=(a>BoxMaxY)?BoxMaxY:(a<BoxMinY)?BoxMinY:a;b=(b>BoxMaxX)?BoxMaxX:(b<d)?d:b;var e=da.isNull(a)?"auto":a,boxLeft=da.isNull(b)?"auto":b,scrollTop=a*this.cntScale.h,scrollLeft=b*this.cntScale.w;if("undefined"===typeof daFx){da(this.cntBoxObj).css({top:-BoxTop,left:-BoxLeft});da(this.cntScrollV).css("top",scrollTop);da(this.cntScrollH).css("left",scrollLeft)}else{da(this.cntBoxObj).stop(true,true).act({top:-e,left:-boxLeft});da(this.cntScrollV).stop(true,true).act({top:scrollTop},{complete:function(){if(c.isShowScrollV)c.hideScrollBarV()}});da(this.cntScrollH).stop(true,true).act({left:scrollLeft},{complete:function(){if(c.isShowScrollH)c.hideScrollBarH()}})}},loading:function(a){if(a){this.cntOverObj.style.display="none"}if(!this.setting.loading)return;if(a){this.cntLoadingObj.finished()}else{this.cntLoadingObj=daLoading({window:k,parent:this.cntMainObj,type:"gif",border:0,click:function(){this.finished()}})}},release:function(){daWheel.unbind(this.cntBoxObj);daWheel.unbind(this.cntOverObj);daDrag.unbind(this.cntScrollV);daDrag.unbind(this.cntScrollH);da(this.cntScrollV).remove();da(this.cntScrollH).remove();da(this.cntImageObj).remove();da(this.cntIframeObj).remove();da(this.cntOverObj).remove();da(this.cntBoxObj).remove();da(this.cntMainObj).remove();da(this.cntObj).remove();this.cntObj=null;this.cntParentObj=null;this.cntMainObj=null;this.cntBoxObj=null;this.cntOverObj=null;this.cntScrollV=null;this.cntScrollH=null;this.cntSize=null;this.cntBoxSize=null;this.cntScale=null;this.cntIframeObj=null;this.cntImageObj=null;this.cntLoadingObj=null;this.setting=null},remove:function(){if(this.isReleased)return;this.isReleased=true;this.loading(true);if(this.cntIframeObj){this.cntIframeObj.onreadystatechange=null;this.cntIframeObj.onload=null;if("unknown"!=typeof this.cntIframeObj.contentWindow){var a=this.cntIframeObj.contentWindow;this.setting.load=null;this.setting.unload=null;this.setting.back=null;this.setting.close=null;if(this.isLocal){a.dialogreturn=null;a.back=null;a.myclosewin=null;a.close=null;a.autosize=null;if(a.document.body)daWheel.unbind(a.document.body)}}this.cntIframeObj.src="javascript:false;";try{var a=this.cntIframeObj.contentWindow;a.document.write("");a.document.clear()}catch(e){}}this.release()}};j.fnStruct.init.prototype=j.prototype;j.shandowborder=function(a,b){var c=da(a);if(0>=c.dom.length)return;c=c.dom[0];var d=da(c).css("position");if(!d||'static'==d){c.style.position="relative"}if(b){var e=m.createElement("div");e.className="sb";var f=[],arrTmp=b.split(",");for(var i=0,len=arrTmp.length;i<len;i++){switch(arrTmp[i]){case"top":f.push('<div class="t1 o1"></div>');f.push('<div class="t2 o2"></div>');f.push('<div class="t3 o3"></div>');f.push('<div class="t4 o4"></div>');f.push('<div class="t5 o5"></div>');break;case"left":f.push('<div class="l1 o1"></div>');f.push('<div class="l2 o2"></div>');f.push('<div class="l3 o3"></div>');f.push('<div class="l4 o4"></div>');f.push('<div class="l5 o5"></div>');break;case"right":f.push('<div class="r1 o1"></div>');f.push('<div class="r2 o2"></div>');f.push('<div class="r3 o3"></div>');f.push('<div class="r4 o4"></div>');f.push('<div class="r5 o5"></div>');break;case"bottom":f.push('<div class="b1 o1"></div>');f.push('<div class="b2 o2"></div>');f.push('<div class="b3 o3"></div>');f.push('<div class="b4 o4"></div>');f.push('<div class="b5 o5"></div>');break}}e.innerHTML=f.join("");c.insertBefore(e,null)}};return j})();k.daFrame=k.daFrame=k.daCnt=n})(window);