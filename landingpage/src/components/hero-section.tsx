import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  ctaPrimary?: {
    text: string;
    href: string;
  };
  ctaSecondary?: {
    text: string;
    href: string;
  };
  variant?: "default" | "centered-image" | "hero-banner";
  imagePosition?: "left" | "right"; // For default variant
}

export default function HeroSection({
  title,
  description,
  imageUrl,
  imageAlt = "Hero image",
  ctaPrimary,
  ctaSecondary,
  variant = "default",
  imagePosition = "right",
  className,
  ...props
}: HeroSectionProps) {
  return (
    <section className={cn("w-full py-12 md:py-24 lg:py-32", className)} {...props}>
      <div className="container px-4 md:px-6">
        {variant === "default" && (
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  {title}
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  {description}
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                {ctaPrimary && (
                  <Link href={ctaPrimary.href} className={cn(buttonVariants({ size: "lg" }))}>
                    {ctaPrimary.text}
                  </Link>
                )}
                {ctaSecondary && (
                  <Link href={ctaSecondary.href} className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                    {ctaSecondary.text}
                  </Link>
                )}
              </div>
            </div>
            {imageUrl && (
              <Image
                alt={imageAlt}
                className={cn("mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full", imagePosition === "left" ? "lg:order-first" : "lg:order-last")}
                height="550"
                src={imageUrl}
                width="550"
              />
            )}
          </div>
        )}

        {variant === "centered-image" && (
          <div className="flex flex-col items-center text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="max-w-2xl text-muted-foreground md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed">
              {description}
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                {ctaPrimary && (
                    <Link href={ctaPrimary.href} className={cn(buttonVariants({ size: "lg" }))}>
                    {ctaPrimary.text}
                    </Link>
                )}
                {ctaSecondary && (
                    <Link href={ctaSecondary.href} className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                    {ctaSecondary.text}
                    </Link>
                )}
            </div>
            {imageUrl && (
              <Image
                alt={imageAlt}
                className="mx-auto overflow-hidden rounded-xl object-cover w-full max-w-4xl aspect-[2/1]"
                height="400"
                src={imageUrl}
                width="800"
              />
            )}
          </div>
        )}

        {variant === "hero-banner" && (
          <div className="relative isolate overflow-hidden py-24 sm:py-32 lg:py-40">
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt={imageAlt}
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
                />
            )}
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  {title}
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  {description}
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  {ctaPrimary && (
                    <Link href={ctaPrimary.href} className={cn(buttonVariants({ size: "lg", variant: "default" }))}>
                      {ctaPrimary.text}
                    </Link>
                  )}
                  {ctaSecondary && (
                    <Link href={ctaSecondary.href} className={cn(buttonVariants({ variant: "link", size: "lg" }))}>
                      {ctaSecondary.text} <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
