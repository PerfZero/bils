import MainBanner from "./components/MainBanner";
import ProductGrid from "./components/ProductGrid";
import BrandsSection from "./components/BrandsSection";
import NewArrivalsSection from "./components/NewArrivalsSection";
import PromotionsSection from "./components/PromotionsSection";
import ReviewsSection from "./components/ReviewsSection";
import WhyUsSection from "./components/WhyUsSection";
import RecentlyViewedSection from "./components/RecentlyViewedSection";
import CompanyNewsSection from "./components/CompanyNewsSection";
import CompanyDescription from "./components/CompanyDescription";
import RecommendedProducts from "./components/RecommendedProducts";
import PopularCategoriesSlider from "./components/PopularCategoriesSlider";

const apiUrl = process.env.API_URL || "http://localhost:8000";
const publicApiUrl = process.env.NEXT_PUBLIC_API_URL || apiUrl;

async function getProducts() {
  const res = await fetch(`${apiUrl}/api/products/`, { cache: "no-store" });
  if (!res.ok) {
    return [];
  }
  return unwrapApiList(await res.json());
}

async function getBrands() {
  const res = await fetch(`${apiUrl}/api/brands/`, { cache: "no-store" });
  if (!res.ok) {
    return [];
  }
  return unwrapApiList(await res.json());
}

async function getCategories() {
  const res = await fetch(`${apiUrl}/api/categories/`, { cache: "no-store" });
  if (!res.ok) {
    return [];
  }
  return unwrapApiList(await res.json());
}

function unwrapApiList(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }
  return [];
}

function resolveAssetUrl(baseUrl, path) {
  if (!path) {
    return null;
  }
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${baseUrl}${path}`;
}

function normalizeNewArrivals(baseUrl, products) {
  return products
    .filter((product) => product.is_active)
    .filter((product) => product.is_new)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 8)
    .map((product) => {
      const images = Array.isArray(product.images) ? product.images : [];
      const mainImage = images.find((image) => image.is_main) || images[0];
      const imagePath = product.image || mainImage?.url;
      const rawPrice = Number(product.price);
      const rawRetailPrice = product.retail_price
        ? Number(product.retail_price)
        : null;
      const price = Number.isFinite(rawPrice) ? rawPrice : null;
      const retailPrice = Number.isFinite(rawRetailPrice)
        ? rawRetailPrice
        : null;
      const hasDiscount =
        Number.isFinite(retailPrice) &&
        Number.isFinite(price) &&
        retailPrice > price;

      return {
        id: product.id,
        title: product.name,
        url: product.href || `/product/${product.slug}/`,
        image: resolveAssetUrl(baseUrl, imagePath),
        price,
        oldPrice: hasDiscount ? retailPrice : null,
        discount: hasDiscount ? retailPrice - price : null,
        rating: Number(product.rating) || 0,
      };
    });
}

function flattenCategories(categories) {
  const result = [];

  const walk = (items) => {
    items.forEach((item) => {
      result.push(item);
      if (item.children && item.children.length > 0) {
        walk(item.children);
      }
    });
  };

  walk(categories);
  return result;
}

export default async function Home() {
  const products = await getProducts();
  const brands = await getBrands();
  const categories = await getCategories();
  const newArrivals = normalizeNewArrivals(publicApiUrl, products);
  const brandItems = brands
    .map((brand) => ({
      name: brand.name,
      url: brand.href || `/brands/${brand.slug}/`,
      logo: resolveAssetUrl(publicApiUrl, brand.logo),
    }))
    .filter((brand) => brand.logo);
  const popularCategories = flattenCategories(categories)
    .map((category) => ({
      id: category.id,
      name: category.name,
      url: category.href || `/catalog/${category.slug}/`,
      image: resolveAssetUrl(publicApiUrl, category.image),
      isPopular: category.is_popular,
    }))
    .filter((category) => category.isPopular)
    .slice(0, 8);

  return (
    <main className="a-page-main a-page__main">
      <MainBanner />
      <PopularCategoriesSlider categories={popularCategories} />
      <BrandsSection brands={brandItems} />
      <NewArrivalsSection products={newArrivals} />
      <PromotionsSection />
      <RecommendedProducts />
      <ReviewsSection />
      <WhyUsSection />
      <RecentlyViewedSection />
      <CompanyNewsSection />
      <CompanyDescription />
    </main>
  );
}
