import { addArticle } from "@/actions/articles";

export default async function Home() {
  return (
    <form action={addArticle}>
      <div>
        <label htmlFor="title">Title</label>
        <input name="title" type="text" />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea name="content" />
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <input name="category" type="text" />
      </div>
      <button>Submit</button>
    </form>
  );
}
