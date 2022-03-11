<template>
  <div class="manager grid">
    <template
      v-for="[colorKey, color] in Object.entries(colors.hex)"
      :key="colorKey"
    >
      <div>{{ capitalize(colorKey) }}</div>
      <input
        type="color"
        :value="color"
        @input="style.colors[colorKey] = ($event.target as any).value"
      />
      <div>{{ color }}</div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { capitalize } from 'lodash-es';

import { useContentStore } from '../../store';

export default defineComponent({
  name: 'SettingsManager',
  setup() {
    const store = useContentStore();
    const { style, colors } = storeToRefs(store);

    watch(style.value.colors, c => console.log(c.primary));

    return { style, colors, capitalize };
  },
});
</script>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: max-content min-content auto;
  gap: 1rem 2rem;
}
</style>
