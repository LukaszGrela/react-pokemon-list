import { ReactNode } from "react";

export interface IProps {
  modalId?: string;
  children: ReactNode;
  isOpen?: boolean;
  closeModal: () => void;
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