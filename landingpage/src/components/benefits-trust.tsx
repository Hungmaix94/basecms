'use client'

import Image from "next/image"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, Award, Lightbulb, TrendingUp, Zap, BarChart, Cpu, Layers, Check } from "lucide-react"

const iconMap: { [key: string]: React.ElementType } = {
  shield: ShieldCheck,
  award: Award,
  lightbulb: Lightbulb,
  trending: TrendingUp,
  zap: Zap,
  "bar-chart": BarChart,
  cpu: Cpu,
  layers: Layers,
  check: Check,
};

import { getStyles, StyleConfig } from "@/lib/styles";

// ... imports

interface BenefitTrustItem {
  title: string;
  description: string;
  iconName?: string; // Changed from icon component to string name
  imageUrl?: string; // For trust badges/logos
}

interface BenefitsTrustProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionTitle?: string;
  sectionDescription?: string;
  items: BenefitTrustItem[];
  variant?: "icon-list" | "trust-badges" | "detailed-benefit"; // Define 3 variations
  styles?: StyleConfig;
}

export default function BenefitsTrust({ sectionTitle, sectionDescription, items, variant = "icon-list", className, styles, ...props }: BenefitsTrustProps) {
  const { style: inlineStyle, className: computedClassName, id } = getStyles(styles, className);
  const firstItem = items?.[0];
  return (
    <section className={cn("w-full py-12 md:py-24 lg:py-32", computedClassName)} style={inlineStyle} id={id} {...props}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            {sectionTitle && <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{sectionTitle}</h2>}
            {sectionDescription && <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">{sectionDescription}</p>}
          </div>
        </div>

        {variant === "icon-list" && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <Card key={index} className="flex flex-col items-center text-center p-6">
                <CardHeader className="p-0 mb-4">
                  {(() => {
                    const IconComponent = item.iconName ? iconMap[item.iconName] : null;
                    return IconComponent ? <IconComponent className="h-12 w-12 text-primary" /> : null;
                  })()}
                </CardHeader>
                <CardContent className="flex flex-col gap-2 p-0">
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {variant === "trust-badges" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center justify-center">
            {items.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4">
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                )}
                <p className="text-sm text-muted-foreground mt-2">{item.title}</p>
              </div>
            ))}
          </div>
        )}

        {variant === "detailed-benefit" && firstItem && (
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">{firstItem.title}</h3>
              <p className="text-lg text-muted-foreground">{firstItem.description}</p>
            </div>
            {firstItem.imageUrl && (
              <Image
                src={firstItem.imageUrl}
                alt={firstItem.title}
                width={600}
                height={400}
                className="rounded-lg object-cover w-full aspect-video"
              />
            )}
            {(() => {
              const IconComponent = firstItem.iconName ? iconMap[firstItem.iconName] : null;
              return IconComponent ? (
                <div className="flex items-center justify-center">
                  <IconComponent className="h-24 w-24 text-primary" />
                </div>
              ) : null;
            })()}
          </div>
        )}
      </div>
    </section>
  );
}
