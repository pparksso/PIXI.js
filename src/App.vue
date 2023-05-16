<template>
    <Tools/>
    <div class="contents">
        <Canvas/>
        <TextBox/>
    </div>
</template>
<script setup>
import Tools from './components/Tools.vue';
import TextBox from './components/TextBox.vue';
import Canvas from './components/Canvas.vue';
</script>


<style lang="scss" scoped>
.contents {
    display: flex;
}
</style>
