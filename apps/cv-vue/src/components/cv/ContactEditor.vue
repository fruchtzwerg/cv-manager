<template>
  <div class="editor contact">
    <input
      v-model="model.heading"
      class="aside-heading"
      placeholder="Heading"
      @keyup.enter="$emit('save', cloneDeep(model))"
    />

    <div
      v-for="(record, key) in filtered.info"
      :key="record"
      class="line aside-text"
    >
      <component :is="icons[key]"></component>

      <input
        v-model="model.records[key]"
        :placeholder="capitalize(key)"
        class="aside-text"
        @keyup.enter="$emit('save', cloneDeep(model))"
      />
    </div>

    <div class="multiline aside-text">
      <component :is="icons.address"></component>

      <template v-for="(record, i) in filtered.address" :key="record">
        <input
          v-model="model.records.address[i]"
          :placeholder="i === 0 ? 'Street' : 'City'"
          class="aside-text"
          @keyup.enter="$emit('save', cloneDeep(model))"
        />
        <br />
      </template>
    </div>

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
import { computed, defineComponent, PropType, ref } from 'vue';
import { cloneDeep, capitalize } from 'lodash-es';

import Button from 'primevue/button';

import { ContactInfo } from '../../models/contact-info.model';
import { icons } from '../../constants/icons.const';

export default defineComponent({
  name: 'ContactEditor',
  components: { Button, ...(Object.values(icons) as any) },
  props: {
    heading: String,
    records: {
      type: Object as PropType<ContactInfo['records']>,
      default: () => ({}),
    },
  },
  emits: ['save', 'discard'],
  setup(props) {
    const model = ref(cloneDeep({ ...props }));

    const filtered = computed(() => {
      const { address, ...info } = props.records;

      return { info, address };
    });

    return { icons, model, filtered, cloneDeep, capitalize };
  },
});
</script>

<style scoped lang="scss">
.editor input {
  color: var(--aside-color);
}

.line {
  width: 100%;
}
</style>
