import Vue from 'vue'
import VueRouter from 'vue-router';          
import App from './App.vue'
import Game from './components/Game.vue';    
import Score from './components/Score.vue';  
 
Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: '/game',
      component: Game
    },
    {
      path: '/score',
      component: Score
    },
    {
      path: '*',
      redirect: '/game'
    }
  ]
});
 
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
