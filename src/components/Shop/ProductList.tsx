// import React from "react";
// import Product from "../Product/Product";
// import ReactPaginate from "react-paginate";
// const ProductList = ({ filteredData, pageNumber, setPageNumber }) => {
//   const productsPerPage = 9;
//   const pagesVisited = pageNumber * productsPerPage;

//   const pageCount = Math.ceil(filteredData.length / productsPerPage);

//   const changePage = ({ selected }:any) => {
//     setPageNumber(selected);
//   };

//   return (
//     <div>
//       <div className="list-product hide-product-sold grid md:grid-cols-3 lg:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[40px] mt-7">
//         {filteredData
//           .slice(pagesVisited, pagesVisited + productsPerPage)
//           .map((item) => (
//             <Product key={item.productId} data={item} />
//           ))}
//       </div>
//       <div className="flex justify-center">
//         {pageCount > 1 && (
//           <div className="list-pagination flex items-center md:mt-10 mt-7">
//             <ReactPaginate
//               previousLabel={"<"}
//               nextLabel={">"}
//               pageCount={pageCount}
//               onPageChange={changePage}
//               containerClassName={"pagination"}
//               activeClassName={"active"}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductList;

import React from "react";
import Product from "../Product/Product";
import ReactPaginate from "react-paginate";
import { ProductType } from "@/type/ProductType";



interface ProductListProps {
  filteredData: ProductType[];
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  filteredData,
  pageNumber,
  setPageNumber,
}) => {
  const productsPerPage = 9;
  const pagesVisited = pageNumber * productsPerPage;

  const pageCount = Math.ceil(filteredData.length / productsPerPage);

  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <div className="list-product hide-product-sold grid md:grid-cols-3 lg:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[40px] mt-7">
        {filteredData
          .slice(pagesVisited, pagesVisited + productsPerPage)
          .map((item) => (
            <Product key={item.productId} data={item} />
          ))}
      </div>
      <div className="flex justify-center">
        {pageCount > 1 && (
          <div className="list-pagination flex items-center md:mt-10 mt-7">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;