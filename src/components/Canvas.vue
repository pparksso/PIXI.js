<template>
    <div class="canvas-box">
        <canvas id="canvas" ref="canvasRef"></canvas>
    </div>
</template>
<script lang="ts" setup>
import * as PIXI from 'pixi.js'
import {onMounted, ref, watch, watchEffect} from 'vue'
import {storeToRefs} from 'pinia'
import {useTextStore} from '../stores/text'

const {text01, text02, text03, fontSize, fontColor, x, y, fontSize01, fontColor01, x01, y01, fontSize02, fontColor02, x02, y02, fontSize03, fontColor03, x03, y03,active01, active02, active03} = storeToRefs(useTextStore());

let app: PIXI.Application;
let contents01: PIXI.Text;
let contents02: PIXI.Text;
let contents03: PIXI.Text;
let textStyle01: PIXI.TextStyle;
let textStyle02: PIXI.TextStyle;
let textStyle03: PIXI.TextStyle;
let line: PIXI.Graphics;

let moveX01:number;
let moveY01:number;
let moveX02:number;
let moveY02:number;
let moveX03:number;
let moveY03:number;
let moving01 = ref(false);
let moving02 = ref(false);
let moving03 = ref(false);

let reLine: (contents: PIXI.Text) => void;

const canvasRef = ref<HTMLCanvasElement>();

onMounted(() => {
    app = new PIXI.Application({
    background: 'ffffff',
    view:canvasRef.value,
    width:1400,
    height:1100
    })
    textStyle01 = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontWeight: 'bold',
        fill: '#333333',
        wordWrap: true,
        wordWrapWidth: 440,
        lineJoin: 'round',
    })
    textStyle02 = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontWeight: 'bold',
        fill: '#333333',
        wordWrap: true,
        wordWrapWidth: 440,
        lineJoin: 'round',
    })
    textStyle03 = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontWeight: 'bold',
        fill: '#333333',
        wordWrap: true,
        wordWrapWidth: 440,
        lineJoin: 'round',
    })
    contents01 = new PIXI.Text(text01.value, textStyle01);
    contents01.eventMode = 'dynamic';
    contents01.x = 50;
    contents01.y = 220;

    contents02 = new PIXI.Text(text02.value, textStyle02);
    contents02.eventMode='dynamic'
    contents02.x = 400;
    contents02.y = 440;

    contents03 = new PIXI.Text(text03.value, textStyle03);
    contents03.eventMode='dynamic'
    contents03.x = 600;
    contents03.y = 800;

    line = new PIXI.Graphics();

    app.stage.addChild(contents01)
    app.stage.addChild(contents02)
    app.stage.addChild(contents03)
    app.stage.addChild(line)

    const minPositionX01 = contents01.width / 2;
    const minPositionY01 = contents01.height / 2;
    const maxPositionX01 = app.view.width - contents01.width / 2;
    const maxPositionY01 = app.view.height - contents01.height / 2;

    let prevData01 = { x: 0, y:0 }; 
    contents01.on('click',() => {
        active01.value = true;
        active02.value = false;
        active03.value = false;
        fontSize.value = String(contents01.style.fontSize);
        fontColor.value = String(contents01.style.fill);
        x.value = String(contents01.x);
        y.value = String(contents01.y);
    })
    contents02.on('click',() => {
        active01.value = false;
        active02.value = true;
        active03.value = false;
        fontSize.value = String(contents02.style.fontSize);
        fontColor.value = String(contents02.style.fill);
        x.value = String(contents02.x);
        y.value = String(contents02.y);
    })
    contents03.on('click', () => {
        active01.value = false;
        active02.value = false;
        active03.value = true;
        fontSize.value = String(contents03.style.fontSize);
        fontColor.value = String(contents03.style.fill);
        x.value = String(contents03.x);
        y.value = String(contents03.y);
    })  
    contents01.on('pointerdown',(e) => {
        moving01.value = true;
        contents01.zIndex = 1;
        prevData01 = e.data.getLocalPosition(contents01.parent);
    });
    contents01.on('pointermove',(e) => {
        if(moving01.value) {
            contents01.x = contents01.x + e.movementX;
            contents01.y = contents01.y + e.movementY;
            x.value = String(contents01.x);
            y.value = String(contents01.y);
            // const newPosition = e.data.getLocalPosition(contents01.parent);
            // const deltaX = newPosition.x - prevData01.x;
            // const deltaY = newPosition.y - prevData01.y;
            // const newX = contents01.x + deltaX;
            // const newY = contents01.y + deltaY;

            // contents01.x = Math.max(minPositionX01, Math.min(newX, maxPositionX01));
            // contents01.y = Math.max(minPositionY01, Math.min(newY, maxPositionY01));

            // prevData01 = newPosition;
            reLine(contents01);
        }
    });
    contents01.on('pointerup',() => {
        contents01.zIndex = 0;
        moving01.value = false;
    });
    contents01.on('pointerupoutside',() => {
        contents01.zIndex = 0;
        moving01.value = false;
    });
    contents02.on('pointerdown',() => {
        contents02.zIndex = 1;
        moving02.value = true;
    });
    contents02.on('pointermove',(e:PointerEvent) => {
        if(moving02.value) {
            contents02.x = contents02.x + e.movementX;
            contents02.y = contents02.y + e.movementY; 
            x.value = String(contents02.x);
            y.value = String(contents02.y);
            reLine(contents02);
        }
    });
    contents02.on('pointerup',() => {
        contents02.zIndex = 0;
        moving02.value = false;
    });
    contents02.on('pointerupoutside',() => {
        contents02.zIndex = 0;
        moving02.value = false;
    });
    contents03.on('pointerdown',() => {
        contents03.zIndex = 1;
        moving03.value = true;
    });
    contents03.on('pointermove',(e:PointerEvent) => {
        if(moving03.value) {
        contents03.x = contents03.x + e.movementX;
        contents03.y = contents03.y + e.movementY;
        x.value = String(contents03.x);
        y.value = String(contents03.y);
        reLine(contents03)
      }  
    });
    contents03.on('pointerup',() => {
        contents03.zIndex = 0;
        moving03.value = false;
    });
    contents03.on('pointerupoutside',()=> {
        contents03.zIndex = 0;
        moving03.value = false;
    })
    canvasRef.value?.addEventListener('click',(e:MouseEvent) => {
    const canvasRect = canvasRef.value?.getBoundingClientRect();
    let canvasLeft: number = 0;
    let canvasTop: number = 0;
    if(canvasRect) {
        canvasLeft = canvasRect?.left + window.scrollX;
        canvasTop = canvasRect?.top + window.scrollY;
    }
    const relativeX = e.clientX - canvasLeft;
    const relativeY = e.clientY - canvasTop;
    const bounds01 = contents01.getBounds();
    const bounds02 = contents02.getBounds();
    const bounds03 = contents03.getBounds();
    const result01 = bounds01.contains(relativeX, relativeY);
    const result02 = bounds02.contains(relativeX, relativeY);
    const result03 = bounds03.contains(relativeX, relativeY);
    if(!result01 && !result02 && !result03) {
        active01.value = false;
        active02.value = false;
        active03.value = false;
        line.clear()
    }
})
});

