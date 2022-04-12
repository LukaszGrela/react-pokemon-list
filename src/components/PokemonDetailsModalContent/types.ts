interface IModalContent {
  modalId: string;
  title: string;

  closeModal?: () => void;
}
export interface IProps extends IModalContent {
  pid: string;
}