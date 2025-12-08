import axios from "@/lib/axios";

import { notify } from "../../../lib/toast";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useRevalidator, useRouteLoaderData } from "react-router-dom";
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
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { CustomModal } from "@/components/ui/CustomModal";
import { AllDataResponse } from "@/types/globals";

type ProductType = {
  name: string;
  price: number;
  code: number;
  image: string;
  categoryId: string;
  unitId: string;
};

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const AddProduct = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [item, setItem] = useState<ProductType>({
    name: "",
    price: 0,
    code: 0,
    image: "",
    categoryId: "",
    unitId: "",
  });
  const revalidator = useRevalidator();
  const { categories } = useRouteLoaderData("root") as AllDataResponse;
  const { units } = useRouteLoaderData("root") as AllDataResponse;
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
    console.log({ item });
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/product/add`,
      item
    );
    if (data.status === 409) notify(data.response.message, "fail");
    notify("Product addedd successfully", "success");

    revalidator.revalidate();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setItem({
      name: "",
      price: 0,
      code: 0,
      image: "",
      categoryId: "",
      unitId: "",
    });
    onClose();
  };

  const changeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    console.log({ name, value });
    setItem({ ...item, [name]: value });
  };

  const uploadHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    if (event.target.files && event.target.files.length > 0) {
      const imageLink = await uploadImage(event.target.files[0]);
      setItem({ ...item, image: imageLink });
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
        Add Product
      </Button>
      <CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Product
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4">
                  <Input
                    label="Name"
                    placeholder="Name"
                    name="name"
                    value={item.name || ""}
                    onChange={changeHandler}
                  />
                  <Input
                    label="Price"
                    placeholder="Price"
                    type="number"
                    name="price"
                    value={item.price.toString() || ""}
                    onChange={changeHandler}
                  />
                  <Input
                    label="Code"
                    placeholder="Code"
                    type="number"
                    name="code"
                    value={item.code.toString() || ""}
                    onChange={changeHandler}
                  />
                  {/* Category */}
                  <Select
                    label="Category"
                    placeholder="Select a category"
                    onChange={changeHandler}
                    name="categoryId"
                  >
                    {categories &&
                      categories.map((category) => (
                        <SelectItem key={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </Select>

                  {/* Unit */}
                  <Select
                    label="Unit"
                    placeholder="Select a unit"
                    onChange={changeHandler}
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
                    {item.image && (
                      <img
                        src={item.image}
                        alt={`${item.name} image`}
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

export { AddProduct };
