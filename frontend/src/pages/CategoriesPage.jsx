import Navbar from "../components/Navbar";
import { Trash2, SquarePen, Plus } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCategories,
  postCategories,
  queryClient,
  deleteCategories,
  putCategories,
  getCategory,
} from "../http";
import Modal from "../UI/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import { useContext } from "react";

export default function CategoriesPage() {
  const [showModal, setShowModal] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [putData, setPutData] = useState(null);
  const navigate = useNavigate();
  let content;
  const access = localStorage.getItem("access");
  const { logout } = useContext(AuthContext);

  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategories({ logout })
  });
  const { mutate } = useMutation({
    mutationFn: postCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      setShowModal(false);
      navigate("./");
    },
  });

    const { mutate: mutateEdit } = useMutation({
    mutationFn: putCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      setOpen1(false);
    },
  });

  const { mutate: mutatedel } = useMutation({
    mutationFn: deleteCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
  function handleEditForm(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const categoryName = fd.get("category");
    const description = fd.get("description");
    mutateEdit({ title: categoryName, description: description, id:putData });
  }

  function handleForm(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const categoryName = fd.get("category");
    const description = fd.get("description");
    mutate({ title: categoryName, description: description });
  }
  function handleDelete(id) {
    mutatedel({ id: id });
  }

  const { data: editableData } = useQuery({
    queryKey: ["category", putData],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey; // destructure id from queryKey
      return getCategory({ id });
    },
    enabled: !!putData, // only fetch if putData has a value
  });
  function handleOpen(id) {
    setPutData(id);
    setOpen1(true); // triggers query
  }
  let modale;

  if (editableData) {
    modale = (
      <>
        <div className="flex flex-col mb-8">
          <label htmlFor="" className="mb-3">
            Category Name
          </label>
          <input
            type="text"
            name="category"
            defaultValue={editableData.title}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="mb-3">
            Description
          </label>
          <textarea
            name="description"
            id=""
            defaultValue={editableData.description}
          ></textarea>
        </div>
      </>
    );
  }

  if (data && access !== null) {
    content = (
      <tbody className="bg-white">
        {data?.map((row, index) => (
          <tr
            key={index}
            className="border-b border-b-[#CDAF94] hover:bg-[#CDAF94] transition text-[10px] sm:text-[14px] text-[#3D352E] bg-[#A8A2A3] duration-300 ease-in-out"
          >
            <td className="p-3">{row.title}</td>
            <td className="p-3">{row.description}</td>
            <td className="p-3 flex justify-start gap-4 items-center">
              <button className="text-blue-500 hover:text-blue-700 cursor-pointer">
                <SquarePen size={18} onClick={() => handleOpen(row.id)} />
              </button>
              <button className="text-red-500 hover:text-red-700 cursor-pointer">
                <Trash2 size={18} onClick={() => handleDelete(row.id)} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
  return (
    <div className="w-full">
      <Navbar name="Categories" />
      <div className="w-full overflow-x-auto p-3">
        {showModal && (
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <form action="" onSubmit={handleForm}>
              <div className="flex flex-col mb-8">
                <label htmlFor="" className="mb-3">
                  Category Name
                </label>
                <input type="text" name="category" className="border-[1px] rounded-md  border-[#A8A2A3]"/>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="mb-3">
                  Description
                </label>
                <textarea name="description" id=""></textarea>
              </div>
              <button type="submit">submit</button>
            </form>
            <button onClick={() => setShowModal(false)}>Close</button>
          </Modal>
        )}
        {open1 && (
          <Modal isOpen={open1} onClose={() => setOpen1(false)}>
            <form action="" onSubmit={handleEditForm}>
              {modale}
              <button type="submit">submit</button>
            </form>
            <button onClick={() => setOpen1(false)}>Close</button>
          </Modal>
        )}
        <div className="w-full flex justify-end mb-3">
          <button
            className="flex items-center bg-[#7A4433] text-[#F5F3F0] py-1 px-3 rounded-md cursor-pointer md:py-2 md:px-5 md:text-[16px] text-xs gap-1 hover:bg-[#CDAF94] hover:text-[#3D352E] border-1 border-[#7A4433] duration-300 ease-in-out"
            onClick={() => setShowModal(true)}
          >
            <Plus size={18} />
            <span className=""> Add Category</span>
          </button>
        </div>
        <table className="w-full border-collapse rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-[#7A4433] text-[#FBF9FF] text-left text-[10px] md:text-[15px]">
              <th className="p-3 font-semibold">CATEGORY NAME</th>
              <th className="p-3 font-semibold">DESCRIPTION</th>
              <th className="p-3 font-semibold">OPTIONS</th>
            </tr>
          </thead>
          {content}
        </table>
      </div>
    </div>
  );
}
