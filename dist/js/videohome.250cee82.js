(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["videohome"],{"53eb":function(t,e,n){"use strict";n("bf41")},"7e2f":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mv-home"},[n("div",{staticClass:"top-nav"},[n("span",{staticClass:"video-item",class:0===t.currentIndex?"active":"",on:{click:function(e){return t.turnShow(0)}}},[t._v("视频")]),n("span",{staticClass:"mv-item",class:1===t.currentIndex?"active":"",on:{click:function(e){return t.turnShow(1)}}},[t._v("MV")])]),n("keep-alive",[n("router-view")],1)],1)},s=[],r={name:"VideoHome",data:function(){return{currentIndex:0}},methods:{turnShow:function(t){switch(t){case 0:this.$router.push("/video"),this.currentIndex=t;break;case 1:this.$router.push("/mv"),this.currentIndex=t;break}}},activated:function(){this.turnShow(this.currentIndex)}},c=r,u=(n("53eb"),n("2877")),a=Object(u["a"])(c,i,s,!1,null,"f1248874",null);e["default"]=a.exports},bf41:function(t,e,n){}}]);