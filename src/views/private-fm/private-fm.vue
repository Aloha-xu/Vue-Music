<template>
  <div class="private-fm">
    <div class="content_">
      <div class="fm-content">
        <div class="record-tools">
          <div class="record">
            <div class="pic">
              <img :src="currentSongInfo.pic" class="current-pic" />
              <i
                class="el-icon-caret-right play-button"
                v-show="!playing || !goblePlayingState"
                @click="handlePlayingState"
              ></i>
              <img
                src="../../assets/icon/controltools/stop.png"
                alt=""
                v-show="playing && goblePlayingState"
                class="stop-button"
                @click="handlePlayingState"
              />
            </div>
          </div>
          <div class="tools">
            <div class="heart">
              <img
                src="../../assets/icon/heart.svg"
                alt=""
                v-show="false"
                style="height: 30px; weight: 30px"
              />
              <img
                src="../../assets/icon/heartactive.svg"
                alt=""
                style="height: 30px; weight: 30px"
              />
            </div>
            <div class="delete">
              <i class="el-icon-delete" style="font-size: 30px"></i>
            </div>
            <div class="next" @click="nextSong">
              <i class="el-icon-caret-right" style="font-size: 30px"></i>
            </div>
            <div class="more">
              <i class="el-icon-more" style="font-size: 30px"></i>
            </div>
          </div>
        </div>
        <div class="song-info">
          <div class="song-name">{{ currentSongInfo.name }}</div>
          <div class="album-name">
            专辑：<span>{{ currentSongInfo.album }}</span>
          </div>
          <div class="singer-name">
            歌手：<span v-for="item in currentSongInfo.singer" :key="item.id">{{
              item.name
            }}</span>
          </div>
          <!-- 纯音乐的时候显示为该音乐为纯音乐的文字 -->
          <div
            class="lyric"
            ref="lyric"
            id="lyric"
            v-show="currentSongInfo.lyric"
          >
            <div
              v-for="(item, index) in currentSongInfo.lyric"
              :key="index"
              class="lyric-item"
              :class="syncLyricToTime(item, index) ? 'lyric-active' : ''"
            >
              {{ item.content }}
            </div>
          </div>
          <div class="noLyric" v-show="!currentSongInfo.lyric">纯音乐</div>
        </div>
      </div>
      <div class="comment">
        <comment
          :commentInfo="commentInfo"
          @refeshCommrnt="getCommentInfo"
        ></comment>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "../../components/common/comment.vue";
import { parseLyric } from "../../utils/lyric";
import {
  fm,
  getSongUrl,
  getSongLyric,
  getMusicComment,
} from "../../network/api";
export default {
  name: "PrivateFM",
  data() {
    return {
      textarea: "",
      commentInfo: [],
      currentSongInfo: null,
      playing: true,
      playList: [],
      tag: true,
    };
  },
  components: {
    Comment,
  },
  methods: {
    //私人fm接口数据
    async getSongInfo() {
      const { data } = await fm();
      const Urls = await getSongUrl(data.data.map(({ id }) => id));
      for (let i = 0; i < data.data.length; i++) {
        let currentSongInfo = {};
        currentSongInfo.id = data.data[i].id;
        currentSongInfo.url = "";
        for (let j = 0; j < Urls.data.data.length; j++) {
          if (Urls.data.data[j].id == currentSongInfo.id) {
            currentSongInfo.url = Urls.data.data[j].url;
          }
        }
        currentSongInfo.name = data.data[i].name;
        currentSongInfo.album = data.data[i].album.name;
        currentSongInfo.singer = [];
        for (let j = 0; j < data.data[i].artists.length; j++) {
          currentSongInfo.singer[j] = {
            name: data.data[i].artists[j].name,
            id: data.data[i].artists[j].id,
          };
        }
        currentSongInfo.pic = data.data[i].album.blurPicUrl;
        currentSongInfo.totleTime = data.data[i].duration;
        currentSongInfo.lyric = null;
        this.playList.push(currentSongInfo);
      }
      this.currentSongInfo = this.playList[0];
      this.getCommentInfo();
      this.getLyricInfo();
      this.$store.commit("setAllSongsToPlayList", this.playList);
      this.$store.commit("changeCurrentPlay", this.currentSongInfo);
      this.$store.commit("setIsLoad", true);
    },

    handlePlayingState() {
      if (this.playing) {
        this.$store.commit("stop");
      } else {
        this.$store.commit("play");
      }
      this.playing = !this.playing;
    },

    async getCommentInfo() {
      let comment = await getMusicComment(this.currentSongInfo.id);
      this.commentInfo = comment.data.comments;
    },

    async getLyricInfo() {
      let lyric = await getSongLyric(this.currentSongInfo.id);
      this.currentSongInfo.lyric = parseLyric(lyric.data.lrc.lyric);
    },

    //点击下一首歌曲按钮
    nextSong() {
      //判断是否是最后一首
      //是 --》请求数据     不是 --》切下一首
      if (this.currentSongIndex === this.playList.length - 1) {
        //清除原有的数据
        this.currentSongInfo = null;
        this.playList = [];
        this.$store.commit("setCurrentIndex", 0);
        this.playing = true;
        //再一次请求数据
        this.getSongInfo();
      } else {
        this.playing = true;
        this.$store.commit("setCurrentIndex", this.currentSongIndex + 1);
        this.currentSongInfo = this.playList[this.currentSongIndex];
        this.$store.commit("changeCurrentPlay", this.currentSongInfo);
        this.getCommentInfo();
        this.getLyricInfo();
      }
    },

    syncLyricToTime(values, index) {
      let flag = false;
      let currentTime = parseInt(this.$store.state.currentTime / 1000);
      if (
        currentTime >= values.time &&
        currentTime < this.currentSongInfo.lyric[index + 1].time &&
        index <= this.currentSongInfo.lyric.length
      ) {
        flag = true;
      }
      return flag;
    },
  },
  computed: {
    goblePlayingState() {
      return this.$store.state.playing;
    },
    currentSongIndex() {
      return this.$store.state.currentIndex;
    },
    isTagMinPlayerToNext() {
      return this.$store.state.isTagMinPlayerToNext;
    },
    //watch监听computed
    //如果这里写currentPlayTime代码就会报错 重复key
    //我觉得就是watch监听了maxplay的currentPlayTime--有一个key
    //如果这里也用watch监听currentPlayTime他的话就重复了
    currentTime() {
      return this.$store.state.currentTime;
    },
  },
  async created() {
    this.$store.state.isShowFmPlayer = true;
    this.getSongInfo();
  },
  activated() {
    this.$store.state.isShowFmPlayer = true;
    this.getSongInfo();
  },
  // beforeDestroy() {
  //   this.$store.state.isShowFmPlayer = false;
  // },
  //通过监听minplayer的下一首触发fm组件里面的next函数
  watch: {
    isTagMinPlayerToNext() {
      this.nextSong();
    },
    currentTime() {
      let offset = 36;
      let lyric = this.$refs.lyric;
      let currentIndex = this.$store.state.currentSongInfo.lyric.findIndex(
        (item) => parseInt(this.currentTime / 1000) === item.time
      );
      if (
        currentIndex <= 4 ||
        currentIndex + 4 === this.$store.state.currentSongInfo.lyric.length
      ) {
        return;
      }
      lyric.scrollTop = (currentIndex - 4) * offset;
    },
  },
};
</script>

