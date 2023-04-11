import { shoppingItem } from "@prisma/client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { api } from "~/utils/api";

interface ItemModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setItems: Dispatch<SetStateAction<shoppingItem[]>>;
}

const ItemModal: FC<ItemModalProps> = ({ setModalOpen, setItems }) => {
  const [input, setInput] = useState<string>("");

  const { mutate: addItem } = api.itemRouter.addItem.useMutation({
    onSuccess(shoppingItem) {
        setItems((prev) => [...prev, shoppingItem]);
    }
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/75">
      <div className="space-y-4 rounded-md bg-white p-3">
        <h3 className="text-xl font-medium">Name of item</h3>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-md border-gray-300 bg-gray-300 p-1 shadow-sm"
        />
        <div className="grid grid-cols-2 gap-8">
          <button
            type="button"
            className="rounded-md bg-gray-500 p-2 text-sm text-white transition hover:bg-gray-600"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-md bg-blue-500 p-2 text-sm text-white transition hover:bg-blue-600"
            onClick={() => {
              addItem({ name: input });
              setModalOpen(false);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
