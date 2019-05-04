<template>
    <div id="app">
        <h1>じゃんけんゲーム</h1>
        <ul class="nav">
            <li><router-link to="/game">ゲーム</router-link></li>
            <li><router-link to="/score">せいせき</router-link></li>
        </ul>
        <div class="inner">
            <transition name="fade">
                <router-view scores="scores"></router-view>
            </transition>
        </div>
    </div>
</template>
 
<script>
    import Game from './components/Game.vue';
    import Score from './components/Score.vue';
    
    let storage = localStorage;
    console.log(storage.getItem('scores'));
    export default {
        name: 'app',
        data () {
            return {
                scores: JSON.parse(storage.getItem('scores')) || []
            };
        },
        watch: {
            scores : 'saveData'
        },
        components:{
            Game,
            Score
        },
        methods: {
            saveData() {
                storage.setItem('scores', JSON.stringify(this.scores));
            }
        }
    };
</script>
<style scoped lang="scss">
    @import url("https://fonts.googleapis.com/earlyaccess/nicomoji.css");

    #app {
      font-family: "Nico Moji";
    }

    h1{
      margin: 25px 0;
      text-align: center;
      font-size: 48px;
    }
    .nav {
      text-align: center;
    }
    .nav li{
      display: inline-block;
      margin-right: 32px;
    }
    .nav li a {
      padding: 5px 15px;
      font-size: 26px;
      text-decoration: none;
      background: #00e8ee;
      color: #333;
      &:hover{
        color: red;
      }
    }

    .nav li a.router-link-active {
      background: #2cb1ee;
      color: #fff;
    }
</style>