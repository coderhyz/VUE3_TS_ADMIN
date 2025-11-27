<template>
    {{ userStore.username }} 欢迎您！
    <img :src="userStore.avatar" alt="">
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
const userStore = useUserStore();

</script>

<style lang="scss" scoped>
img {
    width: 100px;
    height: 100px;

}
</style>