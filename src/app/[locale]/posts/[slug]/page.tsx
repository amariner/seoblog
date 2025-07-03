import { getPostBySlug, getPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

interface PostPageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export async function generateStaticParams() {
  const posts = getPosts(); // This will default to 'en'
  const esPosts = getPosts('es');
  
  const enParams = posts.map((post) => ({ slug: post.slug, locale: 'en' }));
  const esParams = esPosts.map((post) => ({ slug: post.slug, locale: 'es' }));

  return [...enParams, ...esParams];
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug, params.locale);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  return {
    title: `${post.title} | AstroBlog`,
    description: post.summary,
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug, params.locale);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-6 py-16 md:py-24">
      <div className="mb-16">
        <Link href={`/${params.locale}`} className="inline-flex items-center gap-2 font-medium text-primary hover:text-primary/80 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to all posts
        </Link>
      </div>

      <header className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground !leading-tight max-w-4xl mx-auto text-center">
          {post.title}
        </h1>
        <div className="mt-6 text-center text-muted-foreground">
          <span>By {post.author}</span>
          <span className="mx-2">&bull;</span>
          <time dateTime={post.publishedAt}>
            {format(new Date(post.publishedAt), "MMMM d, yyyy")}
          </time>
        </div>
      </header>

      {post.featuredImage && (
         <Image
          src={post.featuredImage}
          alt={post.title}
          width={1200}
          height={600}
          className="w-full rounded-lg my-16 object-cover"
          data-ai-hint="post header"
        />
      )}
      
      <div className="prose dark:prose-invert lg:prose-xl max-w-4xl mx-auto">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
