import type { TCloseModalCallback } from '../Modal/types';

interface IModalContent {
  modalId: string;
  title: string;

  closeModal?: TCloseModalCallback;
}
export interface IProps extends Omit<IModalContent, 'title'> {
  pid: string;
  name: string;
}
