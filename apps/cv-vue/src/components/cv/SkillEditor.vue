<template>
  <div class="editor">
    <input
      v-model="model.heading"
      class="aside-heading"
      placeholder="Heading"
      @keyup.enter="save(model)"
    />

    <ul class="aside-text aside-list">
      <li v-for="(entry, i) in entries" :key="entry.id">
        <div class="input-wrapper">
          <input
            class="aside-text"
            v-model="model.entries[i].value"
            placeholder="Skill"
            @keyup.enter="save(model)"
          />
          <i class="pi pi-trash" @click="model.entries[i].value = ''"></i>
        </div>
      </li>

      <li v-for="(_, i) in added" :key="i">
        <div class="input-wrapper">
          <input
            class="aside-text"
            placeholder="Skill"
            @input="$event.target && (added[i] = ($event.target as any).value)"
            @keyup.enter="save(model)"
          />
          <i v-if="added[i]" class="pi pi-trash" @click="added[i] = ''"></i>
        </div>
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
        @click="save(model)"
      ></Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watchEffect } from 'vue';
import { cloneDeep } from 'lodash';

import Button from 'primevue/button';
import { Skill } from '../../models/skill.model';
import { useContentStore } from '../../store';

export default defineComponent({
  name: 'SkillEditor',
  components: { Button },
  props: {
    heading: String,
    entries: { type: Array as PropType<Array<Skill>>, required: true },
  },
  emits: ['save', 'discard'],
  setup(props, ctx) {
    const store = useContentStore();

    const model = ref(cloneDeep(props));
    const added = ref(['']);

    watchEffect(() => {
      const hasLast = !!added.value.slice(-1)[0];
      if (hasLast) added.value.push('');
    });

    const save = (data: { heading?: string; entries: Skill[] }) => {
      const clone = cloneDeep({ ...data });
      clone.entries = clone.entries
        .concat(added.value.map(store.createSkill))
        .filter(entry => !!entry.value);

      ctx.emit('save', clone);
    };

    return { model, added, save };
  },
});
</script>

<style scoped lang="scss">
.input-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;

  .pi {
    cursor: pointer;
    color: var(--red-400);
  }
}
</style>
