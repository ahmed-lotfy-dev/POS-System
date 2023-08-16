import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useRef } from "react";
import { useUploadImage } from "../../../hooks/useUploadImage";
import { Loader } from "@mantine/core";
import { setItem } from "../../../store/features/Item/itemSlice";
import { Button } from "@/components/ui/button";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer } from "react-toastify";
import { useRevalidator } from "react-router-dom";
type Props = {};

function EditCategory({}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const editItem = useSelector((state: RootState) => state.item.item);
  const dispatch = useDispatch();
  const revalidator = useRevalidator();

  const objectKeys = editItem ? Object.keys(editItem).slice(1, -2) : [];

  const onSaveHandler = () => {
    console.log("saving item");
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

  console.log(editItem);
  console.log(imageLink);
  return (
    <AlertDialogContent className="flex flex-col justify-center items-center w-full">
      <AlertDialogHeader>
        <AlertDialogTitle className="font-semibold">
          Add New Category
        </AlertDialogTitle>
      </AlertDialogHeader>
      <form
        ref={formRef}
        action=""
        method="dialog"
        className="modal-box flex flex-col"
        onSubmit={onSaveHandler}
      >
        <Label className="m-auto my-4 font-semibold" htmlFor="name">
          Category Name
        </Label>
        <Input
          className="input input-bordered border-b-gray-100 input-xs w-full max-w-xs my-6 mt-10 m-auto focus:bg-gray-200 bg-gray-100"
          type="text"
          name="name"
          id="name"
          value={editItem ? editItem.name : ""}
          onChange={onChangeHandler}
        />
        <>
          <Button
            className="my-5"
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Image
          </Button>
          <input
            className="hidden"
            type="file"
            name="image"
            id="hiddenFileInput"
            ref={fileInputRef}
            onChange={uploadHandler}
          />
        </>
        {isPending ? <Loader className="m-auto my-7" /> : null}
        {imageLink ? (
          <img
            src={imageLink}
            alt={`${editItem.name} image`}
            className={`${imageLink ? "block" : "hidden"} w-80 m-auto my-10`}
          />
        ) : (
          <img
            src={editItem ? editItem.image : ""}
            alt={` image`}
            // className={`${imageLink ? "block" : "hidden"} w-80 m-auto my-10`}
          />
        )}
        <div className="flex gap-5 m-auto">
          <AlertDialogAction type="submit">Add</AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </div>
      </form>
      <ToastContainer />
    </AlertDialogContent>
  );
}

export { EditCategory };

// return (
//   <AlertDialogContent className="flex justify-center items-center w-full relative">
//     <AlertDialogHeader>
//       <AlertDialogTitle className="font-semibold">
//         Edit Category
//       </AlertDialogTitle>
//     </AlertDialogHeader>
//     <form className="flex flex-col space-y-4">
//       {objectKeys.map((key) =>
//         key === "image" ? (
//           <div key="key">
//             <Button
//               className="input text-center w-full bg-gray-700 text-gray-200"
//               type="button"
//               onClick={() => fileInputRef.current?.click()}
//             >
//               Upload
//             </Button>
//             <Input
//               className="hidden"
//               type="file"
//               name="image"
//               id="hiddenFileInput"
//               ref={fileInputRef}
//               onChange={uploadHandler}
//             />
//             {isPending ? (
//               <div className="flex justify-center items-center mt-6">
//                 <Loader />
//               </div>
//             ) : null}
//             <img
//               src={editItem.image}
//               alt={`${editItem.name} image`}
//               className={`${
//                 editItem.image ? "block" : "hidden"
//               } w-80 m-auto my-5`}
//             />
//           </div>
//         ) : (
//           <Input
//             key={key}
//             onChange={onChangeHandler}
//             value={editItem[key] || ""}
//           />
//         )
//       )}

//       <div className="flex gap-5 m-auto">
//         <AlertDialogAction type="submit" onClick={onSaveHandler}>
//           Save
//         </AlertDialogAction>
//         <AlertDialogCancel>Cancel</AlertDialogCancel>
//       </div>
//     </form>
//   </AlertDialogContent>
// );
