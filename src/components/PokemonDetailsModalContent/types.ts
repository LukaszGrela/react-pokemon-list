interface IModalContent {
  modalId: string;
  title: string;

  closeModal?: () => void;
}
export interface IProps extends Omit<IModalContent, 'title'> {
  pid: string;
  name: string;
}