import Image from "next/image";

function Product({ product }) {
    return (
        <div className="bg-[var(--color-secondary-0)] rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
            <div className="relative w-full h-48">
                <Image
                    src={product.imageLink}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-xl"
                    quality={100}
                />
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 text-[var(--color-secondary-800)]">
                    {product.title}
                </h3>
                <p className="text-[var(--color-secondary-500)] text-sm">
                    {product.category.title}
                </p>
            </div>
        </div>
    );
}
export default Product