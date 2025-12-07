import { Modal, ModalProps } from "@heroui/react";
import { ReactNode } from "react";

interface CustomModalProps extends ModalProps {
  children: ReactNode;
}

export const CustomModal = ({ children, ...props }: CustomModalProps) => {
  return (
    <Modal
      {...props}
      scrollBehavior="inside"
      backdrop="blur"
      isDismissable={true}
      isKeyboardDismissDisabled={false}
    >
      {children}
    </Modal>
  );
};
