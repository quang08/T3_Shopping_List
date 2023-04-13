import { Dispatch, FC, SetStateAction, useState } from "react";
import { api } from "~/utils/api";

interface ItemModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ItemModal: FC<ItemModalProps> = ({ setModalOpen }) => {
  const [input, setInput] = useState<string>("");

  const ctx = api.useContext();
  const { mutate: addItem } = api.itemRouter.addItem.useMutation({
    onSuccess(shoppingItem) {
      void ctx.itemRouter.getAllItems.invalidate();
      //update the content by invalidating the query: This forces React Query to fetch fresh data from the API the next time the query is executed.
    },
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/75">
      <div className="space-y-4 rounded-md bg-slate-100 p-3">
        <h3 className="text-xl font-medium text-black">Name of item</h3>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-md border-gray-300 bg-gray-300 p-1 text-black shadow-sm focus:outline-0"
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
