import Navbar from "../components/Navbar";
import { Trash2, SquarePen, Plus, X } from "lucide-react";
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
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import { useContext } from "react";

export default function CategoriesPage() {
  const [showModal, setShowModal] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [putData, setPutData] = useState(null);
  const [categoryType, setCategoryType] = useState(null);
  const navigate = useNavigate();
  let content;
  const access = localStorage.getItem("access");
  const { logout, user } = useContext(AuthContext);

  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategories({ logout }),
    enabled: !!access,
  });
  const { mutate, isPending } = useMutation({
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
    mutateEdit({
      title: categoryName,
      description: description,
      id: putData.id,
    });
  }

  function handleForm(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const categoryName = fd.get("category");
    const description = fd.get("description");
    mutate({
      title: categoryName,
      description: description,
      type: categoryType,
    });
  }
  function handleDelete(id) {
    mutatedel({ id: id });
  }

  function handleOpen(row) {
    setPutData(row);
    setOpen1(true);
  }
  let modale;

  if (putData) {
    modale = (
      <>
        <div className="flex flex-col mb-8">
          <label htmlFor="" className="mb-3">
            Category Name
          </label>
          <input type="text" name="category" defaultValue={putData.title} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="mb-3">
            Description
          </label>
          <textarea
            name="description"
            id=""
            defaultValue={putData.description}
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
            className="border-b border-white/10 hover:bg-[#2b2b2b] transition text-[10px] sm:text-[14px] text-white bg-[#1E1E1E] duration-300 ease-in-out"
          >
            <td className="p-3">{row.title}</td>
            <td className="p-3">{row.description}</td>
            <td className="p-3">{row.type}</td>
            <td className="p-3 flex justify-start gap-4 items-center">
              <button className="text-blue-500 hover:text-blue-700 cursor-pointer">
                <SquarePen
                  onClick={() => handleOpen(row)}
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                />
              </button>
              <button className="text-red-500 hover:text-red-700 cursor-pointer">
                <Trash2
                  onClick={() => handleDelete(row.id)}
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                />
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
              <div className="flex justify-end w-full text-gray-500 hover:cursor-pointer hover:text-black duration-300 ease-in-out mb-8">
                <X onClick={() => setShowModal(false)} />
              </div>
              <div className="flex flex-col mb-8">
                <label htmlFor="" className="mb-3">
                  Category Name
                </label>
                <input
                  type="text"
                  name="category"
                  className="border-[1px] rounded-md  border-[#A8A2A3] px-4 py-2 focus:outline-0"
                  placeholder="Enter a category"
                />
              </div>
              <div className="flex flex-col mb-8">
                <label htmlFor="" className="mb-3">
                  Description
                </label>
                <textarea
                  name="description"
                  id=""
                  className="border-[1px] rounded-md  border-[#A8A2A3] px-4 py-2 focus:outline-0"
                  placeholder="Enter your description"
                ></textarea>
                <div className="type flex flex-wrap w-full mt-8 gap-3">
                  <label
                    className={
                      categoryType === "Income"
                        ? "px-3 py-2 rounded-2xl border-[2px] border-[#A8A2A3] bg-sky-400"
                        : "px-3 py-2 rounded-2xl border-[2px] border-[#A8A2A3]"
                    }
                    onClick={() => setCategoryType("Income")}
                  >
                    Income
                  </label>
                  <label
                    className={
                      categoryType === "Expense"
                        ? "px-3 py-2 rounded-2xl border-[2px] border-[#A8A2A3] bg-sky-400"
                        : "px-3 py-2 rounded-2xl border-[2px] border-[#A8A2A3]"
                    }
                    onClick={() => setCategoryType("Expense")}
                  >
                    Expense
                  </label>
                </div>
              </div>
              <div className="w-full flex justify-end">
                <button
                  type="submit"
                  className="cursor-pointer bg-[#008080]/30 text-[#008080] px-5 py-2 rounded-md font-semibold hover:text-[#008080] border-1 border-black duration-300 ease-in-out hover:border-1 hover:border-[#008080] hover:bg-transparent"
                >
                  {isPending ? "Submitting" : "Submit"}
                </button>
              </div>
            </form>
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
            className="flex items-center bg-[#008080]/30 text-[#008080] py-1 px-3 rounded-md cursor-pointer md:py-2 md:px-5 md:text-[16px] text-xs gap-1 hover:bg-black hover:text-[#008080] border-1 border-black duration-300 ease-in-out hover:border-1 hover:border-[#008080]"
            onClick={() => {
              if (!user) {
                alert("Please log in first!");
                return;
              }
              setShowModal(true);
            }}
          >
            <Plus size={18} />
            <span className=""> Add Category</span>
          </button>
        </div>
        <table className="w-full border-collapse rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-[#1E1E1E] text-[#FBF9FF] text-left text-[10px] md:text-[15px] border-b border-white/10">
              <th className="p-3 font-semibold">Category</th>
              <th className="p-3 font-semibold">Description</th>
              <th className="p-3 font-semibold">Type</th>
              <th className="p-3 font-semibold">Options</th>
            </tr>
          </thead>
          {content}
        </table>
        {!user ? (
          <div className="w-full flex flex-col items-center justify-center mt-[130px]">
            <p className="font-bold text-[#008080]">
              Login to view your Categories
            </p>
            <Link
              to="/login"
              className="cursor-pointer bg-[#008080]/30 text-[#008080] px-5 py-2 rounded-md font-semibold hover:text-[#008080] border-1 border-black duration-300 ease-in-out hover:border-1 hover:border-[#008080] hover:bg-transparent mt-3"
            >
              Login
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
