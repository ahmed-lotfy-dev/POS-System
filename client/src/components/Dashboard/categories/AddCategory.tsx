import axios from "@/lib/axios";

import { notify } from "@/lib/toast";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { useUploadImage } from "../../../hooks/useUploadImage";
// import { Loader } from "@mantine/core";
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

const AddCategory = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [itemName, setItemName] = useState<string>("");
  const [image, setImage] = useState<string | null | undefined>("");
  const revalidator = useRevalidator();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const user = useSelector((state: RootState) => state.user.user);

  const {
    uploadImage,
    // imageLink,
    isPending,
    //error
  } = useUploadImage();

  const handleOpen = () => {
    if (user?.role !== "ADMIN") {
      notify("You don't have admin privileges (View Only)", "info");
    }
    onOpen();
  };

  const onAddHandler = async (onClose: () => void) => {
    if (user?.role !== "ADMIN") {
      notify("You don't have admin privileges (View Only)", "info");
      return;
    }
    console.log({ itemName, image });
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/category/add`,
      { name: itemName, image }
    );
    if (data.status === 409) notify(data.response.message, "fail");
    notify("Category addedd successfully", "success");
    revalidator.revalidate();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setItemName("");
    setImage("");
    onClose();
  };

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setItemName(value);
  };

  const uploadHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    if (event.target.files && event.target.files.length > 0) {
      const imageLink = await uploadImage(event.target.files[0]);
      setImage(imageLink);
    }
  };

  const handleUploadClick = () => {
    if (user?.role !== "ADMIN") {
      notify("You don't have admin privileges (View Only)", "info");
    }
    fileInputRef.current?.click();
  };

  return (
    <>
      <Button onPress={handleOpen} color="primary" className="mt-10">
        Add Category
      </Button>
      <CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Category
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4">
                  <Input
                    label="Category Name"
                    placeholder="Category Name"
                    name="name"
                    value={itemName || ""}
                    onChange={nameChangeHandler}
                  />
                  <div className="flex flex-col gap-2">
                    <Button
                      color="primary"
                      variant="flat"
                      onPress={handleUploadClick}
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
                    {image && (
                      <img
                        src={image}
                        alt={`${itemName} image`}
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
                <Button color="primary" onPress={() => onAddHandler(onClose)}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </CustomModal>
    </>
  );
};

export { AddCategory };
