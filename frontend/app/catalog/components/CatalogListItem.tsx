import { API_BASE_URL } from "../../../config/api";

interface CatalogListItemProps {
  category?: any;
}

export function CatalogListItem({ category }: CatalogListItemProps) {
  if (!category) return null;

  const imageSrc = category.image
    ? category.image.startsWith("http") || category.image.startsWith("//")
      ? category.image
      : `${API_BASE_URL}${category.image}`
    : `https://cdn.bigam.ru/resize_cache/iblock/f76/1pdkw4ua1yph314yu390tc842dcfdm89/156_156_0/${category.slug}.jpg`;

  return (
    <li className="a-catalog-list__item">
      <a className="a-catalog-card" href={category.href}>
        <div className="a-catalog-card__text">{category.name}</div>
        <div className="a-catalog-card__image">
          <img alt={category.name} src={imageSrc} />
        </div>
      </a>
    </li>
  );
}
