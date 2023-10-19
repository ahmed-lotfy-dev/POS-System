import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setSearchValue } from "../../../store/features/search/searchSlice";
import { ChangeEvent } from "react";
import { FcSearch } from "react-icons/fc";
import { Input } from "@/components/ui/input";

function Search() {
  const searchValue = useSelector((state: RootState) => state.search.value);
  const dispatch = useDispatch();

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
    console.log(e.target.value);
  };
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="bg-gray-200 flex justify-between ">
      {/* <div className="">
        <h2 className="text-2xl font-semibold mt-10">
          welcome {user.user?.username}
        </h2>
      </div> */}
      <Input
        className="font-extrabold w-1/5 relative bg-gray-200 rounded-md px-5 py-2 placeholder:text-black text-orange-500 m-10 border-[0.5px] border-black"
        name="search"
        value={searchValue}
        type="search"
        onChange={searchHandler}
        placeholder="Search..."
      />
      <div className="absolute left-[24.5%] top-[3%] mt-[1%]">
        <FcSearch size={25} color="black" />
      </div>
    </div>
  );
}

export { Search };
