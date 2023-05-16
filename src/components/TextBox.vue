<template>
    <div class="text-box">
        <textarea name="" id="" placeholder="1" ref="text01Ref" @input="text01Handler" @focus="focusHandler(0)" :class="{active:active01}" ></textarea>
        <textarea name="" id="" placeholder="2" ref="text02Ref" @input="text02Handler" @focus="focusHandler(1)" :class="{active:active02}"></textarea>
        <textarea name="" id="" placeholder="3" ref="text03Ref" @input="text03Handler" @focus="focusHandler(2)" :class="{active:active03}"></textarea>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import {storeToRefs} from 'pinia'
import { useTextStore } from '../stores/text'

const {text01, text02, text03, active01, active02, active03} = storeToRefs(useTextStore());

const text01Ref = ref<HTMLTextAreaElement>();
const text02Ref = ref<HTMLTextAreaElement>();
const text03Ref = ref<HTMLTextAreaElement>();

const text01Handler = (e:Event) => {
    const { value } = e.target as HTMLTextAreaElement; 
    text01.value = value
}
const text02Handler = (e:Event) => {
    const { value } = e.target as HTMLTextAreaElement; 
    text02.value = value;
}
const text03Handler = (e:Event) => {
    const { value } = e.target as HTMLTextAreaElement; 
    text03.value = value;
}

const focusHandler = (idx:Number) => {
    const actives = [active01, active02, active03];
    actives.forEach((item, index) => {
        index === idx ? item.value = true : item.value = false;
    })
}
</script>
<style lang='scss' scoped>
.text-box {
    width: 40%;
    textarea {
        padding: 20px;
        font-size: 18px;
        outline: none;
        width: 80%;
        height: 300px;
        resize: none;
        &:not(&:first-child) {
            margin-top: 50px;
        }
        &.active {
            border: 2px solid #ff0000;
        }
    }
}
</style>
