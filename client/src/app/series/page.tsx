import CatalogueView from '@/components/CatalogueView';

export const metadata = { title: 'TV Series — Netflex' };

export default function SeriesPage() {
  return (
    <CatalogueView
      type="series"
      heading="TV Series"
      intro="Classic television episodes that have entered the public domain."
    />
  );
}
