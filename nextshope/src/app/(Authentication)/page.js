"use client"
import Product from "@/components/ui/Product";
import HeroSlider from "@/components/ui/Slider";
import { useGetallproduct } from "@/hook/getAllProducts";
import toast from "react-hot-toast";



export default function Home() {
  const { isLoading, data, error } = useGetallproduct();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background-app-rgb)] text-[var(--color-secondary-900)]">
        <p className="text-xl font-medium">در حال بارگذاری محصولات...</p>
      </div>
    );
  }

  if (error) {
    toast.error("خطا در بارگذاری محصولات.");
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background-app-rgb)] text-[var(--color-error)]">
        <p className="text-xl font-medium">خطا در بارگذاری محصولات: {error.message}</p>
      </div>
    );
  }

  const products = data?.products || [];

  return (
    <div className="min-h-screen flex flex-col items-center bg-[var(--background-app-rgb)] text-[var(--color-secondary-900)] font-sans">
     <HeroSlider/>

      <section className="w-full max-w-7xl px-4 py-8 md:px-8 lg:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map(product => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}