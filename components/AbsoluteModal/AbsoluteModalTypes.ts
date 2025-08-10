import { ReactNode } from "react";

export interface AbsoluteModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  overlayClosable?: boolean;
  modalHeight?: number;
}
