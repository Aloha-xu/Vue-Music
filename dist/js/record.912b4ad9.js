(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["record"],{"870c":function(t,n,e){"use strict";e("b4b3")},"940c":function(t,n,e){"use strict";e.r(n);var s=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"user-record"},[e("div",{staticClass:"heard"},[e("span",{staticClass:"title"},[t._v("最近播放")]),e("span",{staticClass:"totle-songs"},[t._v("共"+t._s(t.songsInfo.length)+"首")]),e("span",{staticClass:"clean-btn",on:{click:t.cleanSongList}},[t._v("清空列表")])]),e("div",{staticClass:"play-all-btn"},[e("el-button",{attrs:{round:""},on:{click:t.handlePlayAllSongs}},[e("span",{staticClass:"el-icon-caret-right"},[t._v("播放全部")]),e("span",{staticClass:"el-icon-plus play-all"})])],1),e("div",{staticClass:"song-list"},[t._m(0),t._l(t.songsInfo,(function(n,s){return e("div",{key:s,staticClass:"song-item",class:n.id===t.currentId?"active":""},[e("div",{staticClass:"song-name",on:{click:function(e){return t.HandleSongClick(n,s)}}},[e("div",{staticClass:"index-number"},[t._v(" "+t._s(t.setIndex(s))+" ")]),e("span",[t._v(t._s(n.name))])]),e("div",{staticClass:"singer"},t._l(n.singer,(function(n,s){return e("span",{key:s,on:{click:function(e){return t.clickToSingerPapg(n.id)}}},[t._v(t._s(n.name)+" ")])})),0),e("div",{staticClass:"time"},[t._v("刚刚")])])}))],2)])},i=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"title-name"},[e("div",{staticClass:"title"},[e("span",[t._v("音乐标题")])]),e("div",[t._v("歌手")]),e("div",[t._v("播放时间")])])}],a=(e("96cf"),e("1da1")),r=e("8137"),c={name:"UserRecord",data:function(){return{}},methods:{init:function(){return Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},clickToSingerPapg:function(t){this.$router.push("/singerlistdetail/"+t)},HandleSongClick:function(t,n){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function s(){var i,a,c;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,Object(r["o"])(t.id);case 3:if(i=s.sent,!i.data.success){s.next=17;break}return e.$store.commit("changeCurrentPlay",t),e.$store.commit("setIsLoad","true"),s.next=9,Object(r["M"])(t.id);case 9:return a=s.sent,e.$store.state.SimiSongList=a.data.playlists,s.next=13,Object(r["y"])(t.id,100);case 13:c=s.sent,e.$store.state.commentInfo=c.data.comments,e.$store.commit("setToRecordSongList",t),e.currentId=n;case 17:s.next=22;break;case 19:s.prev=19,s.t0=s["catch"](0),alert("音乐没有版权");case 22:case"end":return s.stop()}}),s,null,[[0,19]])})))()},setIndex:function(t){var n=t+1;return n<10?"0"+n:n},handlePlayAllSongs:function(){this.$store.commit("setAllSongsToPlayList",this.songsInfo),this.$store.commit("changeCurrentPlay",this.songsInfo[0]),this.$store.commit("setIsLoad","true")},cleanSongList:function(){this.$store.commit("clearRecordSongList")}},created:function(){this.init()},computed:{songsInfo:function(){return this.$store.state.recordSongList},currentId:function(){return this.$store.state.currentSongInfo.id}}},o=c,l=(e("870c"),e("2877")),u=Object(l["a"])(o,s,i,!1,null,"3bd6311f",null);n["default"]=u.exports},b4b3:function(t,n,e){}}]);