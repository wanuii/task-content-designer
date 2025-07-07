<script setup>
import { ref, watch } from "vue";

const radioValue = ref("");

const props = defineProps({
  modelValue: Object,
  isPreview: Boolean,
});
const emit = defineEmits(["update:modelValue"]);

const formData = ref({
  options: props.modelValue?.options || [{ label: "", value: "1" }],
});

// 新增選項
const addOption = () => {
  const newValue = `${formData.value.options.length + 1}`;
  formData.value.options.push({
    label: "",
    value: newValue,
  });
};
console.log(props);
// 刪除選項
const removeOption = (value) => {
  formData.value.options = formData.value.options.filter(
    (opt) => opt.value !== value
  );
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
  <div class="flex justify-end items-center gap-5" v-if="!props.isPreview">
    <el-button type="warning" @click="addOption">新增選項</el-button>
    <i class="ri-expand-up-down-fill drag-handle"></i>
  </div>
  <div
    v-for="item in formData.options"
    :key="item.value"
    class="flex items-center gap-3 mt-3"
  >
    <input
      v-model="radioValue"
      type="radio"
      :value="item.value"
      :disabled="!props.isPreview"
    />
    <p v-if="props.isPreview">
      {{ item.label || "（無內容）" }}
    </p>
    <div v-else class="flex items-center w-full gap-5">
      <el-input
        v-model="item.label"
        class="w-full"
        placeholder="請輸入選項內容"
      />
      <i
        class="ri-delete-bin-line cursor-pointer"
        @click.stop="removeOption(item.value)"
      ></i>
    </div>
  </div>
</template>
