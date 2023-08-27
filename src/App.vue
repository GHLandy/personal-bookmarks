<script setup lang="ts">
import { bookmarks } from '@/constants/bookmarks';
import { computed, onMounted } from 'vue';

onMounted(() => {
  console.log('%c 🌰 onMounted', 'color:#ea7e5c', import.meta.env);
});

const bookmarksComputed = computed(() => {
  return bookmarks.map((item) => {
    return { ...item, displayUrl: item.url.replace(/^https?:\/\/(.+)$/, '$1') };
  });
});
</script>

<template>
  <div class="padding-10">
    <div style="height: 5px; background-color: brown" />

    <div class="flex-container">
      <div v-for="item in bookmarksComputed" :key="item.url" class="flex-item">
        <el-card>
          <template #header>
            <div>
              {{ item.name }}
            </div>
          </template>

          <el-link :href="item.url" :title="item.url" target="_blank">
            {{ item.displayUrl }}
          </el-link>
        </el-card>
      </div>
    </div>

    <div style="height: 5px; background-color: brown" />
  </div>
</template>

<style scoped lang="scss">
.padding-10 {
  padding: 10px;
}
.flex-container {
  display: flex;
  flex-wrap: wrap;
}
.flex-item {
  flex: 1 1 100%;
  max-width: 100%;
  margin: 10px 0;
  padding: 0 10px;
}
@media screen and (min-width: 576px) {
  .flex-item {
    flex: 1 1 50%;
    max-width: 50%;
  }
}
@media screen and (min-width: 769px) {
  .flex-item {
    flex: 1 1 33.3333%;
    max-width: 33.3333%;
  }
}
@media screen and (min-width: 1200px) {
  .flex-item {
    flex: 1 1 25%;
    max-width: 25%;
  }
}
@media screen and (min-width: 1920px) {
  .flex-item {
    flex: 1 1 16.6667%;
    max-width: 16.6667%;
  }
}
</style>
