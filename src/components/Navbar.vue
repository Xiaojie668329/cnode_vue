<template lang="html">
  <div class="nav-bar fixedBar" >
    <div class="header">
      <span class="user-pic" @click.stop='login'><img class="user-pic" :src="avatar_url" alt="user-pic"></span>
      <span class="logo"><img src="../assets/cnodejs_light.svg" alt=""></span>
      <span class="add-topic" @click='publish'><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
    </div>
    <div class="tab">
      <a :class="{current_tab: isCurrent==='all'}" @click.stop='changeTab("all")'><span>全部</span></a>
      <a :class="{current_tab: isCurrent==='good'}" @click.stop='changeTab("good")'><span>精华</span></a>
      <a :class="{current_tab: isCurrent==='share'}" @click.stop='changeTab("share")'><span>分享</span></a>
      <a :class="{current_tab: isCurrent==='ask'}" @click.stop='changeTab("ask")'><span>问答</span></a>
      <a :class="{current_tab: isCurrent==='job'}" @click.stop='changeTab("job")'><span>招聘</span></a>
      <a :class="{current_tab: isCurrent==='dev'}" @click.stop='changeTab("dev")'><span>测试</span></a>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import axios from 'axios';
import toast from '../common/utils/toast';

export default {
  name: 'navbar',
  computed: {
    ...mapState([
      'isCurrent',
      'isLogin',
      'avatar_url',
      'user_id',
      'loginname'
    ])
  },
  methods: {
    login () {
      if (!this.isLogin) {
        this.$router.push('/login')
      } else {
        axios.get(`https://cnodejs.org/api/v1/user/${this.loginname}`)
        .then( res => {
          this.$store.dispatch('checkUser', res.data.data)
          this.$router.push('/profile')
        })
        .catch(err => {
          console.log(err);
          toast('查看失败。', 100, 20, 1000)
        })
      }
    },
    changeTab (tab) {
      window.scrollTo(0, 0)
      this.$store.dispatch('isCurrent', tab)
      this.$store.dispatch('changeTopic', tab)
      this.$store.dispatch('resetLimit')
      this.$router.push(`/topics/${tab}`)

    },
    publish () {
      this.$router.push('/publish')
    }
  }
}
</script>

<style lang="css" scoped>
  div.nav-bar {
    height: 15%;
    width: 100%;
  }
  .fixedBar {
    position: fixed;
    z-index: 888;
    top: 0;
  }
  .header {
    text-align: center;
    display: flex;
    height: 70%;
    width: 100%;
    background: rgb(68, 68, 68);
  }
  div.header span.user-pic {
    flex: auto;
    width: 15%;
    /*flex添加边距会自动伸展空间*/
    padding: 5px;
  }
  span.add-topic {
    box-sizing: border-box;
    /*单行内联元素垂直居中：上下内边距相等。*/
    padding: 20px 0;
    flex: auto;
    width: 15%;
  }
  span.logo img {
    height: 100%;
    width: 100%;
  }
  span.logo {
    flex: auto;
    padding: 5px;
    width: 70%;
  }
  span.add-topic i {
    color: #ddd;
    font-size: 2.5em;
    /*margin-top: 50%;*/
  }
  span.user-pic img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
  div.tab {
    height: 30%;
    display: flex;
    background-color: #ddd;
  }
  div.tab a{
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #aaa;
    margin: 3px;
    padding: 2px 0;
    color: #333;
    text-decoration: none;
    font-size: 0.8em;
    flex: auto;
    text-align: center;
  }
  div.tab .current_tab {
    background-color: #80bd01;
  }
</style>
