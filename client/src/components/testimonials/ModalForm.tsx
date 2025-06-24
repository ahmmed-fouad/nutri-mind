import React from "react";

type ModalField = { type: string; placeholder: string; key: string };
type ModalFormProps = {
  modalFields: ModalField[];
  setShowModal: (show: boolean) => void;
};

export default function ModalForm({ modalFields, setShowModal }: ModalFormProps) {
  return (
    <form className="flex flex-col gap-4">
      {modalFields.map((field) =>
        field.type === "textarea" ? (
          <textarea
            key={field.key}
            placeholder={field.placeholder}
            className="px-4 py-3 rounded-xl border border-zinc-200 bg-white/50 text-base outline-none transition focus:border-indigo-500 min-h-[80px]"
          />
        ) : (
          <input
            key={field.key}
            type={field.type}
            placeholder={field.placeholder}
            className="px-4 py-3 rounded-xl border border-zinc-200 bg-white/50 text-base outline-none transition focus:border-indigo-500"
          />
        )
      )}
      <button
        type="button"
        className="btn bg-indigo-500 text-white hover:bg-indigo-700 py-2 rounded-lg font-semibold shadow"
        onClick={() => setShowModal(false)}
      >
        Submit
      </button>
    </form>
  );
} 