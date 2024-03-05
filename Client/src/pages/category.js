import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../components/layout/DarkModeSlice";
//cpn
import PopularSection from "../components/Stories/PopularSection";
import CardStories from "../components/components/cardStories";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
  faBookmark,
  faEye,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
// layout
import NavBar from "../components/layout/Navbar";
import Footer from "../components/layout/footer";
import { useEffect } from "react";
import axios from "axios";
import { Select, Skeleton } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const Category = () => {
  const { slug: initialSlug } = useParams();
  const navigate = useNavigate();

  const darkMode = useSelector(selectDarkMode);
  // sate
  const [loading, setLoading] = useState(false);
  const [isCategory, setIsCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState();

  //fetch
  const [selectedCategory, setSelectedCategory] = useState(initialSlug);

  useEffect(() => {
    const fetchDataGenres = async () => {
      const res = await axios.get(`https://otruyenapi.com/v1/api/the-loai`);
      if (res.data) {
        setGenres(res.data.data);
      }
    };
    fetchDataGenres();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://otruyenapi.com/v1/api/the-loai/${selectedCategory}`
        );

        if (res.data) {
          setIsCategory(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCategory]);
  console.log(isCategory);

  const handleCategoryChange = (event) => {
    const newSlug = event.target.value;
    setSelectedCategory(newSlug);
  };
  // chon the loai

  //   phan trang (pagination)
  const truyensPerPage = 10;
  const indexOfLastTruyen = currentPage * truyensPerPage;
  const indexOfFirstTruyen = indexOfLastTruyen - truyensPerPage;
  const currentTruyens = isCategory.items?.slice(
    indexOfFirstTruyen,
    indexOfLastTruyen
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(isCategory.length / truyensPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div
      className={`${
        darkMode ? "bg-bg_dark text-text_darkMode" : "bg-bg_light"
      }`}
    >
      <NavBar />
      <div
        className={`
                grid phone:grid-cols-1 tablet:grid-cols-1 laptop:grid-cols-4 gap-1 w-[95%]  mt-6 m-auto
            `}
      >
        <div
          className={`${
            darkMode ? "bg-bg_dark_light text-text_darkMode" : "bg-white"
          } laptop:col-span-3  p-2`}
        >
          <div className="py-2 p-2 h-12 flex items-center  justify-between text-xl font-semibold  border-b-[1px] border-[#F0F0F0] ">
            <p>
              <span className="font-bold text-xl">Thể loại:</span>{" "}
              {isCategory?.titlePage}
            </p>
            <select
              className="bg-[#E6F4FF] rounded-xl p-2 text-primary-color"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {genres?.items.map((item) => {
                return (
                  <option
                    key={item.slug}
                    value={item.slug}
                    className="bg-[#E6F4FF] text-primary-color"
                    // style={{
                    //   /* Add your custom styling here */
                    //   padding: '8px 12px',
                    //   fontSize: '14px',
                    //   fontWeight:"unset",
                    //   borderRadius: '4px',
                    //   cursor: 'pointer',
                    // }}
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div
            className={`${
              darkMode ? "bg-bg_dark_light text-text_darkMode" : "bg-white"
            } 
                      mt-10  grid  phone:grid-cols-2 phone:gap-2 tablet:grid-cols-3 lg:grid-cols-3 desktop:grid-cols-4 lg:gap-1 place-items-center
                    `}
          >
            {loading && <Skeleton avatar active />}

            {isCategory.items?.map((item, index) => {
              console.log(item.updatedAt);
              const timeAgo = formatDistanceToNow(new Date(item.updatedAt), {
                addSuffix: true,
                locale: vi,
              });
              const trimmedTimeAgo = timeAgo.replace(/^khoảng\s/, "");
            
              // console.log(item?.chaptersLatest[0].chapter_name);
              return (
                <>
                  <div className="flex flex-col justify-center items-center gap-2">
                    <CardStories
                      key={item._id}
                      id={item._id}
                      title={item.name}
                      img={`https://img.otruyenapi.com${isCategory.seoOnPage.og_image?.[index]}`}
                      slug={item.slug}
                      time={trimmedTimeAgo}
                      // chapter={item.chaptersLatest[0].chapter_name}
                      nomarl
                    />
                    {/* <p className='text-sm'>Chap {(newestChapter.chapter_id)}</p> */}
                  </div>
                </>
              );
            })}
          </div>
          <div className="p-4 w-full border-t-[1px] mt-10">
            <Pagination
              truyensPerPage={truyensPerPage}
              totalTruyens={isCategory.length}
              paginate={paginate}
              currentPage={currentPage}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          </div>
        </div>

        {/* Pho bien */}
        {/* <div className={`${darkMode? "bg-bg_dark_light text-text_darkMode": "bg-white"} h-fit shadow-lg flex-1`}> */}
        {/* <PopularSection darkMode={darkMode} sortedData={isCategory} /> */}
        {/* </div> */}
      </div>
      <Footer />
    </div>
  );
};

const Pagination = ({
  truyensPerPage,
  totalTruyens,
  paginate,
  currentPage,
  nextPage,
  prevPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalTruyens / truyensPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination flex justify-center items-center gap-5">
      <li className="page-item">
        <a href="#" className="page-link" onClick={() => prevPage()}>
          Previous
        </a>
      </li>
      {pageNumbers.map((number) => (
        <li
          key={number}
          onClick={() => paginate(number)}
          className={`page-item ${
            currentPage === number ? "active bg-primary-color text-white" : ""
          } cursor-pointer border-[1px] py-2 px-4`}
        >
          <a href="#" className="page-link">
            {number}
          </a>
        </li>
      ))}
      <li className="page-item">
        <a href="#" className="page-link" onClick={() => nextPage()}>
          Next
        </a>
      </li>
    </ul>
  );
};

export default Category;
