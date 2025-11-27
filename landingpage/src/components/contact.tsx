'use client'

import {motion} from "framer-motion"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {cn} from "@/lib/utils"

interface ContactInfo {
    address?: string;
    phone?: string;
    email?: string;
}

interface ContactProps extends React.HTMLAttributes<HTMLDivElement> {
    sectionTitle: string;
    sectionDescription?: string;
    contactInfo?: ContactInfo;
    variant?: "basic-form" | "form-with-info" | "form-with-map";
}

const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0},
};

export default function Contact({
                                    sectionTitle,
                                    sectionDescription,
                                    contactInfo,
                                    variant = "basic-form",
                                    className,
                                    ...props
                                }: ContactProps) {
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
                                <div className="flex items-center justify-center gap-2">
                                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{sectionTitle}</h2>
                                  <ReloadIcon className="h-6 w-6 text-muted-foreground" />
                                </div>
                                {sectionDescription && <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">{sectionDescription}</p>}
                              </div>
                </motion.div>

                <motion.div
                    className={cn(
                        "grid gap-8",
                        variant === "form-with-info" && "md:grid-cols-2",
                        variant === "form-with-map" && "md:grid-cols-3"
                    )}
                    variants={containerVariants}
                >
                    {(variant === "form-with-info" || variant === "form-with-map") && contactInfo && (
                        <motion.div variants={itemVariants}>
                            <Card className="flex flex-col p-6 h-full">
                                <CardHeader>
                                    <CardTitle>Contact Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {contactInfo.address && (
                                        <div className="flex items-start gap-2">
                                            <MapPinIcon className="h-5 w-5 text-muted-foreground"/>
                                            <p>{contactInfo.address}</p>
                                        </div>
                                    )}
                                    {contactInfo.phone && (
                                        <div className="flex items-center gap-2">
                                            <PhoneIcon className="h-5 w-5 text-muted-foreground"/>
                                            <p>{contactInfo.phone}</p>
                                        </div>
                                    )}
                                    {contactInfo.email && (
                                        <div className="flex items-center gap-2">
                                            <MailIcon className="h-5 w-5 text-muted-foreground"/>
                                            <p>{contactInfo.email}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    <motion.div variants={itemVariants}
                                className={cn((variant === "basic-form" || variant === "form-with-info") ? "md:col-span-1 lg:col-span-1" : "md:col-span-2 lg:col-span-2")}>
                        <Card className="p-6 h-full">
                            <CardHeader>
                                <CardTitle>Send Us a Message</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                                <div className="grid gap-2">
                                                  <Label htmlFor="name">Name</Label>
                                                  <Input id="name" placeholder="Enter your name" />
                                                </div>
                                                <div className="grid gap-2">
                                                  <Label htmlFor="email">Email</Label>
                                                  <Input id="email" type="email" placeholder="Enter your email address" />
                                                </div>
                                                <div className="grid gap-2">
                                                  <Label htmlFor="subject">Subject</Label>
                                                  <Input id="subject" placeholder="Enter the subject of your message" />
                                                </div>
                                                <div className="grid gap-2">
                                                  <Label htmlFor="message">Message</Label>
                                                  <Textarea id="message" placeholder="Type your message here" rows={5} />
                                </div>
                                <Button type="submit" className="w-full">
                                    Send Message
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {variant === "form-with-map" && (
                        <motion.div variants={itemVariants} className={'col-span-full'}>
                            <Card className="flex flex-col p-6 md:col-span-1 lg:col-span-1 h-full">
                                <CardHeader>
                                    <CardTitle>Our Location</CardTitle>
                                </CardHeader>
                                <CardContent className="h-64 w-full">
                                    {/* Placeholder for map iframe or image */}
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.2084042858567!2d144.9630579153185!3d-37.81627997975149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5771d9d714b1a40!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1678888888888!5m2!1sen!2sau"
                                        width="100%"
                                        height="100%"
                                        style={{border: 0}}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </motion.section>
    );
}

// Basic icons for illustrative purposes
function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
        </svg>
    )
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
    )
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {

  return (

    <svg

      {...props}

      xmlns="http://www.w3.org/2000/svg"

      width="24"

      height="24"

      viewBox="0 0 24 24"

      fill="none"

      stroke="currentColor"

      strokeWidth="2"

      strokeLinecap="round"

      strokeLinejoin="round"

    >

      <rect width="20" height="16" x="2" y="4" rx="2" />

      <path d="m22 7-8.97 5.79a1.94 1.94 0 0 1-2.06 0L2 7" />

    </svg>

  )

}



function ReloadIcon(props: React.SVGProps<SVGSVGElement>) {

  return (

    <svg

      {...props}

      xmlns="http://www.w3.org/2000/svg"

      width="24"

      height="24"

      viewBox="0 0 24 24"

      fill="none"

      stroke="currentColor"

      strokeWidth="2"

      strokeLinecap="round"

      strokeLinejoin="round"

    >

      <path d="M21.5 2v6h-6"/><path d="M2.5 22v-6h6"/><path d="M2 11.5a10 10 0 0 1 18.2-5.6L21.5 8"/><path d="M22 12.5a10 10 0 0 1-18.2 5.6L2.5 16"/>

    </svg>

  )

}
