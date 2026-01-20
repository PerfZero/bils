export default function ProductGrid({ products }) {
  return (
    <section className="grid">
      <h2>Latest products</h2>
      <div className="product-grid">
        {products.length === 0 && (
          <div className="empty">No products yet. Add some in Django admin.</div>
        )}
        {products.map((product) => (
          <article key={product.id} className="product-card">
            <div className="image" />
            <div className="product-body">
              <div className="product-title">{product.name}</div>
              <div className="product-desc">{product.description || "No description"}</div>
              <div className="product-row">
                <span className="price">${product.price}</span>
                <span className="pill">{product.category?.name || "Uncategorized"}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
