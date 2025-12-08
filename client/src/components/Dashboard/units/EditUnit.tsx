import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useRef } from "react";
import { useUploadImage } from "../../../hooks/useUploadImage";
// import { Loader } from "@mantine/core";
import { Loader } from "@/components/ui/loader";

import { setItem } from "../../../store/features/Item/itemSlice";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { useRevalidator } from "react-router-dom";
import axios from "@/lib/axios";

type Props = {
  onClose?: () => void;
};

function EditUnit({ onClose = () => {} }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const editItem = useSelector((state: RootState) => state.item.item);
  const dispatch = useDispatch();
  const revalidator = useRevalidator();

  const onSaveHandler = async () => {
    console.log(editItem);
    const { data } = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/unit/edit/${editItem.id}`,
      editItem
    );
    console.log(data);
    console.log(editItem.id);
    revalidator.revalidate();
    dispatch(setItem({}));
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedItem = { ...editItem, [name]: value }; // Update the corresponding property
    dispatch(setItem(updatedItem));
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Edit Unit</ModalHeader>
      <ModalBody>
        <form ref={formRef} className="flex flex-col gap-4">
          <Input
            label="Unit Name"
            placeholder="Unit Name"
            name="name"
            value={editItem ? editItem.name : ""}
            onChange={onChangeHandler}
          />
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Cancel
        </Button>
        <Button
          color="primary"
          onPress={() => {
            onSaveHandler();
            onClose();
          }}
        >
          Save
        </Button>
      </ModalFooter>
    </>
  );
}

export { EditUnit };
