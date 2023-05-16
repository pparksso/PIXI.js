<template>
    <div class="tool-box">
        <div class="tool-box--item"><label for="">font-size</label><input type="text" @change="fontSizeHandler" :value="fontSize" placeholder="숫자로 입력"></div>
        <div class="tool-box--item"><label for="">font-color</label><input type="text" @change="fontColorHandler" :value="fontColor" placeholder="#000000"></div>
        <div class="tool-box--item"><label for="">x</label><input type="text" :value="x" @change="xHandler" placeholder="숫자로 입력"></div>
        <div class="tool-box--item"><label for="">y</label><input type="text" :value="y" @change="yHandler" placeholder="숫자로 입력"></div>
        <!-- <button>변경</button> -->
    </div>
</template>
<script setup lang="ts">
import { watch } from 'vue'
import {storeToRefs} from 'pinia'
import {useTextStore} from '../stores/text'

const { fontSize, fontColor, x, y, active01, active02, active03, fontSize01, fontSize02, fontSize03, fontColor01, fontColor02, fontColor03, x01, x02, x03, y01, y02, y03 } = storeToRefs(useTextStore());

const fontSizeHandler = (e:Event) => {
    const {value} = e.target as HTMLInputElement;
    active01.value ? (fontSize01.value = value) : active02.value ? (fontSize02.value = value) : (fontSize03.value = value);
}
const fontColorHandler = (e:Event) => {
    const {value} = e.target as HTMLInputElement;
    active01.value ? (fontColor01.value = value) : active02.value? (fontColor02.value = value) : (fontColor03.value = value);
}
const xHandler = (e:Event) => {
    const {value} = e.target as HTMLInputElement;
    active01.value ? (x01.value = value) : active02.value ? x02.value = value : x03.value = value
}
const yHandler = (e:Event) => {
    const {value} = e.target as HTMLInputElement;
    active01.value ? y01.value = value : active02.value ? y02.value = value : y03.value = value
}

watch([active01, active02, active03],([newActive01, newActive02, newActive03]) => {
    if(newActive01) {
        fontSize.value = fontSize01.value;
        fontColor.value = fontColor01.value;
        x.value = x01.value;
        y.value = y01.value;
    } else if(newActive02) {
        fontSize.value = fontSize02.value;
        fontColor.value = fontColor02.value;
        x.value = x02.value;
        y.value = y02.value;
    } else if(newActive03) {
        fontSize.value = fontSize03.value;
        fontColor.value = fontColor03.value;
        x.value = x03.value;
        y.value = y03.value;
    } else {
        fontSize.value = '';
        fontColor.value = '';
        x.value = '';
        y.value = '';
    }
})
</script>
<style lang="scss" scoped>
.tool-box {
    display: flex;
    padding: 30px 100px;
    align-items: center;
    &--item {
        margin-right: 30px;
        label {
            margin-right: 5px;
        }
        input {
            width: 150px;
        }
    }
    button {
        padding: 2px 5px;
        cursor: pointer;
        border: 1px solid #333;
        background-color: #fff;
    }
}
</style>