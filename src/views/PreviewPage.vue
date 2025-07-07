<script setup>
import { ref, computed, onMounted } from "vue";
import QuestionRender from "./QuestionRender.vue";

// 讀取 sessionStorage 的資料
const dataList = ref([]);

onMounted(() => {
  const saved = sessionStorage.getItem("taskData");
  if (saved) {
    dataList.value = JSON.parse(saved);
  }
});

// 計算排序編號
const computedIndexes = computed(() =>
  dataList.value
    .filter((i) => i.option_type === "title_option")
    .map((item, index) => ({
      id: item.id,
      index: index + 1,
    }))
);
</script>

<template>
  <div>
    <div class="mt-5 mx-5">
      <div
        class="rounded-2xl p-5"
        style="background-color: #faf6e9; width: 100%"
      >
        <div class="drag-area">
          <ul>
            <li v-for="(el, index) in dataList" :key="el.id" :data-id="el.id">
              <QuestionRender
                v-model="dataList[index]"
                :index="index"
                :parentList="dataList"
                :computedIndexes="computedIndexes"
                :isPreview="true"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.drag-area {
  min-height: 100px;
  background: #fffefa;
  border-radius: 8px;
  padding: 10px;
}
</style>
