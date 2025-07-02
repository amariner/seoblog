import { getPosts, type Post } from "@/lib/posts";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const posts = getPosts();

  return ( 
    <div className="flex flex-col items-center px-4 md:px-8 lg:px-12 py-16 md:py-24">
      <section className="text-left py-24 md:py-40">
        <h1 className="text-4xl md:text-6xl font-medium !leading-snug max-w-4xl">
          <span className="text-foreground">Welcome to AstroBlog—a space for </span>
          <span className="font-bold text-foreground">ideas, technology, and creativity</span>
          <span className="text-muted-foreground">, one post at a time.</span>
        </h1>
      </section>

      <section id="posts" className="py-20 scroll-mt-20">
        <h2 className="text-sm font-medium text-foreground mb-12">
          Featured Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 max-w-screen-lg w-full">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <article>
      <Link href={`/posts/${post.slug}`} className="group w-full text-left block">
        <div className="overflow-hidden rounded-lg">
          <Image
            src={post.featuredImage || "https://placehold.co/600x450.png"}
            alt={post.title}
            width={600}
            height={450}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            data-ai-hint="abstract blog"
          />
        </div>
        <div className="pt-4">
          <h3 className="text-lg font-bold text-foreground">{post.title}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.summary}</p>
        </div>
      </Link>
    </article>
  );
}
