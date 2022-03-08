<template>
  <div class="editor">
    <input
      v-model="model.heading"
      class="aside-heading"
      placeholder="Heading"
      @keyup.enter="$emit('save', cloneDeep(model))"
    />

    <ul class="aside-text aside-list">
      <li v-for="(entry, i) in entries" :key="entry">
        <input
          class="aside-text"
          v-model="model.entries[i]"
          placeholder="Skill"
          @keyup.enter="$emit('save', cloneDeep(model))"
        />
      </li>
    </ul>

    <div class="actions screen-only">
      <Button
        label="Discard"
        icon="pi pi-times"
        class="p-button-rounded p-button-outlined"
        @click="$emit('discard')"
      ></Button>
      <Button
        label="Save"
        icon="pi pi-check"
        class="p-button-rounded p-button-raised"
        @click="$emit('save', cloneDeep(model))"
      ></Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { cloneDeep } from 'lodash';

import Button from 'primevue/button';

export default defineComponent({
  name: 'SkillEditor',
  components: { Button },
  props: {
    heading: String,
    entries: { type: Array as PropType<Array<string>>, required: true },
  },
  emits: ['save', 'discard'],
  setup(props) {
    const model = ref(cloneDeep(props));

    return { model, cloneDeep };
  },
});
</script>

<style scoped lang="scss"></style>
