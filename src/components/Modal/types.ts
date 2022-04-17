import { ReactNode } from 'react';
import { ECloseModalEnum } from './enums';

export type TCloseModalCallback = (reason: ECloseModalEnum) => void;
export interface IProps {
  modalId?: string;
  children: ReactNode;
  isOpen?: boolean;
  closeModal: TCloseModalCallback;
  className?: string;
  overlayClassName?: string;
  disableOverlay?: boolean;

  modalTransitionTimeout?:
    | number
    | { appear?: number; enter?: number; exit?: number };

  overlayTransitionTimeout?:
    | number
    | { appear?: number; enter?: number; exit?: number };
}
