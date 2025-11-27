'use client'

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MapLocation {
  name?: string;
  address?: string;
  latitude: number;
  longitude: number;
}

interface MapProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionTitle?: string;
  sectionDescription?: string;
  locations: MapLocation[]; // Can be one or multiple
  variant?: "single-marker" | "multiple-markers" | "route-area";
  zoom?: number;
  routeCoordinates?: { latitude: number; longitude: number }[]; // For route-area variant
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function MapComponent({
  sectionTitle,
  sectionDescription,
  locations,
  variant = "single-marker",
  zoom = 14,
  routeCoordinates,
  className,
  ...props
}: MapProps) {
  const getMapEmbedUrl = () => {
    let url = "https://www.google.com/maps/embed/v1/";
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY"; // Placeholder for API Key

    if (variant === "single-marker" && locations.length > 0) {
      const { latitude, longitude } = locations[0];
      url += `place?key=${apiKey}&q=${latitude},${longitude}&zoom=${zoom}`;
    } else if (variant === "multiple-markers" && locations.length > 0) {
      const markers = locations.map(loc => `${loc.latitude},${loc.longitude}`).join('|');
      url += `place?key=${apiKey}&q=${locations[0].latitude},${locations[0].longitude}&markers=${markers}&zoom=${zoom}`;
    } else if (variant === "route-area" && routeCoordinates && routeCoordinates.length > 1) {
      const origin = `${routeCoordinates[0].latitude},${routeCoordinates[0].longitude}`;
      const destination = `${routeCoordinates[routeCoordinates.length - 1].latitude},${routeCoordinates[routeCoordinates.length - 1].longitude}`;
      const waypoints = routeCoordinates.slice(1, -1).map(loc => `${loc.latitude},${loc.longitude}`).join('|');
      url += `directions?key=${apiKey}&origin=${origin}&destination=${destination}&waypoints=${waypoints}`;
    } else {
      // Fallback for no valid variant or data
      url += `place?key=${apiKey}&q=London,UK&zoom=10`;
    }
    return url;
  };

  return (
    // @ts-ignore
    <motion.section
      className={cn("w-full py-12 md:py-24 lg:py-32", className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      {...props}
    >
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-8"
          variants={itemVariants}
        >
          <div className="space-y-2">
            {sectionTitle && <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{sectionTitle}</h2>}
            {sectionDescription && <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">{sectionDescription}</p>}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            {locations.length > 0 && locations[0].name && (
              <CardHeader>
                <CardTitle>{locations[0].name}</CardTitle>
                {locations[0].address && <p className="text-sm text-muted-foreground">{locations[0].address}</p>}
              </CardHeader>
            )}
            <CardContent className="p-0">
              <iframe
                width="100%"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={getMapEmbedUrl()}
                title="Map Location"
              ></iframe>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}
