<script setup lang="ts">
import { bookmarks } from '@/constants/bookmarks';

let filterText = ref('');

const bookmarksComputed = computed(() => {
  if (filterText.value) {
    const regexp = new RegExp(`(${filterText.value})`, 'gi');
    const filterTextLowerCase = filterText.value.toLowerCase();
    return bookmarks
      .filter(
        (item) =>
          item.name.toLocaleLowerCase().includes(filterTextLowerCase) ||
          item.url.toLocaleLowerCase().includes(filterTextLowerCase),
      )
      .map((item) => {
        return {
          ...item,
          displayName: item.name.replace(regexp, '<span class="matchText">$1</span>'),
          displayUrl: item.url
            .replace(/^https?:\/\/(.+)$/, '$1')
            .replace(regexp, '<span class="matchText">$1</span>'),
        };
      });
  }

  return bookmarks.map((item) => {
    return {
      ...item,
      displayName: item.name,
      displayUrl: item.url.replace(/^https?:\/\/(.+)$/, '$1'),
    };
  });
});

onMounted(() => {
  console.log('%c 🌰 onMounted', 'color:#ea7e5c', import.meta.env);
});
</script>

<template>
  <div style="padding: 0 10px 10px">
    <div style="padding: 20px; text-align: center">
      <el-input v-model.trim="filterText" placeholder="搜索" clearable size="large">
        <template #prefix>
          <el-icon :size="18"><ElIconSearch /></el-icon>
        </template>
      </el-input>
    </div>

    <div style="height: 5px; background-color: brown" />

    <div class="flex-container">
      <div v-for="item in bookmarksComputed" :key="item.url" class="flex-item">
        <el-card>
          <template #header>
            <div v-html="item.displayName" />
          </template>

          <el-icon :size="18"><ElIconPaperclip /></el-icon>
          <el-link :href="item.url" :title="item.url" target="_blank">
            <span v-html="item.displayUrl" />
          </el-link>
        </el-card>
      </div>
    </div>

    <div style="height: 5px; background-color: brown; margin-bottom: 15px" />
  </div>
</template>

<style scoped lang="scss">
:deep(.el-card__body) {
  display: flex;
  .el-icon {
    margin-right: 5px;
    color: var(--el-color-primary);
  }
}
:deep(.el-input) {
  width: 80%;
  max-width: 660px;
}
:deep(.matchText) {
  color: red;
}
:deep(.el-link) {
  // 25px 为 el-icon 的 size + margin
  max-width: calc(100% - 25px);

  .el-link__inner {
    width: 100%;

    span {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
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
