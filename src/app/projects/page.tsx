"use client";
import { FaCaretDown } from "react-icons/fa";
import { data } from "@/helper/data";
import { FaAngleDown } from "react-icons/fa";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@/components/Pagination";

function page({ searchParams }: { searchParams: any }) {
  // ?category=${category}
  const [totalPages, setTotalPages] = useState<number>(0);
  const [projects, setProjects] = useState<any[]>([]);
  // const [category, setCategory] = useState<string>("");
  useEffect(()=>{
    const page = searchParams.page || 1;
    console.log(page);
    // setPage(searchParams.page);
    async function fetchData() {
      try {
        console.log(page);
        const result = await axios.get(`/api/get-projects?page=${page}`);
        console.log(result.data);
        setTotalPages(result.data.totalPages);
        setProjects(result.data.projects);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  // console.log(category);      
  



  return (
    <div className="py-32 px-10 container dark:bg-dot-white/[0.2]">

      {/* filter section */}
      <div className="flex justify-between items-start relative">
        <div className="flex gap-5">
          {data.map((category, index) => (
            <div
              key={index}
              className="flex items-start flex-col gap-2 transition delay-75 ease-in group "
            >
              <span className="border border-n-6 py-2.5 px-4 bg-n-8 text-sm capitalize rounded flex items-center gap-2 cursor-pointer ">
                {category.head}
                <FaCaretDown />
              </span>
              <div className="absolute bg-n-8 top-9 z-10 hidden group-hover:md:block  border mt-4 rounded-md p-2 border-n-6">
                <div className="grid grid-cols-3 gap-2 cursor-pointer">
                  {category.datas.map((data, index) => (
                    <span
                      key={index}
                      // onClick={()=>setCategory(data)}
                      className="bg-n-7 text-sm p-2.5 rounded-md hover:bg-n-6 transition-colors"
                    >
                      {data}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-end">
          <input
            type="search"
            placeholder="Search projects..."
            name="search"
            className="rounded px-4 p-2.5 outline-none caret-purple-700 selection:bg-purple-700 bg-n-8 border border-n-6"
          />
          <div className="mt-5 flex items-center space-x-2">
            <span className=" capitalize font-medium text-sm opacity-40">
              Sort by
            </span>
            <span className="font-semibold opacity-90 flex items-center">
              Recent <FaAngleDown />
            </span>
          </div>
        </div>
      </div>

        {/* Project card  */}
       <div>
          {projects.length < 1 ?
           (<span className="text-xl block text-center font-semibold">No projects found</span>) 
           : <div className="grid grid-cols-3 gap-10 mt-10">
            {projects.map((project, index) => (
              <Card key={index} project={project} />
            ))}
          </div>}
       </div>
        
        {/* pagination */}
        <Pagination totalPages={totalPages} currentPage={parseInt(searchParams.page)}/> 

      </div>
  );
}

export default page;