<style scoped lang='scss'>
.private-fm {
  display: flex;
  justify-content: center;
  height: 100vh;
  overflow: scroll;
  //如果需要用flex居中一个box 要给他父元素一个width 否者父元素大小就是子元素大小 这样怎么都不能居中效果
  width: 100%;
  .content_ {
    width: 1100px;
    
    .fm-content {
      width: 1100px;
      display: flex;
      .record-tools {
        width: 50%;
        .record {
          width: 100%;
          height: 320px;
          .pic {
            height: 320px;
            margin-top: 80px;
            position: relative;
            .current-pic {
              width: 300px;
              height: 300px;
              z-index: 998;
              position: absolute;
              left: 200px;
              top: 0;
            }
            .next-pic {
              width: 250px;
              height: 250px;
              position: absolute;
              left: 170px;
              top: 25px;
            }
            .play-button {
              position: absolute;
              left: 330px;
              top: 125px;
              z-index: 999;
              background-color: white;
              border: 1px solid white;
              border-radius: 50%;
              padding: 8px;
              font-size: 30px;
            }
            .stop-button {
              position: absolute;
              left: 460px;
              top: 260px;
              z-index: 999;
              background-color: white;
              border: 1px solid white;
              border-radius: 50%;
              padding: 8px;
              font-size: 30px;
            }
          }
        }
        .tools {
          display: flex;
          text-align: center;
          margin-top: 10px;
          margin-left: 100px;
          justify-content: center;
          .heart,
          .more,
          .next,
          .delete {
            margin: 10px;
            margin-top: 25px;
            margin-left: 25px;
            border: 1px solid gray;
            border-radius: 50%;
            padding: 5px 6px;
          }
        }
      }
      .song-info {
        width: 45%;
        height: 50%;
        padding-top: 40px;
        text-align: center;
        .song-name {
          font-size: x-large;
        }
        .album-name,
        .singer-name {
          width: 200px;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 15px 0;
          span {
            color: rgb(101, 85, 247);
            cursor: pointer;
          }
        }
        .lyric {
          overflow: scroll;
          overflow-x: hidden;
          overflow-y: hidden;
          height: 350px;
          .lyric-item {
            font-size: medium;
            margin: 20px 0;
          }
          .lyric-active {
            font-weight: 900;
            font-size: large;
            font-family: "Franklin Gothic Medium", "Arial Narrow", Arial,
              sans-serif;
          }
          &:hover {
            overflow-y: auto;
          }
        }
      }
    }
    .comment {
      width: 1100px;
      margin-top: 40px;
      top: 550px;
      .title {
        font-size: x-large;
        padding-bottom: 20px;
      }
    }
  }
}
</style>