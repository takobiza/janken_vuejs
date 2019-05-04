<template>
    <div id="game">
 
        <div v-if="resultMessage" class="result">
            <h2>{{ resultMessage }}</h2>
            <div><button v-on:click="start">もういちど</button></div>
        </div>
 
        <div class="imgArea"><img v-bind:src="src" alt=""></div>
        <ul class = "buttons">
            <li>
                <button v-on:click="onSelected" class="button" type="button" value="0">グー</button>
            </li>
            <li>
                <button v-on:click="onSelected" class="button" type="button" value="1">チョキ</button>
            </li>
            <li>
                <button v-on:click="onSelected" class="button" type="button" value="2">パー</button>
            </li>
        </ul>
    </div>
</template>
<script>
 
    import * as babel from 'babel-core';
    let storage = localStorage;
 
    export default {
        name: 'game',
        props: ['scores'],
        data() {
            return {
                src : 'dist/imgs/janken_choki.png',
                imgList: [
                    'dist/imgs/janken_gu.png',
                    'dist/imgs/janken_choki.png',
                    'dist/imgs/janken_pa.png'
                ],
                timer: null,
                resultMessage: ''
            }
        },
        created () {
            this.start();
        },
        methods: {
            changeImg(number) {
                // 画像の切替
                if(number && Math.abs(number) <= this.imgList.length) {
                    this.src = this.imgList[number];
                } else {
                    var num = Math.floor(Math.random() * this.imgList.length);
                    this.src = this.imgList[num];
                }
            },
            start () {
                this.reset();
                this.timer = setInterval(() => {
                            this.changeImg();
            }, (1000 / 12));
            },
            onSelected(e) {
 
                clearInterval(this.timer);
 
                let button = e.target;
                let resultNum = parseInt(this.imgList.indexOf(this.src), 10);
                let selectNum = parseInt(button.value, 10);
                let decision = this.decisionJanken(selectNum, resultNum);
 
                var btns = document.querySelectorAll('.button');
                for( let btn of btns ) {
                    btn.setAttribute('disabled', true);
                }
 
                if(decision == 1) {
                    this.resultMessage = 'かち';
                } else if (decision == 2){
                    this.resultMessage = 'ひきわけ';
                } else {
                    this.resultMessage = 'まけー';
                }
                this.$parent.$data.scores.push({ message: this.resultMessage });
 
                button.classList.add('is-selected');
            },
            reset() {
                var btns = document.querySelectorAll('.button');
                for( let btn of btns ) {
                    btn.removeAttribute('disabled');
                    btn.classList.remove('is-selected');
                }
                this.resultMessage = '';
            },
            decisionJanken(myHand, youHand) {
                let result = 0; 
                let hand = myHand - youHand;

                switch((hand+3)%3) {
                    case 0:
                      result = 2
                      break
                    case 1:
                      result = 0
                      break
                    case 2:
                      result = 1
                      break
                }
                return result;
            }
        }
    }
</script>
<style scoped lang="scss">
    .imgArea{
      
      display: flex;
      width: 298px;
      height: 298px;
      margin: auto;
      text-align: center;
      font-weight: bold;
      border: solid 5px #6091d3;/*線*/
      border-radius: 10px;
      align-items: center;
      justify-content: center;
      img{
        width: 250px;
        height: 250px;
      }
    }
    
    .buttons {
      text-align: center;
    }

    .buttons li{
      display: inline-block;
    }

    .buttons button {
      font-size: 32px;
      border: 1px solid #00e8ee;
      border-radius: 5px;
      background: none;
      cursor: pointer;
      padding: 10px;
      font-family: "Nico Moji";
      background: #aceee9;
      margin-right: 24px;
      &:hover{
        color: red;
      }
    }

    .result {
      text-align: center;
    }

    .result button{
      font-size: 20px;
      border: 1px solid #00e8ee;
      border-radius: 5px;
      background: none;
      cursor: pointer;
      padding: 10px;
      font-family: "Nico Moji";
      background: #aceee9;
      margin-bottom: 20px;
    }

</style>