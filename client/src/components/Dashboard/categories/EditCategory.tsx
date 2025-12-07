import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useRef } from "react";
import { useUploadImage } from "../../../hooks/useUploadImage";
// import { Loader } from "@mantine/core";
import { Loader } from "@/components/ui/loader";

import { setItem } from "../../../store/features/Item/itemSlice";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { ToastContainer } from "react-toastify";
import { useRevalidator } from "react-router-dom";
import axios from "axios";
type Props = {
  onClose: () => void;
};

function EditCategory({ onClose }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const editItem = useSelector((state: RootState) => state.item.item);
  const dispatch = useDispatch();
  const revalidator = useRevalidator();

  const onSaveHandler = async () => {
    console.log({ onsave: editItem });
    console.log("saving item");
    const { data } = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/category/edit/${editItem.id}`,
      editItem
    );
    revalidator.revalidate();
    dispatch(setItem({}));
  };

  const {
    uploadImage,
    imageLink,
    isPending,
    //error
  } = useUploadImage();

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedItem = { ...editItem, [name]: value }; // Update the corresponding property
    dispatch(setItem(updatedItem));
  };

  const uploadHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    if (event.target.files && event.target.files.length > 0) {
      await uploadImage(event.target.files[0]);
    }
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Edit Category</ModalHeader>
      <ModalBody>
        <form ref={formRef} className="flex flex-col gap-4">
          <Input
            label="Category Name"
            placeholder="Category Name"
            name="name"
            value={editItem ? editItem.name : ""}
            onChange={onChangeHandler}
          />
          <div className="flex flex-col gap-2">
            <Button
              color="primary"
              variant="flat"
              onPress={() => fileInputRef.current?.click()}
            >
              Upload Image
            </Button>
            <input
              className="hidden"
              type="file"
              name="image"
              ref={fileInputRef}
              onChange={uploadHandler}
            />
            {isPending ? <Loader /> : null}
            {imageLink ? (
              <img
                src={imageLink}
                alt={`${editItem.name} image`}
                className="w-20 h-20 object-cover m-auto rounded-md"
              />
            ) : (
              <img
                src={editItem ? editItem.image : ""}
                alt="Category"
                className="w-20 h-20 object-cover m-auto rounded-md"
              />
            )}
          </div>
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

export { EditCategory };
