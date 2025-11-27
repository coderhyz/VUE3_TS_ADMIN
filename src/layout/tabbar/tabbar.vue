<template>
    <div class="tabbar-layout">
        <div class="tabbar-left">
            <BreadThumb />
        </div>
        <div class="tabbar-right">
            <Settings />
        </div>

    </div>
</template>

<script setup lang="ts">
import BreadThumb from './bread-thumb/bread-thumb.vue';
import Settings from './settings/settings.vue';


</script>

<style lang="scss" scoped>
.tabbar-layout {
    display: flex;
    justify-content: space-between;
    height: 100%;
    padding: 10px;
    border-bottom: 1px solid #000;


    .tabbar-left {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        // min-width: 553px;

    }

    .tabbar-right {
        display: flex;
        align-items: center;
        min-width: 225px;

    }
}
</style>