<template>
  <teleport to="body">
    <input v-model="isRevealed" type="checkbox" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">{{ dialog?.header ?? 'Confirm' }}</h3>

        <p class="flex items-center gap-4 py-4">
          <component v-if="dialog?.icon" :is="dialog.icon" />
          <Message v-if="dialog?.message" :message="dialog.message" />
        </p>

        <div class="modal-action">
          <button class="btn btn-outline btn-error gap-2" @click="cancel()">
            <icon-carbon-close class="text-xl" />
            Cancel
          </button>
          <button class="btn btn-success gap-2" @click="confirm(true)">
            <icon-carbon-checkmark class="text-xl" />
            Ok
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="tsx" setup>
import { ref, onMounted, onBeforeUnmount, FunctionalComponent } from 'vue';
import { useConfirmDialog } from '@vueuse/core';

import { ConfirmEventBus } from '../../utils/event-bus';
import { ConfirmationOptions } from '../../models/confirm-event.model';

const Message: FunctionalComponent<{ message: ConfirmationOptions['message'] }> = ({ message }) =>
  typeof message === 'string' ? message : <message />;

const dialog = ref<ConfirmationOptions | null>(null);
const { isRevealed, reveal, confirm, cancel } = useConfirmDialog();

const openDialog = async (options: ConfirmationOptions) => {
  dialog.value = options;

  const { data, isCanceled } = await reveal();

  if (!isCanceled) options.accept(data);
};

onMounted(() => {
  ConfirmEventBus.on('open', openDialog);
  ConfirmEventBus.on('close', cancel);
});

onBeforeUnmount(() => {
  ConfirmEventBus.off('open', openDialog);
  ConfirmEventBus.off('close', cancel);
});
</script>
