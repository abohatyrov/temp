import CardCatalogueLoading from "../components/Card/CardCatalogueLoading";

export default function ProductsSectionLoading() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mt-2">
        <CardCatalogueLoading />
        <CardCatalogueLoading />
        <CardCatalogueLoading />
    </div>
  );
}
