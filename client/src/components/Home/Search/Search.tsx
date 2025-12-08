import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setSearchValue } from "../../../store/features/search/searchSlice";
import { ChangeEvent, useState, useEffect } from "react";
import { TbSearch } from "react-icons/tb";
import { Input } from "@/components/ui/input";

function Search() {
  const searchValue = useSelector((state: RootState) => state.search.value);
  const dispatch = useDispatch();
  const [localValue, setLocalValue] = useState(searchValue);

  // Debounce effect: Update Redux store only after user stops typing for 300ms
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchValue(localValue));
    }, 300);

    // Cleanup: Cancel the timeout if user types again before 300ms
    return () => clearTimeout(timeoutId);
  }, [localValue, dispatch]);

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  return (
    <div className="px-6 py-4">
      <div className="relative max-w-md">
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <TbSearch size={20} className="text-gray-400 dark:text-gray-500" />
        </div>

        {/* Search Input */}
        <Input
          className="pl-10 pr-4 py-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          name="search"
          value={localValue}
          type="search"
          onChange={searchHandler}
          placeholder="Search products..."
        />
      </div>
    </div>
  );
}

export { Search };
