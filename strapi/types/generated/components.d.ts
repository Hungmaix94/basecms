import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksBanner extends Struct.ComponentSchema {
  collectionName: 'components_blocks_banners';
  info: {
    description: 'Banner section';
    displayName: 'Banner';
    icon: 'picture';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.link', false>;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    styles: Schema.Attribute.Component<'elements.style-config', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<
      ['default', 'compact', 'full-width']
    > &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface BlocksBenefitsTrust extends Struct.ComponentSchema {
  collectionName: 'components_blocks_benefits_trusts';
  info: {
    description: 'Benefits and trust section';
    displayName: 'Benefits & Trust';
    icon: 'shield';
  };
  attributes: {
    benefits: Schema.Attribute.Component<'elements.benefit-item', true>;
    sectionTitle: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<['grid', 'list', 'icons-only']> &
      Schema.Attribute.DefaultTo<'grid'>;
  };
}

export interface BlocksBlog extends Struct.ComponentSchema {
  collectionName: 'components_blocks_blogs';
  info: {
    description: 'Blog section';
    displayName: 'Blog';
    icon: 'pencil';
  };
  attributes: {
    description: Schema.Attribute.Text;
    sectionTitle: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<['default', 'grid', 'featured']> &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface BlocksBundles extends Struct.ComponentSchema {
  collectionName: 'components_blocks_bundles';
  info: {
    description: 'Bundles section';
    displayName: 'Bundles';
    icon: 'gift';
  };
  attributes: {
    bundles: Schema.Attribute.Component<'elements.bundle-item', true>;
    sectionTitle: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<['list', 'grid', 'featured']> &
      Schema.Attribute.DefaultTo<'grid'>;
  };
}

export interface BlocksCart extends Struct.ComponentSchema {
  collectionName: 'components_blocks_carts';
  info: {
    description: 'Cart section';
    displayName: 'Cart';
    icon: 'shopping-cart';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Your Cart'>;
    variant: Schema.Attribute.Enumeration<['default', 'modal', 'drawer']> &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface BlocksCategories extends Struct.ComponentSchema {
  collectionName: 'components_blocks_categories';
  info: {
    description: 'Categories section';
    displayName: 'Categories';
    icon: 'folder';
  };
  attributes: {
    categories: Schema.Attribute.Component<'elements.category-item', true>;
    sectionTitle: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<['grid', 'carousel', 'list']> &
      Schema.Attribute.DefaultTo<'grid'>;
  };
}

export interface BlocksContact extends Struct.ComponentSchema {
  collectionName: 'components_blocks_contacts';
  info: {
    description: 'Contact section';
    displayName: 'Contact';
    icon: 'phone';
  };
  attributes: {
    contactInfo: Schema.Attribute.Component<'elements.contact-info', false>;
    sectionDescription: Schema.Attribute.Text;
    sectionTitle: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<
      ['basic-form', 'form-with-info', 'form-with-map']
    > &
      Schema.Attribute.DefaultTo<'basic-form'>;
  };
}

export interface BlocksContent extends Struct.ComponentSchema {
  collectionName: 'components_blocks_contents';
  info: {
    description: 'Content section';
    displayName: 'Content';
    icon: 'file-text';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    styles: Schema.Attribute.Component<'elements.style-config', false>;
    variant: Schema.Attribute.Enumeration<['default', 'centered', 'wide']> &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface BlocksCta extends Struct.ComponentSchema {
  collectionName: 'components_blocks_ctas';
  info: {
    description: 'Call to action banner';
    displayName: 'CTA';
    icon: 'cursor';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface BlocksFaq extends Struct.ComponentSchema {
  collectionName: 'components_blocks_faqs';
  info: {
    description: 'FAQ section';
    displayName: 'FAQ';
    icon: 'question';
  };
  attributes: {
    faqItems: Schema.Attribute.Component<'elements.faq-item', true>;
    sectionDescription: Schema.Attribute.Text;
    sectionTitle: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<
      ['list', 'accordion', 'categorized']
    > &
      Schema.Attribute.DefaultTo<'accordion'>;
  };
}

export interface BlocksFeatured extends Struct.ComponentSchema {
  collectionName: 'components_blocks_featureds';
  info: {
    description: 'Featured section';
    displayName: 'Featured';
    icon: 'star';
  };
  attributes: {
    items: Schema.Attribute.Component<'elements.feature-item', true>;
    sectionTitle: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<['grid', 'list', 'carousel']> &
      Schema.Attribute.DefaultTo<'grid'>;
  };
}

export interface BlocksFeatures extends Struct.ComponentSchema {
  collectionName: 'components_blocks_features';
  info: {
    description: 'List of features';
    displayName: 'Features';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.Text;
    styles: Schema.Attribute.Component<'elements.style-config', false>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksHeader extends Struct.ComponentSchema {
  collectionName: 'components_blocks_headers';
  info: {
    description: 'Header section';
    displayName: 'Header';
    icon: 'layout';
  };
  attributes: {
    links: Schema.Attribute.Component<'elements.link', true>;
    logo: Schema.Attribute.Component<'elements.logo', false>;
    variant: Schema.Attribute.Enumeration<['default', 'centered', 'minimal']> &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface BlocksHero extends Struct.ComponentSchema {
  collectionName: 'components_blocks_heroes';
  info: {
    description: 'Hero section';
    displayName: 'Hero';
    icon: 'crown';
  };
  attributes: {
    ctaPrimary: Schema.Attribute.Component<'elements.link', false>;
    ctaSecondary: Schema.Attribute.Component<'elements.link', false>;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    imagePosition: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.DefaultTo<'right'>;
    styles: Schema.Attribute.Component<'elements.style-config', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<
      ['default', 'centered-image', 'hero-banner']
    > &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface BlocksInstagram extends Struct.ComponentSchema {
  collectionName: 'components_blocks_instagrams';
  info: {
    description: 'Instagram feed';
    displayName: 'Instagram';
    icon: 'camera';
  };
  attributes: {
    accessToken: Schema.Attribute.String & Schema.Attribute.Private;
    title: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<['grid', 'carousel', 'masonry']> &
      Schema.Attribute.DefaultTo<'grid'>;
  };
}

export interface BlocksList extends Struct.ComponentSchema {
  collectionName: 'components_blocks_lists';
  info: {
    description: '';
    displayName: 'List';
    icon: 'list';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.list-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksMap extends Struct.ComponentSchema {
  collectionName: 'components_blocks_maps';
  info: {
    description: 'Map section';
    displayName: 'Map';
    icon: 'map';
  };
  attributes: {
    locations: Schema.Attribute.Component<'elements.location', true>;
    sectionDescription: Schema.Attribute.Text;
    sectionTitle: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<
      ['single-marker', 'multiple-markers', 'route-area']
    > &
      Schema.Attribute.DefaultTo<'single-marker'>;
    zoom: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<14>;
  };
}

export interface BlocksPricing extends Struct.ComponentSchema {
  collectionName: 'components_blocks_pricings';
  info: {
    description: 'Pricing tiers';
    displayName: 'Pricing';
    icon: 'priceTag';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface BlocksProductDetail extends Struct.ComponentSchema {
  collectionName: 'components_blocks_product_details';
  info: {
    description: 'Product detail section';
    displayName: 'Product Detail';
    icon: 'shopping-bag';
  };
  attributes: {
    product: Schema.Attribute.Component<'elements.product-item', false>;
    variant: Schema.Attribute.Enumeration<['default', 'extended', 'minimal']> &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface BlocksProductList extends Struct.ComponentSchema {
  collectionName: 'components_blocks_product_lists';
  info: {
    description: 'Product list section';
    displayName: 'Product List';
    icon: 'list';
  };
  attributes: {
    products: Schema.Attribute.Component<'elements.product-item', true>;
    sectionTitle: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<['grid', 'list', 'carousel']> &
      Schema.Attribute.DefaultTo<'grid'>;
  };
}

export interface BlocksSideCart extends Struct.ComponentSchema {
  collectionName: 'components_blocks_side_carts';
  info: {
    description: 'Side cart component';
    displayName: 'Side Cart';
    icon: 'shopping-cart';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Your Cart'>;
    variant: Schema.Attribute.Enumeration<['default', 'overlay']> &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface BlocksStickyTopBar extends Struct.ComponentSchema {
  collectionName: 'components_blocks_sticky_top_bars';
  info: {
    description: 'Sticky top bar';
    displayName: 'Sticky Top Bar';
    icon: 'arrow-up';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.link', false>;
    message: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<
      ['default', 'announcement', 'countdown']
    > &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface BlocksSubscribeNewsletter extends Struct.ComponentSchema {
  collectionName: 'components_blocks_subscribe_newsletters';
  info: {
    description: 'Newsletter subscription';
    displayName: 'Subscribe Newsletter';
    icon: 'mail';
  };
  attributes: {
    description: Schema.Attribute.Text;
    placeholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Enter your email'>;
    title: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<['default', 'minimal', 'centered']> &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface BlocksTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_blocks_testimonials';
  info: {
    description: 'Testimonial section';
    displayName: 'Testimonial';
    icon: 'quote';
  };
  attributes: {
    sectionTitle: Schema.Attribute.String;
    styles: Schema.Attribute.Component<'elements.style-config', false>;
    testimonials: Schema.Attribute.Component<'elements.testimonial-item', true>;
    variant: Schema.Attribute.Enumeration<['grid', 'carousel', 'single']> &
      Schema.Attribute.DefaultTo<'grid'>;
  };
}

export interface ElementsBenefitItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_benefit_items';
  info: {
    description: 'A benefit item';
    displayName: 'Benefit Item';
    icon: 'check';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ElementsBundleItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_bundle_items';
  info: {
    description: 'A bundle item';
    displayName: 'Bundle Item';
    icon: 'gift';
  };
  attributes: {
    description: Schema.Attribute.Text;
    href: Schema.Attribute.String;
    imageUrl: Schema.Attribute.Media<'images'>;
    items: Schema.Attribute.JSON;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.String;
  };
}

export interface ElementsCategoryItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_category_items';
  info: {
    description: 'A category item';
    displayName: 'Category Item';
    icon: 'folder';
  };
  attributes: {
    description: Schema.Attribute.Text;
    href: Schema.Attribute.String;
    imageUrl: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_elements_contact_infos';
  info: {
    description: 'Contact information';
    displayName: 'Contact Info';
    icon: 'phone';
  };
  attributes: {
    address: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    phone: Schema.Attribute.String;
  };
}

export interface ElementsFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_faq_items';
  info: {
    description: 'A FAQ item';
    displayName: 'FAQ Item';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    category: Schema.Attribute.String;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_feature_items';
  info: {
    description: 'A feature item';
    displayName: 'Feature Item';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    description: 'A link component';
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<
      ['default', 'outline', 'secondary', 'link', 'ghost']
    > &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface ElementsLocation extends Struct.ComponentSchema {
  collectionName: 'components_elements_locations';
  info: {
    description: 'A map location';
    displayName: 'Location';
    icon: 'pin';
  };
  attributes: {
    address: Schema.Attribute.String;
    latitude: Schema.Attribute.Float & Schema.Attribute.Required;
    longitude: Schema.Attribute.Float & Schema.Attribute.Required;
    name: Schema.Attribute.String;
  };
}

export interface ElementsLogo extends Struct.ComponentSchema {
  collectionName: 'components_elements_logos';
  info: {
    description: 'Logo component with variant and size options';
    displayName: 'Logo';
    icon: 'picture';
  };
  attributes: {
    height: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 1000;
          min: 0;
        },
        number
      >;
    media: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<['square', 'circle']> &
      Schema.Attribute.DefaultTo<'square'>;
    width: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 1000;
          min: 0;
        },
        number
      >;
  };
}

export interface ElementsProductItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_product_items';
  info: {
    description: 'A product item';
    displayName: 'Product Item';
    icon: 'shopping-bag';
  };
  attributes: {
    category: Schema.Attribute.String;
    href: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.String;
  };
}

export interface ElementsStyleConfig extends Struct.ComponentSchema {
  collectionName: 'components_elements_style_configs';
  info: {
    description: 'Configuration for component styles';
    displayName: 'Style Config';
    icon: 'paint-brush';
  };
  attributes: {
    className: Schema.Attribute.String;
    elementId: Schema.Attribute.String;
    inlineStyles: Schema.Attribute.JSON;
  };
}

export interface ElementsTestimonialItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_testimonial_items';
  info: {
    description: 'A testimonial item';
    displayName: 'Testimonial Item';
    icon: 'quote';
  };
  attributes: {
    authorAvatar: Schema.Attribute.Media<'images'>;
    authorName: Schema.Attribute.String;
    authorRole: Schema.Attribute.String;
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    rating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      >;
  };
}

export interface SharedListItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_list_items';
  info: {
    displayName: 'List Item';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.banner': BlocksBanner;
      'blocks.benefits-trust': BlocksBenefitsTrust;
      'blocks.blog': BlocksBlog;
      'blocks.bundles': BlocksBundles;
      'blocks.cart': BlocksCart;
      'blocks.categories': BlocksCategories;
      'blocks.contact': BlocksContact;
      'blocks.content': BlocksContent;
      'blocks.cta': BlocksCta;
      'blocks.faq': BlocksFaq;
      'blocks.featured': BlocksFeatured;
      'blocks.features': BlocksFeatures;
      'blocks.header': BlocksHeader;
      'blocks.hero': BlocksHero;
      'blocks.instagram': BlocksInstagram;
      'blocks.list': BlocksList;
      'blocks.map': BlocksMap;
      'blocks.pricing': BlocksPricing;
      'blocks.product-detail': BlocksProductDetail;
      'blocks.product-list': BlocksProductList;
      'blocks.side-cart': BlocksSideCart;
      'blocks.sticky-top-bar': BlocksStickyTopBar;
      'blocks.subscribe-newsletter': BlocksSubscribeNewsletter;
      'blocks.testimonial': BlocksTestimonial;
      'elements.benefit-item': ElementsBenefitItem;
      'elements.bundle-item': ElementsBundleItem;
      'elements.category-item': ElementsCategoryItem;
      'elements.contact-info': ElementsContactInfo;
      'elements.faq-item': ElementsFaqItem;
      'elements.feature-item': ElementsFeatureItem;
      'elements.link': ElementsLink;
      'elements.location': ElementsLocation;
      'elements.logo': ElementsLogo;
      'elements.product-item': ElementsProductItem;
      'elements.style-config': ElementsStyleConfig;
      'elements.testimonial-item': ElementsTestimonialItem;
      'shared.list-item': SharedListItem;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
