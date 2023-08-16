import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setSearchValue } from "../../../store/features/search/searchSlice";
import { ChangeEvent } from "react";
import { FiSearch } from "react-icons/fi";
function Search() {
  const searchValue = useSelector((state: RootState) => state.search.value);
  const dispatch = useDispatch();

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
    console.log(e.target.value);
  };

  return (
    <div className="flex w-full justify-start items-center pl-10">
      <input
        className="font-extrabold relative w-1/5"
        name="search"
        value={searchValue}
        type="search"
        onChange={searchHandler}
        placeholder="Search..."
      />
      <div className="mr-3 absolute ml-[16%]">
        <FiSearch size={20} color={"gray"} />
      </div>
    </div>
  );
}

export { Search };
