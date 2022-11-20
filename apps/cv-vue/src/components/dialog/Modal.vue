<template>
  <button @click="openDialog">
    <slot name="trigger"></slot>

    <teleport to="body">
      <input v-model="isRevealed" type="checkbox" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg">
            <slot name="heading"></slot>
          </h3>

          <p class="py-4">
            <slot name="message"></slot>
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
  </button>
</template>

<script lang="ts" setup>
import { useConfirmDialog } from '@vueuse/core';

const emit = defineEmits(['cancelled', 'confirmed']);

const { isRevealed, reveal, confirm, cancel } = useConfirmDialog();

const openDialog = async () => {
  const { data, isCanceled } = await reveal();

  isCanceled ? emit('cancelled') : emit('confirmed', data);
};
</script>
