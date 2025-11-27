// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // 1. Create Landing Page if it doesn't exist
    const landingPage = await strapi.entityService.findMany('api::landing-page.landing-page');
    if (!landingPage) {
      await strapi.entityService.create('api::landing-page.landing-page', {
        data: {
          blocks: [
            // Header
            {
              __component: 'blocks.header',
              variant: 'default',
              links: [
                { text: 'Home', href: '/', variant: 'default' },
                { text: 'Features', href: '#features', variant: 'default' },
                { text: 'Pricing', href: '#pricing', variant: 'default' },
                { text: 'Contact', href: '#contact', variant: 'default' },
              ]
            },
            // Sticky Top Bar
            {
              __component: 'blocks.sticky-top-bar',
              message: '🎉 Special Offer: Get 20% off your first month!',
              variant: 'announcement',
              cta: {
                text: 'Claim Offer',
                href: '#pricing',
                variant: 'default'
              }
            },
            // Hero Section
            {
              __component: 'blocks.hero',
              title: 'Build Amazing Products with Our Platform',
              description: 'The complete solution for modern web development. Fast, scalable, and easy to use.',
              variant: 'default',
              imagePosition: 'right',
              ctaPrimary: {
                text: 'Get Started Free',
                href: '/signup',
                variant: 'default'
              },
              ctaSecondary: {
                text: 'Learn More',
                href: '#features',
                variant: 'outline'
              }
            },
            // Benefits & Trust
            {
              __component: 'blocks.benefits-trust',
              sectionTitle: 'Trusted by Industry Leaders',
              variant: 'grid',
              benefits: [
                { title: 'Secure', description: 'Enterprise-grade security', icon: 'shield' },
                { title: 'Fast', description: 'Lightning fast performance', icon: 'zap' },
                { title: 'Reliable', description: '99.99% uptime guarantee', icon: 'check' }
              ]
            },
            // Features Section (Updated to use Featured block or Features block if kept simple)
            // Using 'blocks.features' as defined in schema, but let's use the new 'featured' block for more complex items
            {
              __component: 'blocks.featured',
              sectionTitle: 'Powerful Features',
              variant: 'grid',
              items: [
                { title: 'Analytics', description: 'Real-time insights into your data', icon: 'bar-chart' },
                { title: 'Automation', description: 'Automate your workflows', icon: 'cpu' },
                { title: 'Integration', description: 'Connect with your favorite tools', icon: 'layers' }
              ]
            },
            // Content Section
            {
              __component: 'blocks.content',
              variant: 'default',
              content: '## Built for Developers\n\nOur platform provides all the tools you need to build modern web applications. From content management to deployment, we\'ve got you covered.\n\n- **Fast Development**: Get started in minutes\n- **Scalable Architecture**: Grows with your needs\n- **Developer Friendly**: Intuitive APIs and documentation',
            },
            // Categories
            {
              __component: 'blocks.categories',
              sectionTitle: 'Browse Categories',
              variant: 'grid',
              categories: [
                { name: 'Electronics', description: 'Gadgets and devices', href: '/category/electronics' },
                { name: 'Clothing', description: 'Fashion and apparel', href: '/category/clothing' },
                { name: 'Home & Garden', description: 'Decor and tools', href: '/category/home' }
              ]
            },
            // Product List
            {
              __component: 'blocks.product-list',
              sectionTitle: 'Trending Products',
              variant: 'grid',
              products: [
                { name: 'Pro Widget', price: '$99.00', category: 'Electronics', href: '/products/pro-widget' },
                { name: 'Basic Widget', price: '$49.00', category: 'Electronics', href: '/products/basic-widget' },
                { name: 'Super Widget', price: '$199.00', category: 'Electronics', href: '/products/super-widget' }
              ]
            },
            // Bundles
            {
              __component: 'blocks.bundles',
              sectionTitle: 'Value Bundles',
              variant: 'grid',
              bundles: [
                { name: 'Starter Kit', description: 'Everything you need to begin', price: '$149.00', items: ['Basic Widget', 'Guidebook'], href: '/bundles/starter' },
                { name: 'Pro Pack', description: 'For serious professionals', price: '$299.00', items: ['Pro Widget', 'Premium Support'], href: '/bundles/pro' }
              ]
            },
            // Testimonials Section
            {
              __component: 'blocks.testimonial',
              sectionTitle: 'What Our Customers Say',
              variant: 'grid',
              testimonials: [
                { content: "This platform changed how we build software.", authorName: "Jane Doe", authorRole: "CTO", rating: 5 },
                { content: "Incredible support and features.", authorName: "John Smith", authorRole: "Developer", rating: 5 }
              ]
            },
            // Pricing Section
            {
              __component: 'blocks.pricing',
              title: 'Simple, Transparent Pricing',
            },
            // FAQ
            {
              __component: 'blocks.faq',
              sectionTitle: 'Frequently Asked Questions',
              variant: 'accordion',
              faqItems: [
                { question: 'Is there a free trial?', answer: 'Yes, we offer a 14-day free trial.', category: 'Billing' },
                { question: 'Can I cancel anytime?', answer: 'Absolutely, you can cancel your subscription at any time.', category: 'Billing' },
                { question: 'Do you offer support?', answer: 'Yes, 24/7 support is included in all plans.', category: 'Support' }
              ]
            },
            // Banner Section
            {
              __component: 'blocks.banner',
              title: 'Ready to Get Started?',
              description: 'Join thousands of developers building amazing products',
              variant: 'default',
              cta: {
                text: 'Start Your Free Trial',
                href: '/signup',
                variant: 'secondary'
              }
            },
            // Blog Section
            {
              __component: 'blocks.blog',
              sectionTitle: 'Latest Updates',
              description: 'Read our latest news and articles',
              variant: 'grid'
            },
            // Map Section
            {
              __component: 'blocks.map',
              sectionTitle: 'Visit Us',
              variant: 'single-marker',
              zoom: 14,
              locations: [
                { name: 'HQ', address: '123 Tech Blvd, San Francisco, CA', latitude: 37.7749, longitude: -122.4194 }
              ]
            },
            // Subscribe Newsletter
            {
              __component: 'blocks.subscribe-newsletter',
              title: 'Stay Updated',
              description: 'Subscribe to our newsletter for the latest news and offers.',
              placeholder: 'Enter your email address',
              variant: 'default'
            },
            // Contact Section
            {
              __component: 'blocks.contact',
              sectionTitle: 'Get in Touch',
              sectionDescription: 'Have questions? We\'d love to hear from you.',
              variant: 'form-with-info',
              contactInfo: {
                email: 'hello@example.com',
                phone: '+1 (555) 123-4567',
                address: '123 Main Street, San Francisco, CA 94102'
              }
            },
            // Instagram Feed
            {
              __component: 'blocks.instagram',
              title: 'Follow Us on Instagram',
              variant: 'grid'
            }
          ],
          seo: {
            metaTitle: 'Build Amazing Products | Your Platform Name',
            metaDescription: 'The complete solution for modern web development. Fast, scalable, and easy to use.',
          },
          publishedAt: new Date(), // Publish immediately
        },
      });
      console.log('Created comprehensive Landing Page with all block types');
    }

    // 1.5. Create Categories and Blog Posts
    const existingCategories = await strapi.entityService.findMany('api::category.category');
    if (!existingCategories || existingCategories.length === 0) {
      // Create categories
      const techCategory = await strapi.entityService.create('api::category.category', {
        data: {
          name: 'Technology',
          slug: 'technology',
          publishedAt: new Date(),
        },
      });

      const designCategory = await strapi.entityService.create('api::category.category', {
        data: {
          name: 'Design',
          slug: 'design',
          publishedAt: new Date(),
        },
      });

      console.log('Created default categories');

      // Create sample blog posts
      await strapi.entityService.create('api::blog-post.blog-post', {
        data: {
          title: 'Getting Started with Next.js and Strapi',
          slug: 'getting-started-nextjs-strapi',
          content: 'Learn how to build a modern web application using Next.js and Strapi CMS. This guide covers setup, configuration, and best practices.',
          category: techCategory.id,
          publishedAt: new Date(),
        },
      });

      await strapi.entityService.create('api::blog-post.blog-post', {
        data: {
          title: 'Modern Web Design Principles',
          slug: 'modern-web-design-principles',
          content: 'Explore the latest trends in web design including responsive layouts, accessibility, and user experience best practices.',
          category: designCategory.id,
          publishedAt: new Date(),
        },
      });

      await strapi.entityService.create('api::blog-post.blog-post', {
        data: {
          title: 'Building Scalable APIs with Strapi',
          slug: 'building-scalable-apis-strapi',
          content: 'A comprehensive guide to creating robust and scalable APIs using Strapi. Learn about content types, relations, and performance optimization.',
          category: techCategory.id,
          publishedAt: new Date(),
        },
      });

      console.log('Created sample blog posts');
    }

    // 2. Set Public Permissions
    const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
    });

    if (publicRole) {
      const permissions = [
        'api::landing-page.landing-page.find',
        'api::blog-post.blog-post.find',
        'api::blog-post.blog-post.findOne',
        'api::category.category.find',
        'api::category.category.findOne',
      ];

      // Fetch existing permissions to avoid duplicates (though createMany might handle it, let's be safe)
      // Actually, easier to just iterate and create if not exists, or use the permission service if available.
      // But direct DB manipulation is often easiest for bootstrap.

      // Let's use the permission service to add them properly
      const permissionService = strapi.plugin('users-permissions').service('permission');

      // We need to construct the permission objects
      // This is a bit complex to do robustly without knowing the exact structure Strapi expects in this version.
      // A simpler way is to just let the user do it, BUT the user is asking for help.
      // Let's try a simpler approach: direct query.

      for (const action of permissions) {
        const existing = await strapi.query('plugin::users-permissions.permission').findOne({
          where: {
            action,
            role: publicRole.id,
          },
        });

        if (!existing) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action,
              role: publicRole.id,
            },
          });
          console.log(`Added public permission: ${action}`);
        }
      }
    }
  },
};
