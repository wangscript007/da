﻿/**
* @
* 表单数据有效性验证类
* @author danny.xu
* @date 2011/7/3
*/
da.extend({isMatch:function(a,b,c){if(c&&""===da.isNull(a,""))return true;else if(!c&&""===da.isNull(a,""))return false;else return b.test(a)},isInt:function(a,b){return da.isMatch(a,/^-?\d+$/,b)},isInt0Up:function(a,b){return da.isMatch(a,/^\d+$/,b)},isIntUp:function(a,b){return da.isMatch(a,/^[0-9]*[1-9][0-9]*$/,b)},isInt0Lower:function(a,b){return da.isMatch(a,/^((-\d+)|(0+))$/,b)},isIntLower:function(a,b){return da.isMatch(a,/^-[0-9]*[1-9][0-9]*$/,b)},isFloat:function(a,b){return da.isMatch(a,/^(-?\d+)(\.\d+)?$/,b)},isFloat0Up:function(a,b){return da.isMatch(a,/^\d+(\.\d+)?$/,b)},isFloatUp:function(a,b){return da.isMatch(a,/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,b)},isFloat0Lower:function(a,b){return da.isMatch(a,/^((-\d+(\.\d+)?)|(0+(\.0+)?))$/,b)},isFloatLower:function(a,b){return da.isMatch(a,/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/,b)},isLetter:function(a,b){return da.isMatch(a,/^[A-Za-z]+$/,b)},isLetterUpper:function(a,b){return da.isMatch(a,/^[A-Z]+$/,b)},isLetterLower:function(a,b){return da.isMatch(a,/^[a-z]+$/,b)},isNumLetter:function(a,b){return da.isMatch(a,/^[A-Za-z0-9]+$/,b)},isCode:function(a,b){return da.isMatch(a,/^\w+$/,b)},isCN:function(a,b){return da.isMatch(a,/^[\u4e00-\u9fa5]*$/,b)},isName:function(a,b){return da.isMatch(a,/^[a-zA-Z\u4e00-\u9fa5_]*$/,b)},isAccount:function(a,b){return da.isMatch(a,/^[\w\u4e00-\u9fa5]*$/,b)},isPhone:function(a,b){return da.isMatch(a,/^(((\+86)|(86))?(13[0-9]|15[0|1|2|3|5|6|7|8|9]|18[2|6|7|8|9])\d{8}|(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/,b)},isMobile:function(a,b){return da.isMatch(a,/^((\+86)|(86))?(13[0-9]|15[0|1|2|3|5|6|7|8|9]|18[2|6|7|8|9])\d{8}$/,b)},isIDCard:function(a,b){return da.isMatch(a,/^\d{18}$|^\d{15}$/,b)},isBankCard:function(a,b){return da.isMatch(a,/^\d{19}$/,b)},isEmail:function(a,b){return da.isMatch(a,/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,b)},isPostCode:function(a,b){return da.isMatch(a,/^[1-9]{1}(\d+){5}$/,b)},isIP:function(a,b){return da.isMatch(a,/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/,b)},isHTTP:function(a,b){return da.isMatch(a,/^[a-zA-z]+:(\/|\\){2}[^\s]*$/,b)},isHTML:function(a,b){return da.isMatch(a,/<(S*?)[^>]*>.*?|< .*? \/>/,b)}});(function(d,e){var f=d.document;var g=(function(){var c=function(a){if("string"==typeof a||a&&"undefined"!=typeof a.nodeType)return c.valid(a);else return new c.fnStruct.init(a)};c.fnStruct=c.prototype={version:"daValid \n author:danny.xu \n date:2011/7/3 10:54:29",targetObj:null,infoObj:null,setting:{target:null,valid:"",validinfo:"",empty:true,regexp:null,valid:null,simple:false,css:'border:1px solid #f00;height:16px;line-height:16px;font-size:12px;color:#f00;background:#fffcee;padding:3px;margin:3px;'},init:function(a){a=this.setting=da.extend({},this.setting,a);this.targetObj=da(a.target).dom[0]||null;if(!this.targetObj)return;var b=a.valid||this.targetObj.getAttribute("valid")||"";b=b.split(",");a.valid=b[0]||a.valid;a.empty=b[1]||a.empty;if("true"===a.empty||true===a.empty)a.empty=true;else a.empty=false;if(b[2])a.regexp=new RegExp(b[2]);a.valid=da.isFunction(a.valid)?a.valid:c.mapFnValid[a.valid];a.validinfo=a.validinfo||this.targetObj.getAttribute("validinfo")||this.targetObj.getAttribute("daTip");this.bindEvent();da.data(a.target,"daValid",this)},bindEvent:function(){var a=this;da(this.targetObj).bind("blur",function(){a.valid()});da(this.targetObj).bind("keyup",function(){a.valid()})},valid:function(){var a=this.targetObj.value,fnValid=this.setting.valid;if(!fnValid){return};var b=fnValid.call(this.targetObj,a,this.setting.empty,this.setting.regexp);if(!b)this.show();else this.hide();return b},show:function(){if(this.infoObj){if(this.setting.simple)this.infoObj.style.display="inline-block";else this.infoObj.show()}else{var a='<span style="color:#c00;font-family:arial;font-size:14px;font-weight:bold;">(!)</span>&nbsp;&nbsp;'+(this.setting.validinfo||"数据格式不正确");if("undefined"!=typeof daTip&&!this.setting.simple){this.infoObj=daTip({target:this.targetObj,html:a,close:false,bg:"#f7f7f7",color:"#444"})}else{var b=f.createElement("span");b.style.cssText=this.setting.css;b.style.display="inline-block";b.innerHTML=a;this.targetObj.parentNode.insertBefore(b,this.targetObj.nextSibling);this.infoObj=b;this.setting.simple=true}}},hide:function(){if(this.infoObj){if(this.setting.simple){this.infoObj.style.display="none"}else this.infoObj.hide()}}};c.fnStruct.init.prototype=c.prototype;return c})();g.valid=function(b){var c=da(b),res=null;if(0<c.dom.length){res=true;c.each(function(){var a=da.data(this,"daValid");if(null!=a){res=res&&a.valid()}else{a=g({target:this});res=res&&a.valid()}})}return res};g.form=function(a){var b=da(a);if(0<b.dom.length){da("input[valid],textarea[valid]",b).each(function(){g({target:this})})}};g.all=function(){return g.valid("input[valid],textarea[valid]")};g.mapFnValid={match:da.isMatch,int:da.isInt,plusint:da.isIntUp,plusint0:da.isInt0Up,minusint:da.isIntLower,minusint0:da.isInt0Lower,float:da.isFloat,plusfloat:da.isFloatUp,plusfloat0:da.isFloat0Up,minusfloat:da.isFloatLower,minusfloat0:da.isFloat0Lower,abc:da.isLetter,upperabc:da.isLetterUpper,lowerabc:da.isLetterLower,abcnumber:da.isNumLetter,code:da.isCode,cn:da.isCN,name:da.isName,account:da.isAccount,phone:da.isPhone,mobile:da.ismobile,email:da.isEmail,http:da.isHTTP,html:da.isHTML,postcode:da.isPostCode,idcard:da.isIDCard,backcard:da.isBankCard,ip:da.isIP};d.daValid=g})(window);