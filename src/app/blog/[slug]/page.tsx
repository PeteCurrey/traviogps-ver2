import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Tag, User, Share2, Facebook, Twitter, Linkedin as LinkedinIcon, Copy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

async function getPost(slug: string) {
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !post) {
    return null;
  }

  return post;
}

async function getRelatedPosts(category: string | null, currentId: string) {
  if (!category) return [];
  
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("category", category)
    .eq("is_published", true)
    .neq("id", currentId)
    .limit(3);
    
  return posts || [];
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.meta_title || `${post.title} | Travio Blog`,
    description: post.meta_description || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      images: post.featured_image ? [post.featured_image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.category, post.id);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <PageWrapper>
      {/* Hero Header */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 border-b border-border bg-secondary/5">
        <div className="container-premium relative z-10">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-sm font-bold text-accent mb-8 hover:gap-2 transition-all group"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Insights
          </Link>
          
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {post.category && (
                <span className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-bold text-accent uppercase tracking-widest">
                  {post.category}
                </span>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                <Calendar className="h-4 w-4" />
                {formatDate(post.published_at || post.created_at)}
              </div>
            </div>
            
            <h1 className="font-serif text-display-3 md:text-display-2 text-foreground mb-8 leading-[1.1]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                {post.excerpt}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image && (
        <section className="container-premium -mt-12 lg:-mt-16 mb-20 relative z-20">
          <div className="aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border-4 border-background">
            <img 
              src={post.featured_image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      )}

      {/* Main Content Area */}
      <section className={cn("pb-24", !post.featured_image && "pt-12")}>
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Share Sidebar */}
            <aside className="lg:col-span-1 hidden lg:block sticky top-32 h-fit">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-6 vertical-text rotate-180">Distribute</p>
              <div className="flex flex-col gap-4">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent/10 hover:text-accent">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent/10 hover:text-accent">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent/10 hover:text-accent">
                  <LinkedinIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent/10 hover:text-accent">
                  <Copy className="h-5 w-5" />
                </Button>
              </div>
            </aside>

            {/* Content Body */}
            <article className="lg:col-span-8">
              <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-accent prose-strong:text-foreground">
                {post.content?.split('\n').map((paragraph, idx) => (
                  paragraph.trim() ? <p key={idx}>{paragraph}</p> : <br key={idx} />
                ))}
              </div>

              {/* Tags Area */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-16 pt-8 border-t border-border">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-secondary rounded-lg text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Right Sidebar - More Info */}
            <aside className="lg:col-span-3 space-y-12">
              {/* Author Box */}
              <div className="p-8 bg-card border border-border rounded-2xl shadow-sm">
                <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-6">
                  <User className="h-8 w-8 text-accent" />
                </div>
                <h4 className="font-bold text-lg mb-2">Travio Intelligence</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-medium">
                  Authoritative analysis from the global fleet management and tracking experts at Travio.
                </p>
                <Button variant="outline" className="w-full font-bold rounded-xl" asChild>
                  <Link href="/about">About Travio</Link>
                </Button>
              </div>

              {/* Newsletter Small */}
              <div className="p-8 bg-accent text-accent-foreground rounded-2xl shadow-glow">
                <h4 className="font-bold text-lg mb-4">Stay Synchronized</h4>
                <p className="text-sm opacity-90 leading-relaxed mb-6 font-medium">
                  Receive high-frequency analytical updates directly in your inbox.
                </p>
                <div className="space-y-3">
                  <Input placeholder="Email Address" className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:ring-white h-12" />
                  <Button className="w-full bg-white text-accent hover:bg-white/90 font-bold h-12 rounded-xl">Subscribe</Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Narratives */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-secondary/5 border-t border-border">
          <div className="container-premium">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Continue Reading</p>
                <h2 className="text-3xl font-bold font-serif">Related <span className="italic-accent">Narratives</span></h2>
              </div>
              <Button variant="link" className="text-accent font-bold" asChild>
                <Link href="/blog" className="flex items-center">
                  View All Insights
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((rPost) => (
                <Link key={rPost.id} href={`/blog/${rPost.slug}`} className="group block">
                  <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-glow transition-all duration-300 h-full flex flex-col">
                    <div className="aspect-video relative overflow-hidden bg-secondary">
                      {rPost.featured_image ? (
                        <img 
                          src={rPost.featured_image} 
                          alt={rPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-accent/20">
                          <Tag className="h-12 w-12" />
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
                        <Calendar className="h-3 w-3" />
                        {formatDate(rPost.published_at || rPost.created_at)}
                      </div>
                      <h3 className="font-bold text-xl mb-3 group-hover:text-accent transition-colors line-clamp-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {rPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-6 font-medium">
                        {rPost.excerpt}
                      </p>
                      <div className="mt-auto flex items-center text-xs font-bold text-accent uppercase tracking-widest group-hover:gap-2 transition-all">
                        Read Entry
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageWrapper>
  );
}
