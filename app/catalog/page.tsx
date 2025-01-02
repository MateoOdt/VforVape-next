import { CatalogGrid } from "@/components/catalog/catalog-grid";
import { CatalogHeader } from "@/components/catalog/catalog-header";

export default function CatalogPage() {
  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <CatalogHeader />
        <CatalogGrid />
      </div>
    </div>
  );
}