<template>
    <div id="game">
 
        <div v-if="resultMessage" class="result">
            <h2>{{ resultMessage }}</h2>
            <div><button v-on:click="start">もういちど</button></div>
        </div>
 
        <div class="imgArea"><img v-bind:src="src" alt=""></div>
        <ul>
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
                src : 'dist/imgs/choki.png',
                imgList: [
                    'dist/imgs/gu.png',
                    'dist/imgs/choki.png',
                    'dist/imgs/par.png'
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
<style scoped>
    /* CSS 省略 */
</style>