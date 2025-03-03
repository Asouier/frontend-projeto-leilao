<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  text: String,
  type: {
    type: String,
    default: "success",
  },
});

const emit = defineEmits<{
  closeToast: [];
  callbackAction: [];
}>();

const closeToast = () => {
  emit("closeToast");
};
const logo = computed(() => {
  let type = "CheckCircle";
  if (props.type === "error") type = "CloseCircle";
  return new URL(`../assets/svg/${type}.svg`, import.meta.url).href;
});

// const logo = import.meta.glob(`@/assets/svg/${typeIcon.value}.svg`);
</script>
<template>
  <div class="toast-base main">
    <div class="toast-base">
      <img :src="logo" class="toast-icon" alt="" />
      <p>{{ props.text }}</p>
    </div>
    <div class="toast-base">
      <div class="toast-hr"></div>
      <a class="close-icon" @click="closeToast">
        <img src="@/assets/svg/Close.svg" alt="" />
      </a>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.toast-base {
  display: flex;
  align-items: center;
  &.main {
    justify-content: space-between;
    & .toast-base:last-child {
      margin-left: 20px;
    }
  }
  .toast-icon {
    margin-right: 12px;
    font-size: 24px;
  }
  .toast-hr {
    margin-left: 20px;
    margin-right: 20px;
  }
  .undeline {
    text-decoration: underline;
  }
  .close-icon {
    display: flex;
  }
  a {
    cursor: pointer;
  }
}
</style>
