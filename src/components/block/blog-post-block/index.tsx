import Image from "next/image";
import Link from "next/link";

type BlogPostProps = {
  title: string;
  description: string;
  category: string;
  url: string;
  image: { src: string; alt: string; width: number; height: number };
};

type BlogPostCardProps = {
  blogPost: BlogPostProps;
};

const BlogPostCard: React.FC<BlogPostCardProps> = ({ blogPost }) => {
  const { title, description, category, url, image, date } = blogPost;
  // Use blog posts fields to generate the fields needed.

  return (
    <article className="prose">
      {image ? <Image className="w-full rounded-[20px]" src={image.src} alt={image.alt} width={image.width} height={image.height} /> : null}
      {category ? <p className="text-[12px] uppercase tracking-[1px] mb-[12px]">{category}</p> : null}
      {title ? <h3 className="my-0">{title}</h3> : null}
      {description ? <p>{description}</p> : null}
      {url ? (
        <Link className="link--arrow" href={url}>
          Read
        </Link>
      ) : null}
    </article>
  );
};

export default BlogPostCard;
