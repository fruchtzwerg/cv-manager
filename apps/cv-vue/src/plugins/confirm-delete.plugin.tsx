import { App, inject } from 'vue';

import { getHeading, StateEntry } from '../utils/get-heading.util';
import { Entry } from '../models/entry.model';
import { ConfirmEventBus } from '../utils/event-bus';
import { ConfirmationOptions } from '../models/confirm-event.model';

type PartialOptions = Partial<Omit<ConfirmationOptions, 'accept'>>;
type PartialOptionsWithMessage = PartialOptions & Required<Pick<ConfirmationOptions, 'message'>>;

type AcceptFnSelf = (id: string) => void;
type AcceptParentFn = (id: string, parentId: string) => void;

type AcceptFn = AcceptFnSelf | AcceptParentFn;

type ShowDeleteDialogFn = (entry: Entry & StateEntry, parentId?: string) => void;
type ShowDialogFn<T = any> = (data?: T) => void;

export const ConfirmDeleteSymbol = Symbol();
export const ConfirmDialogSymbol = Symbol();

export function useConfirmDelete(
  accept: AcceptFn,
  options: PartialOptions = {}
): ShowDeleteDialogFn {
  const Confirm = inject(ConfirmDeleteSymbol) as typeof DeleteConfirmationService.confirmDelete;

  if (!Confirm) {
    throw new Error('No Delete Confirmation provided!');
  }

  return Confirm(accept, options);
}

export function useConfirmDialog<T = any>(
  accept: (data?: T) => void,
  options: PartialOptionsWithMessage
): ShowDialogFn<T> {
  const Confirm = inject(ConfirmDialogSymbol) as typeof DeleteConfirmationService.confirm;

  if (!Confirm) {
    throw new Error('No Confirmation provided!');
  }

  return Confirm(accept, options);
}

class DeleteConfirmationService {
  static confirmDelete(accept: AcceptFnSelf, options: PartialOptions): ShowDeleteDialogFn;
  static confirmDelete(accept: AcceptParentFn, options: PartialOptions): ShowDeleteDialogFn;
  static confirmDelete(accept: AcceptFn, options: PartialOptions): ShowDeleteDialogFn {
    return (entry, parentId?) => {
      const heading = getHeading(entry);

      const defaultOptions: ConfirmationOptions = {
        message: (
          <span>
            Are you sure you want to delete{' '}
            <span class="font-semibold text-warning">{heading}</span>?
          </span>
        ),
        header: `Delete ${heading}`,
        icon: <icon-carbon-warning-alt class="text-4xl text-warning" />,
        accept: () => accept(entry.id, parentId!),
      };

      ConfirmEventBus.emit('open', { ...defaultOptions, ...options });
    };
  }

  static confirm<T = any>(
    accept: (data?: T) => void,
    options: PartialOptionsWithMessage
  ): ShowDialogFn<T> {
    return (data?: T) => {
      const defaultOptions: ConfirmationOptions = {
        header: 'Confirm',
        icon: <icon-carbon-information class="text-4xl text-info" />,
        accept: () => accept(data),
      };

      ConfirmEventBus.emit('open', { ...defaultOptions, ...options });
    };
  }
}

export const ConfirmDeleteDialogPlugin = {
  install: (app: App) => {
    const ConfirmDelete = DeleteConfirmationService.confirmDelete;
    const Confirm = DeleteConfirmationService.confirm;

    app.config.globalProperties.$deleteConfirm = ConfirmDelete;
    app.provide(ConfirmDeleteSymbol, ConfirmDelete);

    app.config.globalProperties.$dialogConfirm = Confirm;
    app.provide(ConfirmDialogSymbol, Confirm);
  },
};
