<template>
  <div class="manager color-grid pt-4">
    <template v-for="[colorKey, color] in Object.entries(colors.hex)" :key="colorKey">
      <div class="capitalize ellipsis">
        {{ colorKey }}
      </div>
      <div class="tooltip tooltip-left" :data-tip="color">
        <input
          type="color"
          :value="color"
          @input="style.colors[colorKey] = ($event.target as any).value"
        />
      </div>

      <div>
        <div class="tooltip tooltip-left" data-tip="copy hex">
          <button class="btn btn-sm btn-ghost btn-circle"><icon-carbon-copy /></button>
        </div>
        <div class="tooltip tooltip-left" data-tip="reset">
          <button class="btn btn-sm btn-ghost btn-circle btn-error" @click="resetColor(colorKey)">
            <icon-carbon-reset />
          </button>
        </div>
      </div>
    </template>

    <div class="col-span-3 flex justify-end">
      <button class="btn btn-outline btn-square btn-error" @click="resetColors()">
        <icon-carbon-trash-can />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';

import { useContentStore } from '../../store';

export default defineComponent({
  name: 'SettingsManager',

  setup() {
    const store = useContentStore();
    const { style, colors } = storeToRefs(store);
    const { resetColor, resetColors } = store;

    return { style, colors, resetColor, resetColors };
  },
});
</script>

<style scoped lang="scss">
@use '../../styles/manager.scss';

.color-grid {
  @apply grid gap-x-8 gap-y-4;
  grid-template-columns: auto min-content auto;
  grid-template-rows: repeat(8, min-content);
}
</style>
