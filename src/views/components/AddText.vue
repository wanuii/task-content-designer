<script lang="ts" setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: Object,
  isPreview: Boolean,
});
const emit = defineEmits(["update:modelValue", "delete"]);

const formData = ref({
  textarea: props.modelValue?.textarea || "",
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
  <p v-if="props.isPreview">
    {{ formData.textarea || "（無內容）" }}
  </p>
  <div v-else>
    <div class="flex justify-end gap-5">
      <i class="ri-delete-bin-line cursor-pointer" @click="$emit('delete')"></i>
      <i class="ri-expand-up-down-fill drag-handle"></i>
    </div>
    <el-input
      v-model="formData.textarea"
      class="mt-2"
      :rows="2"
      type="textarea"
      placeholder="請輸入內容"
    />
  </div>
</template>
