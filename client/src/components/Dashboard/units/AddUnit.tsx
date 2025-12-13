import axios from "@/lib/axios";

import { notify } from "../../../lib/toast";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { useUploadImage } from "../../../hooks/useUploadImage";
import { Loader } from "@/components/ui/loader";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from "@heroui/react";
import { CustomModal } from "@/components/ui/CustomModal";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const AddUnit = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [itemName, setItemName] = useState<string>("");
  const revalidator = useRevalidator();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const user = useSelector((state: RootState) => state.user.user);

  const handleOpen = () => {
    if (user?.role !== "ADMIN") {
      notify("You don't have admin privileges (View Only)", "info");
      return;
    }
    onOpen();
  };

  const onAddHandler = async (onClose: () => void) => {
    if (user?.role !== "ADMIN") {
      notify("You don't have admin privileges (View Only)", "info");
      return;
    }
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/unit/add`,
      { name: itemName }
    );
    console.log(data);
    if (data.status === 409) notify(data.response.message, "fail");
    revalidator.revalidate();
    notify("Unit addedd successfully", "success");

    formRef.current?.reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setItemName("");
    onClose();
  };

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setItemName(value);
  };

  return (
    <div className="mb-5">
      <Button onPress={handleOpen} color="primary" className="mt-10">
        Add Unit
      </Button>
      <CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Unit
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4">
                  <Input
                    label="Unit Name"
                    placeholder="Unit Name"
                    name="name"
                    value={itemName || ""}
                    onChange={nameChangeHandler}
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={() => onAddHandler(onClose)}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </CustomModal>
    </div>
  );
};

export { AddUnit };
