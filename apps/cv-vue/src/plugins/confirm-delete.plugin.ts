import { App, inject } from 'vue';
import ConfirmEventBus from 'primevue/confirmationeventbus';
import { ConfirmationOptions as Options } from 'primevue/confirmationoptions';
import { getHeading, StateEntry } from '../utils/get-heading.util';
import { Entry } from '../models/entry.model';

type ConfirmationOptions = Options & {
  position?: 'left' | 'right' | 'top' | 'bottom';
};

type AcceptFnSelf = (id: string) => void;
type AcceptParentFn = (id: string, parentId: string) => void;

type AcceptFn = AcceptFnSelf | AcceptParentFn;

export const ConfirmSymbol = Symbol();

export const useConfrimDelete = (accept: AcceptFn): UseConfirm => {
  const Confirm = inject(
    ConfirmSymbol
  ) as typeof DeleteConfirmationService.confirm;

  if (!Confirm) {
    throw new Error('No Delete Confirmation provided!');
  }

  return Confirm(accept);
};

type UseConfirm = (entry: Entry & StateEntry, parentId?: string) => void;

class DeleteConfirmationService {
  static confirm(accept: AcceptFnSelf): UseConfirm;
  static confirm(accept: AcceptParentFn): UseConfirm;
  static confirm(accept: AcceptFn): UseConfirm {
    return (entry: Entry & StateEntry, parentId?: string) => {
      const heading = getHeading(entry);

      const options: ConfirmationOptions = {
        message: `Are you sure you want to delete ${heading}?`,
        header: `Delete ${heading}`,
        icon: 'pi pi-exclamation-triangle',
        position: 'right',
        accept: () => accept(entry.id, parentId!),
      };

      ConfirmEventBus.emit('confirm', options);
    };
  }
}

export const ConfirmDeleteDialogPlugin = {
  install: (app: App) => {
    const Confirm = DeleteConfirmationService.confirm;

    app.config.globalProperties.$deleteConfirm = Confirm;
    app.provide(ConfirmSymbol, Confirm);
  },
};