reLine = (contents:PIXI.Text) => {
    line.clear();
    line.lineStyle(3, 0xff00ff)
    line.drawRect(contents.x -5, contents.y - 5, contents.width + 10, contents.height + 10);
}

watch(text01, (newText01) => {
    contents01.text = newText01;
    if(newText01.length > 0 && active01.value) {
        reLine(contents01)
    } 
});
watch(text02, (newText02) => {
    contents02.text = newText02;
    if(newText02.length > 0 && active02.value) {
        reLine(contents02)
    }
});
watch(text03, (newText03) => {
    contents03.text = newText03;
    if(newText03.length > 0 && active03.value) {
        reLine(contents03)
    }
})
watch(fontSize01,(newSize) => {
    contents01.style.fontSize = Number(newSize);
    reLine(contents01)
})
watch(fontSize02,(newSize) => {
    contents02.style.fontSize = Number(newSize);
    reLine(contents02)
})
watch(fontSize03,(newSize) => {
    contents03.style.fontSize = Number(newSize);
    reLine(contents03)
})
watch(fontColor01,(newColor01) => {
    contents01.style.fill = newColor01
})
watch(fontColor02,(newColor02) => {
    contents02.style.fill = newColor02
})
watch(fontColor03,(newColor03) => {
    contents03.style.fill = newColor03
})
watch(x01, (newX01) => {
    contents01.x = Number(newX01);
    reLine(contents01);
})
watch(x02, (newX02) => {
    contents02.x = Number(newX02);
    reLine(contents02);
})
watch(x03, (newX03) => {
    contents03.x = Number(newX03);
    reLine(contents03);
})
watch(y01,(newY01) => {
    contents01.y = Number(newY01);
    reLine(contents01);
})
watch(y02,(newY02) => {
    contents02.y = Number(newY02);
    reLine(contents02);
})
watch(y03,(newY03) => {
    contents03.y = Number(newY03);
    reLine(contents03);
})
watch(active01,(newActive01) => {
    if(newActive01) {
        reLine(contents01)}
})
watch(active02,(newActive02) => {
    if(newActive02) {
        reLine(contents02)}
})
watch(active03,(newActive03) => {
    if(newActive03) {
        reLine(contents03)}
})
</script>
<style lang="scss" scoped>
.canvas-box {
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>