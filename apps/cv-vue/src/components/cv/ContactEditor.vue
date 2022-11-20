<template>
  <div class="editor contact">
    <input
      v-model="model.heading"
      placeholder="Heading"
      class="aside-heading first"
      @keyup.enter="$emit('save', cloneDeep(model))"
    />

    <div v-for="(record, key) in filtered.info" :key="record" class="line aside-text">
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

      <template v-for="(_record, i) in filtered.address" :key="_record">
        <input
          v-model="model.records.address[i]"
          :placeholder="i === 0 ? 'Street' : 'City'"
          class="aside-text"
          @keyup.enter="$emit('save', cloneDeep(model))"
        />
        <br />
      </template>
    </div>

    <div class="actions print:hidden">
      <button class="btn btn-circle btn-outline btn-error" @click="$emit('discard')">
        <icon-carbon-close class="text-xl" />
      </button>
      <button class="btn btn-circle btn-success" @click="$emit('save', cloneDeep(model))">
        <icon-carbon-checkmark class="text-xl" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { cloneDeep, capitalize } from 'lodash-es';

import { ContactInfo } from '../../models/contact-info.model';
import { icons } from '../../constants/icons.const';

const records: ContactInfo['records'] = {
  web: '',
  mail: '',
  phone: '',
  address: ['', ''],
};

export default defineComponent({
  name: 'ContactEditor',
  components: { ...(Object.values(icons) as any) },
  props: {
    heading: String,
    records: {
      type: Object as PropType<ContactInfo['records']>,
      default: () => records,
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
.editor {
  min-width: 200px;
}
.editor input {
  color: var(--aside-color);
}

.line {
  width: 100%;
}
</style>
