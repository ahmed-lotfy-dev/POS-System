import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setSearchValue } from "../../../store/features/search/searchSlice";
import { ChangeEvent } from "react";
import { FiSearch } from "react-icons/fi";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Search() {
  const searchValue = useSelector((state: RootState) => state.search.value);
  const dispatch = useDispatch();

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
    console.log(e.target.value);
  };

  return (
    <div className="flex justify-start items-start pl-10 rounded-full ">
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>{" "}
      <input
        className="font-extrabold relative w-1/5 bg-gray-700 rounded-md px-5 py-2"
        name="search"
        value={searchValue}
        type="search"
        onChange={searchHandler}
        placeholder="Search..."
      />
      <div className="mr-3 ml-[16%]">
        <FiSearch size={20} color={"gray"} />
      </div>
    </div>
  );
}
