<template>
    <div id="score">
        <h2>せいせき</h2>
        <div><button type="button" v-on:click.prevent="dataReset">クリア</button></div>
        <ul v-if="scores">
            <li v-for="(score, i) of $parent.$data.scores" :key="i">
                <span>{{ i+1 }}:</span>
                {{ score.message }}
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'score',
        props: ['scores'],
        data() {
            return {}
        },
        methods: {
            dataReset() {
                this.$parent.$data.scores = [];
            }
        }
    };
</script>
<style scoped lang="scss">
    #score{
      text-align: center;
      h2 {
        font-size: 32px;
      }
      button {
        font-size: 16px;
        border: 1px solid #00e8ee;
        border-radius: 5px;
        background: none;
        cursor: pointer;
        padding: 10px;
        font-family: "Nico Moji";
        background: #ccc;
        margin-right: 24px;
      }
      ul{
        li{
          font-size: 20px;
          width: 145px;
          text-align: left;
          margin: 0 auto;
          list-style: none;
        }
      }

    }
</style>
