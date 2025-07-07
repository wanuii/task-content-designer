<script setup>
import { ref, computed, watch } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import { nanoid } from "nanoid";

import AddTitle from "./components/AddTitle.vue";
import AddSingle from "./components/AddSingle.vue";
import AddMultiple from "./components/AddMultiple.vue";
import AddText from "./components/AddText.vue";

const props = defineProps({
  modelValue: Object,
  index: Number,
  parentList: Array,
  isPreview: Boolean,
});
const emit = defineEmits(["update:modelValue", "clear-dragged"]);

const components = {
  title_option: AddTitle,
  text_option: AddText,
  single_option: AddSingle,
  multiple_option: AddMultiple,
};

const formData = ref({
  id: props.modelValue?.id || `temp-${nanoid()}`,
  option_type: props.modelValue?.option_type || "",
  subItems: props.modelValue?.subItems || [],
  data: props.modelValue?.data || {},
});

// 計算排序
const computedTitleIndex = computed(() => {
  if (formData.value.option_type !== "title_option") return "";

  // 尋找同層 parentList 中，所有 title_option，並對照順序編號
  const titlesOnly = props.parentList.filter(
    (i) => i.option_type === "title_option"
  );
  const index = titlesOnly.findIndex((i) => i.id === formData.value.id);
  return index >= 0 ? index + 1 : "";
});

// 刪除元件
const deleteSelf = () => {
  const index = props.parentList.findIndex(
    (item) => item.id === formData.value.id
  );
  if (index >= 0) {
    props.parentList.splice(index, 1);
  }
};
// 複製元件
const copySelf = () => {
  const index = props.parentList.findIndex(
    (item) => item.id === formData.value.id
  );
  if (index >= 0) {
    const clone = JSON.parse(JSON.stringify(props.parentList[index]));
    clone.id = `temp-${nanoid()}`;
    props.parentList.splice(index + 1, 0, clone);
  }
};
const clearDraggedItem = () => {
  emit("clear-dragged");
};
// 同步到父層
watch(
  formData,
  () => {
    emit("update:modelValue", { ...formData.value });
  },
  { deep: true, immediate: true }
);

const getComponent = (type) => {
  if (!type) {
    console.warn("⚠️ getComponent 傳入空值");
    return "div";
  }
  const comp = components[type];
  if (!comp) {
    console.warn(`⚠️ getComponent 找不到對應於 ${type} 的元件`);
    return "div";
  }
  return comp;
};
</script>

<template>
  <div>
    <div class="item-container">
      <component
        :is="getComponent(formData.option_type)"
        v-model="formData.data"
        :number="computedTitleIndex"
        :isPreview="isPreview"
        @delete="deleteSelf"
        @copy="copySelf(index)"
      />
    </div>

    <VueDraggable
      v-if="formData.option_type === 'title_option'"
      class="drag-area"
      tag="ul"
      v-model="formData.subItems"
      :group="{ name: 'people', pull: true, put: true }"
      handle=".drag-handle"
      @add="clearDraggedItem"
    >
      <li v-for="(child, idx) in formData.subItems" :key="child.id">
        <QuestionRender
          v-model="formData.subItems[idx]"
          :index="idx"
          :parentList="formData.subItems"
          :isPreview="isPreview"
        />
      </li>
    </VueDraggable>
  </div>
</template>
<style scoped>
.item-container {
  padding: 10px;
  margin-bottom: 10px;
}

.drag-area {
  margin-left: 30px;
  padding-left: 15px;
}
</style>
