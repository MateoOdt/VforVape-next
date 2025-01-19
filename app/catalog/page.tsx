import { CatalogGrid } from "@/components/catalog/catalog-grid";
import { CatalogHeader } from "@/components/catalog/catalog-header";
import { CatalogProvider } from "@/components/catalog/catalog-provider";

export default function CatalogPage() {
  return (
    <CatalogProvider>
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <CatalogHeader />
          <CatalogGrid />
        </div>
      </div>
    </CatalogProvider>
  );
}