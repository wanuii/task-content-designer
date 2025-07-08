<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import { nanoid } from "nanoid";
import { ElMessage } from "element-plus";
import QuestionRender from "./QuestionRender.vue";

// const loading = ref(true);
const draggedItem = ref(null);
const dialogVisible = ref(false); // 查看JSON dialog
const dataList = ref([]);
const selectType = ref([
  {
    id: 1,
    title: "標題",
    icon: "ri-text",
    type: "title_option",
  },
  {
    id: 2,
    title: "單選選項",
    icon: "ri-radio-button-line",
    type: "single_option",
  },
  {
    id: 3,
    title: "複選選項",
    icon: "ri-list-check",
    type: "multiple_option",
  },
  {
    id: 4,
    title: "填空選項",
    icon: "ri-text-snippet",
    type: "text_option",
  },
]);
// 選擇題型 clone 相關
const cloneElement = (element) => ({
  id: `temp-${nanoid()}`,
  option_type: element.type,
  title: element.title,
  type: element.type,
  icon: element.icon,
  data: [],
  subItems: [],
});
const clearDraggedItem = () => {
  draggedItem.value = null;
};
//#region ============ 拖曳事件 ============
const handleDragTypeStart = (event) => {
  draggedItem.value = event?.clonedData || null;
};
const handleDragEnd = () => {
  draggedItem.value = null;
};
// 僅限制能否放入根層
const canDropToPage = () => {
  const type = draggedItem.value?.option_type;
  return type === "title_option";
};
//#endregion ====================================
// 設計完成
const goToPreview = () => {
  sessionStorage.setItem("taskData", JSON.stringify(dataList.value));
  window.open("/preview", "_blank"); // 開新分頁預覽
};
// 匯出 JSON 檔
const formattedJson = computed(() => JSON.stringify(dataList.value, null, 2));
const exportJson = () => {
  const blob = new Blob([formattedJson.value], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "data.json";
  link.click();
  URL.revokeObjectURL(url);
};
// 複製 JSON 到剪貼簿
const copyJson = async () => {
  try {
    await navigator.clipboard.writeText(formattedJson.value);
    ElMessage.success("已複製 JSON");
  } catch (err) {
    ElMessage.error("複製失敗");
  }
};
</script>
<template>
  <div>
    <div v-loading="loading">
      <div class="mt-5 mx-5">
        <div style="width: 75%" class="main-page">
          <div style="background-color: #faf6e9" class="p-5 rounded-2xl">
            <VueDraggable
              class="drag-area"
              tag="ul"
              v-model="dataList"
              :group="{ name: 'people', pull: true, put: canDropToPage }"
              handle=".drag-handle"
              @end="handleDragEnd"
            >
              <li v-for="(el, index) in dataList" :key="el.id" :data-id="el.id">
                <question-render
                  v-model="dataList[index]"
                  :index="index"
                  :parentList="dataList"
                  @clear-dragged="clearDraggedItem"
                />
              </li>
            </VueDraggable>
          </div>
        </div>
        <div
          style="
            width: 20%;
            border-radius: 20px;
            position: fixed;
            top: 5rem;
            right: 2rem;
            z-index: 10;
          "
          class="sidebar flex flex-col gap-2 p-5"
        >
          <div
            style="background-color: #faf6e9"
            class="custom-padding p-5 rounded-xl flex flex-row gap-3"
          >
            <VueDraggable
              v-model="selectType"
              :group="{ name: 'people', pull: 'clone', put: false }"
              :sort="false"
              :clone="cloneElement"
              @start="handleDragTypeStart"
              class="drag-flex w-full"
            >
              <div
                v-for="element in selectType"
                :key="element.id"
                class="select-question-type gap-2"
                draggable="true"
              >
                <i :class="element.icon"></i>
                <p class="title-text">{{ element.title }}</p>
              </div>
            </VueDraggable>
            <div class="min-tool flex-row gap-3">
              <i
                class="select-question-type ri-check-line mr-1"
                @click="goToPreview"
              ></i>
              <i
                class="select-question-type ri-code-line mr-1"
                @click="dialogVisible = true"
              ></i>
            </div>
          </div>
          <div class="options-wrapper flex flex-col lg:flex-row gap-2 mt-3">
            <el-button class="w-full" @click="goToPreview">設計完成</el-button>
            <el-button class="w-full" @click="dialogVisible = true"
              >查看 JSON</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogVisible" title="JSON" width="500">
      <pre>{{ JSON.stringify(dataList, null, 2) }}</pre>
      <template #footer>
        <div>
          <el-button @click="copyJson">複製</el-button>
          <el-button type="primary" @click="exportJson">匯出</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped>
.drag-area {
  min-height: 100px;
  padding: 10px;
  background: #fffefa;
  border-radius: 8px;
}
.select-question-type {
  color: #efd06a;
  font-weight: bold;
  background-color: #fffefa;
  border-radius: 6px;
  padding: 0.5rem;
  cursor: grab;
  height: 40px;
  display: flex;
  align-items: center;
}
.options-wrapper .el-button {
  background-color: #f6f0db;
  color: #c28400;
  border: none;
  font-weight: bold;
  height: 40px;
}
.options-wrapper .el-button + .el-button {
  margin-left: 0;
}
.drag-flex {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.min-tool {
  display: none;
}
@media (max-width: 1100px) {
  .sidebar {
    right: 0rem !important ;
    width: 25% !important;
  }
}
@media (max-width: 744px) {
  .sidebar {
    width: 30% !important;
  }
  .main-page {
    width: 70% !important;
  }
}
@media (max-width: 616px) {
  .sidebar {
    width: 35% !important;
  }
  .main-page {
    width: 65% !important;
  }
}
@media (max-width: 528px) {
  .sidebar {
    width: 100% !important;
    top: auto !important;
    bottom: 0rem;
    padding-bottom: 0%;
  }
  .main-page {
    width: 100% !important;
  }
  .drag-flex {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    display: flex;
    gap: 1rem;
    width: auto;
  }
  .title-text {
    display: none !important;
  }
  .options-wrapper {
    display: none !important;
  }
  .custom-padding {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    overflow-x: auto;
  }
  .min-tool {
    display: flex;
  }
}
</style>
