import Image from "next/image";
import { Inter } from "next/font/google";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
const inter = Inter({ subsets: ["latin"] });

async function getBlogs() {
  const res = await fetch(
    `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENV}/entries?access_token=${process.env.CONTENTFUL_ACCESS_KEY}&content_type=articleContour`
  );

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const blogs = await getBlogs();
  return (
    <ul>
      {blogs.items.map((item: any) => (
        <li key={item.fields.id}>
          {item.fields.title}
          {documentToReactComponents(item.fields.body)}
        </li>
      ))}
    </ul>
  );
}
