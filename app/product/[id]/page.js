export default async function Home({ params }) {
  const data = await fetch(`http://localhost:3000/api/product/${params.id}`, { cache: "no-store" });
  const product = await data.json();
  console.log({ product, category: product.category });
  // const id = params.id;
  return (
    <div>
      <h1>Product</h1>
      <p>{product.name}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <p>{product.category.name}</p>
    </div>
  );
}
