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
          <ButtonClear @click="model.entries[i].value = ''" />
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
          <ButtonClear v-if="added[i]" @click="added[i] = ''" />
        </div>
      </li>
    </ul>

    <div class="actions print:hidden">
      <button class="btn btn-circle btn-outline btn-error" @click="$emit('discard')">
        <icon-carbon-close class="text-xl" />
      </button>
      <button class="btn btn-circle btn-success shadow-md shadow-black/40" @click="save(model)">
        <icon-carbon-checkmark class="text-xl" />
      </button>
    </div>
  </div>
</template>

<script lang="tsx">
import { defineComponent, PropType, ref, watchEffect } from 'vue';
import { cloneDeep } from 'lodash';

import { Skill } from '../../models/skill.model';
import { useContentStore } from '../../store';

const ButtonClear = () => (
  <button class="btn btn-ghost btn-xs btn-circle hover:bg-error/20">
    <icon-carbon-trash-can class="text-error" />
  </button>
);

export default defineComponent({
  name: 'SkillEditor',
  components: { ButtonClear },
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
  @apply inline-flex items-center gap-4;
  max-width: calc(100% - 1rem - 6px);
}
</style>
