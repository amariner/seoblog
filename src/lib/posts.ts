import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Post {
  slug: string;
  title: string;
  author: string;
  publishedAt: string; // ISO date string
  summary: string;
  featuredImage?: string;
  content: string; // Markdown content
}

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getPosts(): Post[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);

        return {
          slug,
          ...(matterResult.data as {
            title: string;
            author: string;
            publishedAt: string;
            summary: string;
            featuredImage?: string;
          }),
          content: matterResult.content,
        };
      });

    return allPostsData.sort((a, b) => {
      if (new Date(a.publishedAt) < new Date(b.publishedAt)) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    if (error instanceof Error && (error as NodeJS.ErrnoException).code === "ENOENT") {
      console.log(`Directory ${postsDirectory} not found. No posts will be loaded.`);
      return [];
    }
    throw error;
  }
}

export function getPostBySlug(slug: string): Post | undefined {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as {
        title: string;
        author: string;
        publishedAt: string;
        summary: string;
        featuredImage?: string;
      }),
      content: matterResult.content,
    };
  } catch (error) {
    if (error instanceof Error && (error as NodeJS.ErrnoException).code === "ENOENT") {
      return undefined;
    }
    throw error;
  }
}
