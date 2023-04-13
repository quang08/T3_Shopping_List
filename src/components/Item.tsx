import { shoppingItem } from "@prisma/client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { HiX } from "react-icons/hi";
import { api } from "~/utils/api";
import { motion } from "framer-motion";

interface ItemProps {
  item: shoppingItem;
  setItems: Dispatch<SetStateAction<shoppingItem[]>>;
  id: string;
}

const Item: FC<ItemProps> = ({ item, setItems, id }) => {
  const [checkedItems, setCheckedItems] = useState<shoppingItem[]>([]);

  const ctx = api.useContext();
  const { mutate: deleteItem } = api.itemRouter.deleteItem.useMutation({
    onSuccess(shoppingItem) {
      setItems((prev) => prev.filter((item) => item.id !== shoppingItem.id));
      void ctx.itemRouter.getAllItems.invalidate();
    },
  });

  const { mutate: toggleChecked } = api.itemRouter.toggleChecked.useMutation({
    onSuccess(shoppingItem) {
      // check if the item is checked or not
      if (checkedItems.some((item) => item.id === shoppingItem.id)) {
        setCheckedItems((prev) =>
          prev.filter((item) => item.id !== shoppingItem.id)
        );
      } else {
        //add it to the checked items
        setCheckedItems((prev) => [...prev, shoppingItem]);
      }
    },
  });

  return (
    <li
      className="flex items-center justify-between rounded-lg border border-slate-300/50 p-2 text-xl transition duration-300 hover:border-slate-300"
      key={item.id}
    >
      <div className="relative cursor-pointer">
        <div className="pointer-events-none absolute inset-0 flex origin-left items-center justify-center">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: checkedItems.some((item) => item.id === id) ? "100%" : 0,
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="h-[2px] w-full translate-y-px bg-red-500"
          />
        </div>
        <span
          onClick={() => {
            toggleChecked({
              id,
              checked: checkedItems.some((item) => item.id === id)
                ? false
                : true,
            });
          }}
        >
          {item.name}
        </span>
      </div>
      <HiX
        onClick={() => deleteItem({ id })}
        className="cursor-pointer rounded-md text-2xl text-red-500 hover:border hover:border-slate-300"
      />
    </li>
  );
};

export default Item;
