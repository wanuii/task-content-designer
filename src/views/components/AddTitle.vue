<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  modelValue: Object,
  number: Number,
  isPreview: Boolean,
});
const emit = defineEmits(["update:modelValue", "delete", "copy"]);
const formData = ref({
  title: props.modelValue?.title || "",
});
const handleDelete = () => {
  emit("delete");
};
const handleCopy = () => {
  emit("copy");
};
watch(
  formData,
  (val) => {
    emit("update:modelValue", val);
  },
  { deep: true }
);
</script>
<template>
  <div class="flex items-center gap-2">
    <div class="title-number flex-shrink-0">{{ props.number }}</div>
    <p v-if="props.isPreview">
      {{ formData.title || "（無標題）" }}
    </p>
    <el-input
      v-else
      v-model="formData.title"
      class="w-full"
      placeholder="請輸入標題"
    />
    <div class="flex gap-6" v-if="!props.isPreview">
      <i class="ri-delete-bin-line cursor-pointer" @click="handleDelete"></i>
      <i class="ri-file-copy-line cursor-pointer" @click="handleCopy"></i>
      <i class="ri-expand-up-down-fill drag-handle cursor-pointer"></i>
    </div>
  </div>
</template>

<style scoped>
.title-number {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  width: 35px;
  height: 35px;
  background-color: #faf6e9;
  border-radius: 5px;
}
</style>
