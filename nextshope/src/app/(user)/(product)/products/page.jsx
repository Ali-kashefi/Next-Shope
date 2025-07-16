"server client";
import ProductCart from "@/components/ui/ProductCart";
import {
  getallCategorysAPI,
  getallproductsAPI,
} from "@/service/ServicesMethode";
import React from "react";
import CategorySideBar from "./productSlug/page";
import queryString from "query-string";
import Link from "next/link";
import { cookies } from "next/headers";
import { toStringcookie } from "utils/toStringCookie";

async function Page({ searchParams }) {


  
const cookieStore = await cookies();
const options = toStringcookie(cookieStore);


  const getallCategorys = getallCategorysAPI();
  const getallproducts = getallproductsAPI(queryString.stringify(searchParams));
  const [{ products }, { categories }] = await Promise.all([
    getallproducts,
    getallCategorys,
  ]);

  return (
    <>
      <div className="font-display grid grid-cols-[100px_1fr] md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] bg-white h-screen overflow-hidden">
        <CategorySideBar categories={categories} />
        <div className="overflow-y-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {products.length > 0 ? (
              products.map((data) => {
                return (
                
                    <ProductCart
                      key={data._id}
                      description={data.description}
                      price={data.price}
                      title={data.title}
                      src={data.imageLink}
                      date={data.createdAt}
                      product={data}
                    />
            
                );
              })
            ) : (
              <div>محصولی برای نمایش وجود ندارد.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
