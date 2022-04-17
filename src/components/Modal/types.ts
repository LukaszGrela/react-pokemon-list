import { ReactNode } from 'react';
import { ECloseModalEnum } from './enums';

export interface IProps {
  modalId?: string;
  children: ReactNode;
  isOpen?: boolean;
  closeModal: (reason: ECloseModalEnum) => void;
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
