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
<style scoped>
    /* css（省略）*/
</style>