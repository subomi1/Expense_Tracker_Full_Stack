import Navbar from "../components/Navbar";
import { Trash2, SquarePen, Plus } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { getCategories } from "../http";

export default function CategoriesPage() {

  const { data } = useQuery({
    queryKey: ['category'],
    queryFn: getCategories
  })
  console.log(data);
  
  
  const rows = [
    {
      id: 1,
      name: "Data Grid",
      description:
        "the Community version has been on a rool lately i dont know why to be honest",
    },
    { id: 2, name: "Data Grid Pro", description: "the Pro version" },
    { id: 3, name: "Data Grid Premium", description: "the Premium version" },
    { id: 3, name: "Data Grid Premium", description: "the Premium version" },
    { id: 3, name: "Data Grid Premium", description: "the Premium version" },
  ];
  return (
    <div className="w-full">
      <Navbar name="Categories" />
      <div className="w-full overflow-x-auto sm:p-2 md:p-5">
        <div className="w-full flex justify-end mb-3">
          <button className="flex items-center bg-[#5558f1] text-white py-1 px-3 rounded-md cursor-pointer md:py-2 md:px-5 md:text-[16px] text-xs gap-1">
            <Plus size={18} />
            <span className=""> Add Category</span>
          </button>
        </div>
        <table className="w-full border-collapse shadow-lg rounded-2xl overflow-hidden">
          {/* Header */}
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left text-[10px] md:text-[15px]">
              <th className="p-3 font-semibold">CATEGORY NAME</th>
              <th className="p-3 font-semibold">DESCRIPTION</th>
              <th className="p-3 font-semibold">OPTIONS</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="bg-white">
            {rows.map((row, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition text-[10px] sm:text-[14px]"
              >
                <td className="p-3">{row.name}</td>
                <td className="p-3">{row.description}</td>
                <td className="p-3 flex justify-start gap-4 items-center">
                  <button className="text-blue-500 hover:text-blue-700 cursor-pointer">
                    <SquarePen size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-700 cursor-pointer">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
