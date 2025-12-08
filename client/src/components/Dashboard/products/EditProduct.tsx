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
  Select,
  SelectItem,
} from "@heroui/react";
import { useRevalidator, useRouteLoaderData } from "react-router-dom";
import axios from "@/lib/axios";
import { AllDataResponse } from "@/types/globals";
type Props = {
  onClose?: () => void;
};

function EditProduct({ onClose = () => {} }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const editItem = useSelector((state: RootState) => state.item.item);
  const dispatch = useDispatch();
  const revalidator = useRevalidator();

  const { categories } = useRouteLoaderData("root") as AllDataResponse;
  const { units } = useRouteLoaderData("root") as AllDataResponse;

  const onSaveHandler = async () => {
    console.log(editItem);
    const { data } = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/product/edit/${editItem.id}`,
      editItem
    );
    console.log(data);
    console.log(editItem.id);
    revalidator.revalidate();
    dispatch(setItem({}));
  };

  const {
    uploadImage,
    imageLink,
    isPending,
    //error
  } = useUploadImage();

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const updatedItem = { ...editItem, [name]: value }; // Update the corresponding property
    dispatch(setItem(updatedItem));
  };

  const uploadHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      await uploadImage(event.target.files[0]);
    }
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Edit Product</ModalHeader>
      <ModalBody>
        <form ref={formRef} className="flex flex-col gap-4">
          <Input
            label="Name"
            placeholder="Name"
            name="name"
            value={editItem?.name || ""}
            onChange={onChangeHandler}
          />
          <Input
            label="Price"
            placeholder="Price"
            type="number"
            name="price"
            value={editItem?.price || ""}
            onChange={onChangeHandler}
          />
          <Input
            label="Code"
            placeholder="Code"
            type="number"
            name="code"
            value={editItem?.code || ""}
            onChange={onChangeHandler}
          />
          {/* Category */}
          <Select
            label="Category"
            placeholder="Select a category"
            selectedKeys={editItem?.categoryId ? [editItem.categoryId] : []}
            onChange={onChangeHandler}
            name="categoryId"
          >
            {categories.map((category) => (
              <SelectItem key={category.id}>{category.name}</SelectItem>
            ))}
          </Select>

          {/* Unit */}
          <Select
            label="Unit"
            placeholder="Select a unit"
            selectedKeys={editItem?.unitId ? [editItem.unitId] : []}
            onChange={onChangeHandler}
            name="unitId"
          >
            {units.map((unit) => (
              <SelectItem key={unit.id}>{unit.name}</SelectItem>
            ))}
          </Select>

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
                className="object-cover m-auto rounded-md"
              />
            ) : (
              <img
                src={editItem ? editItem.image : ""}
                alt="Product"
                className="object-cover m-auto rounded-md"
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

export { EditProduct };
