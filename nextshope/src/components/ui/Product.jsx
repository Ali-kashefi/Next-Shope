import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "utils/priceFornater";

function Product({ product }) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-primary-500 border border-transparent">
        <div className="relative w-full h-48 sm:h-56 flex items-center justify-center"> 
          <Image
            src={product.imageLink}
            alt={product.title}
            layout="fill"
       
            objectFit="contain" 
            
            className="rounded-t-2xl"
            quality={90}
          />
        
        </div>
        <div className="p-5">
          <h3 className="font-bold text-xl mb-1 text-gray-800">
            {product.title}
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            {product.category.title}
          </p>

          Example: <p className="text-lg font-semibold text-primary-600 mt-2">{formatPrice(product.price)}</p>
        </div>
      </div>
    </Link>
  );
}

export default Product;