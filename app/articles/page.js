import { addArticle, getArticles, deleteArticle } from "@/actions/articles";

export default async function Home() {
  const articles = await getArticles();

  return (
    <main>
      <h1>Blog ({articles.length})</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          {articles.map((article) => (
            <div key={article._id}>
              <button onClick={()=>deleteArticle(article._id)}>X</button>
              <h3>
                [{article.category}] {article.title}
              </h3>
              <p>{article.content}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <form action={addArticle} method="POST">
            <div>
              <label>Title</label>
            </div>
            <div>
              <input name="title" type="text" />
            </div>
            <div>
              <label>Content</label>
            </div>
            <div>
              <textarea name="content" />
            </div>
            <div>
              <label>Category</label>
            </div>
            <div>
              <textarea name="category" />
            </div>
            <div className="col-span-2">
              <button>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
