<script lang="ts" setup>
import { ref, computed, watch } from "vue";

interface OptionItem {
  label: string;
  value: string;
  checked: boolean;
}
const props = defineProps({
  modelValue: Object,
  isPreview: Boolean,
});
const emit = defineEmits(["update:modelValue"]);
const formData = ref({
  options: props.modelValue?.options || [
    { label: "", value: "1", checked: false },
  ],
});

const addOption = () => {
  const newValue = `${formData.value.options.length + 1}`;
  formData.value.options.push({
    label: "",
    value: newValue,
    checked: false,
  });
};
const removeOption = (item: OptionItem) => {
  formData.value.options = formData.value.options.filter((i) => i !== item);
};

const isCheckAll = computed({
  get() {
    return (
      formData.value.options.length > 0 &&
      formData.value.options.every((i) => i.checked)
    );
  },
  set(val) {
    formData.value.options.forEach((i) => (i.checked = val));
  },
});
watch(
  formData,
  (val) => {
    emit("update:modelValue", val);
  },
  { deep: true }
);
</script>
<template>
  <div class="flex justify-end items-center gap-5" v-if="!props.isPreview">
    <el-button type="warning" @click="addOption"> 新增選項 </el-button>
    <i class="ri-expand-up-down-fill drag-handle"></i>
  </div>
  <div class="flex flex-col gap-3">
    <div class="flex items-center gap-3">
      <el-checkbox
        v-model="isCheckAll"
        v-if="formData.options.length !== 0"
        :disabled="!props.isPreview"
        >全選</el-checkbox
      >
    </div>
    <div
      v-for="item in formData.options"
      :key="item.value"
      class="flex items-center gap-3"
    >
      <el-checkbox
        v-model="item.checked"
        class="flex-shrink-0"
        :disabled="!props.isPreview"
      ></el-checkbox>
      <p v-if="props.isPreview">
        {{ item.label || "（無內容）" }}
      </p>
      <div v-else class="flex items-center w-full gap-5">
        <el-input
          v-model="item.label"
          placeholder="請輸入選項內容"
          class="flex-1"
        />
        <i
          class="ri-delete-bin-line cursor-pointer"
          @click="removeOption(item)"
        ></i>
      </div>
    </div>
  </div>
</template>
<style scoped>
::v-deep(.el-checkbox__label) {
  font-size: 16px;
  font-weight: normal;
  line-height: 1.6;
}
</style>
