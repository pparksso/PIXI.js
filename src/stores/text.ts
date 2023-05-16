import { defineStore } from 'pinia'
import {ref} from 'vue'

export const useTextStore = defineStore('text',() => {

    const text01 = ref('');
    const text02 = ref('');
    const text03 = ref('');
    
    const fontSize = ref('');
    const fontColor = ref('');
    const x = ref('');
    const y = ref('');
    const fontSize01 = ref('36');
    const fontColor01 = ref('#333333');
    const x01 = ref('50');
    const y01 = ref('220');
    const fontSize02 = ref('36');
    const fontColor02 = ref('#333333');
    const x02 = ref('400');
    const y02 = ref('440');
    const fontSize03 = ref('36');
    const fontColor03 = ref('#333333');
    const x03 = ref('600');
    const y03 = ref('800');

    const active01 = ref(false);
    const active02 = ref(false);
    const active03 = ref(false);

    return {
        text01,
        text02,
        text03,
        fontSize,
        fontColor,
        x,
        y,
        fontSize01,
        fontColor01,
        x01,
        y01,
        fontSize02,
        fontColor02,
        x02,
        y02,
        fontSize03,
        fontColor03,
        x03,
        y03,
        active01,active02,active03
    }
})