# Page Builder - Hướng dẫn Chi tiết

## Tổng quan

Page Builder là một plugin Strapi cho phép tạo và chỉnh sửa trang web một cách trực quan thông qua giao diện kéo-thả (drag-and-drop). Hệ thống bao gồm hai phần chính:

1. **Strapi Plugin** (`/packages/strapi-page-builder`): Giao diện quản lý trong Strapi Admin
2. **React Editor** (`/packages/strapi-page-builder-react`): Component editor được nhúng trong iframe

## Kiến trúc

```
┌─────────────────────────────────────────────────────────────┐
│                    Strapi Admin Panel                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │          Page Builder Plugin (HomePage.tsx)            │ │
│  │                                                          │ │
│  │  ┌────────────────────────────────────────────────┐   │ │
│  │  │              iframe                             │   │ │
│  │  │  ┌──────────────────────────────────────────┐  │   │ │
│  │  │  │   Next.js App (localhost:3000/editor)    │  │   │ │
│  │  │  │                                            │  │   │ │
│  │  │  │   Editor Component                         │  │   │ │
│  │  │  │   (@wecre8websites/strapi-page-builder-   │  │   │ │
│  │  │  │    react)                                  │  │   │ │
│  │  │  └──────────────────────────────────────────┘  │   │ │
│  │  └────────────────────────────────────────────────┘   │ │
│  │                                                          │ │
│  │  ◄──── postMessage ────►                               │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Message Flow

### 1. Initialization

```
Parent (Strapi)                    Child (Editor)
      │                                  │
      │──── Load iframe ────────────────►│
      │                                  │
      │                                  │ Setup message listener
      │                                  │
      │◄──── CHILD_READY ───────────────│
      │                                  │
      │──── POPULATE ───────────────────►│
      │    (templateJson, contentData)   │
      │                                  │
      │                                  │ Render editor
```

### 2. Editing

```
Parent (Strapi)                    Child (Editor)
      │                                  │
      │                                  │ User edits
      │                                  │
      │◄──── TEMPLATE_DIRTY ────────────│
      │    (dirty, undo, redo status)    │
      │                                  │
      │ Enable/disable save button       │
```

### 3. Saving

```
Parent (Strapi)                    Child (Editor)
      │                                  │
      │ User clicks Save                 │
      │                                  │
      │──── SAVE_REQUESTED ─────────────►│
      │                                  │
      │                                  │ Prepare data
      │                                  │
      │◄──── SAVE_TEMPLATE ─────────────│
      │    (templateJson)                │
      │                                  │
      │ Save to Strapi                   │
```

## Message Types

### Parent → Child

| Message Type | Data | Mô tả |
|--------------|------|-------|
| `populate` | `{templateJson, contentData, permissions, locale, enforceTemplateShape}` | Khởi tạo editor với data |
| `save_requested` | `{}` | Yêu cầu save template |
| `undo_requested` | `{}` | Undo thay đổi |
| `redo_requested` | `{}` | Redo thay đổi |
| `toggle_left_requested` | `{}` | Toggle left sidebar |
| `toggle_right_requested` | `{}` | Toggle right sidebar |
| `return_media` | `{target, src}` | Trả về media đã chọn |
| `return_content` | `{target, content}` | Trả về content đã chọn |

### Child → Parent

| Message Type | Data | Mô tả |
|--------------|------|-------|
| `child_ready` | `{}` | Editor đã sẵn sàng |
| `template_dirty` | `{dirty, undo, redo}` | Trạng thái thay đổi |
| `save_template` | `{templateJson}` | Gửi data để save |
| `request_media` | `{target, value, type}` | Yêu cầu chọn media |
| `request_content` | `{target, contentType, searchQuery}` | Yêu cầu chọn content |

## Sử dụng Page Builder

### 1. Truy cập Page Builder

URL format:
```
http://localhost:1337/admin/plugins/page-builder?_contentType=<content-type>&_templateId=<template-id>&_contentId=<content-id>&_locale=<locale>
```

Ví dụ:
```
http://localhost:1337/admin/plugins/page-builder?_contentType=api::landing-page.landing-page&_templateId=nrcu5571uyd1ed88w14ojkk4&_contentId=dnqj75v4knouxs17ztzxmgc6&_locale=en
```

### 2. Giao diện Editor

```
┌─────────────────────────────────────────────────────────────┐
│ [≡] [⚙]  Content Type ▼  Template ▼  Content ▼  Locale ▼  │
│                                          [↶] [↷]    [Save]  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────┐                                                    │
│  │      │  ┌─────────────────────────────────────────┐     │
│  │ Comp │  │                                           │     │
│  │ List │  │         Page Preview                      │     │
│  │      │  │                                           │     │
│  │      │  │                                           │     │
│  └──────┘  └─────────────────────────────────────────┘     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 3. Thêm Component

1. Click vào component trong sidebar trái
2. Kéo component vào vị trí mong muốn trong preview
3. Component sẽ được thêm vào template

### 4. Chỉnh sửa Component

1. Click vào component trong preview
2. Sidebar phải sẽ hiển thị properties
3. Chỉnh sửa properties (text, images, colors, etc.)
4. Thay đổi được áp dụng real-time

### 5. Sắp xếp Components

- **Drag**: Kéo component để di chuyển
- **Delete**: Click vào component và nhấn Delete/Backspace
- **Duplicate**: Click vào component và nhấn Ctrl/Cmd+D

### 6. Lưu Template

1. Nhấn nút **Save** ở góc phải trên
2. Template được lưu vào Strapi
3. Thông báo thành công hiển thị

### 7. Phím tắt (Keyboard Shortcuts)

Page Builder hỗ trợ các phím tắt sau để tăng tốc độ làm việc:

| Hành động | Windows/Linux | macOS | Điều kiện |
|-----------|---------------|-------|-----------|
| **Save** | `Ctrl + S` | `Cmd + S` | - |
| **Undo** | `Ctrl + Z` | `Cmd + Z` | - |
| **Redo** | `Ctrl + Shift + Z` hoặc `Ctrl + Y` | `Cmd + Shift + Z` hoặc `Cmd + Y` | - |
| **Delete Component** | `Delete` hoặc `Backspace` | `Delete` hoặc `Backspace` | Component đang được chọn |
| **Duplicate Component** | `Ctrl + D` | `Cmd + D` | Component đang được chọn |

## Cấu hình Components

### Định nghĩa Component

File: `/landingpage/src/lib/page-builder-config.tsx`

```typescript
export const config = {
  components: {
    HeroSection: {
      // Component fields
      fields: {
        title: {
          type: 'text',
          label: 'Title',
        },
        subtitle: {
          type: 'textarea',
          label: 'Subtitle',
        },
        image: {
          type: 'custom',
          label: 'Background Image',
          render: ({ value, onChange }) => (
            <StrapiMediaField
              value={value}
              onChange={onChange}
              type="image"
            />
          ),
        },
      },
      // Default props
      defaultProps: {
        title: 'Welcome',
        subtitle: 'Get started with our platform',
      },
      // Render function
      render: ({ title, subtitle, image }) => (
        <HeroSection
          title={title}
          subtitle={subtitle}
          backgroundImage={image}
        />
      ),
    },
  },
};
```

### Field Types

| Type | Mô tả | Example |
|------|-------|---------|
| `text` | Single line text | Title, name |
| `textarea` | Multi-line text | Description |
| `number` | Numeric input | Price, quantity |
| `select` | Dropdown select | Category, status |
| `radio` | Radio buttons | Size, color |
| `custom` | Custom component | Media picker, rich text |
| `array` | Array of items | List of features |
| `object` | Nested object | Address, settings |

### Custom Fields

```typescript
{
  type: 'custom',
  label: 'Select Image',
  render: ({ value, onChange }) => {
    const handleSelect = () => {
      // Request media from parent
      window.parent.postMessage({
        type: 'request_media',
        data: {
          target: 'heroImage',
          value: value,
          type: 'image',
        },
      }, '*');
    };
    
    return (
      <button onClick={handleSelect}>
        {value ? 'Change Image' : 'Select Image'}
      </button>
    );
  },
}
```

## Tạo Block Component Mới

Hướng dẫn từng bước để tạo một block component mới cho Page Builder.

### Ví dụ: Tạo Component "Pricing Table"

Chúng ta sẽ tạo một component hiển thị bảng giá với các tính năng:
- Tiêu đề và mô tả
- Danh sách các gói giá
- Nút CTA cho mỗi gói

### Bước 1: Tạo Strapi Component

#### 1.1. Tạo Component Schema

File: `/strapi/src/components/blocks/pricing-table.json`

```json
{
  "collectionName": "components_blocks_pricing_tables",
  "info": {
    "displayName": "Pricing Table",
    "description": "Pricing table with multiple plans",
    "icon": "dollar-sign"
  },
  "options": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "default": "Choose Your Plan"
    },
    "subtitle": {
      "type": "text",
      "default": "Select the perfect plan for your needs"
    },
    "plans": {
      "type": "component",
      "repeatable": true,
      "component": "elements.pricing-plan"
    },
    "styles": {
      "type": "component",
      "repeatable": false,
      "component": "elements.style-config"
    }
  }
}
```

#### 1.2. Tạo Nested Component (Pricing Plan)

File: `/strapi/src/components/elements/pricing-plan.json`

```json
{
  "collectionName": "components_elements_pricing_plans",
  "info": {
    "displayName": "Pricing Plan",
    "description": "Individual pricing plan",
    "icon": "tag"
  },
  "options": {},
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "default": "Basic"
    },
    "price": {
      "type": "decimal",
      "required": true,
      "default": 9.99
    },
    "currency": {
      "type": "string",
      "default": "USD"
    },
    "interval": {
      "type": "enumeration",
      "enum": ["month", "year"],
      "default": "month"
    },
    "features": {
      "type": "json",
      "default": []
    },
    "highlighted": {
      "type": "boolean",
      "default": false
    },
    "ctaText": {
      "type": "string",
      "default": "Get Started"
    },
    "ctaLink": {
      "type": "string",
      "default": "#"
    }
  }
}
```

#### 1.3. Rebuild Strapi

```bash
cd strapi
yarn build
yarn develop
```

### Bước 2: Tạo React Component

#### 2.1. Tạo Component File

File: `/landingpage/src/components/pricing-table.tsx`

```typescript
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PricingPlan {
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  highlighted: boolean;
  ctaText: string;
  ctaLink: string;
}

interface PricingTableProps {
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export default function PricingTable({
  title = 'Choose Your Plan',
  subtitle = 'Select the perfect plan for your needs',
  plans = [],
  className = '',
  style,
  id,
}: PricingTableProps) {
  return (
    <section
      id={id}
      className={`py-16 px-4 ${className}`}
      style={style}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-xl text-gray-600">{subtitle}</p>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`
                rounded-lg p-8 border-2 transition-all
                ${plan.highlighted
                  ? 'border-blue-500 shadow-xl scale-105'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              {/* Plan Name */}
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {plan.currency === 'USD' ? '$' : plan.currency}
                  {plan.price}
                </span>
                <span className="text-gray-600">/{plan.interval}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                asChild
                className="w-full"
                variant={plan.highlighted ? 'default' : 'outline'}
              >
                <a href={plan.ctaLink}>{plan.ctaText}</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Bước 3: Đăng ký Component với Page Builder

#### 3.1. Cập nhật Page Builder Config

File: `/landingpage/src/lib/page-builder-config.tsx`

```typescript
import PricingTable from '@/components/pricing-table';
import { StrapiMediaField } from '@/components/ui/strapi-image';

export const config = {
  components: {
    // ... existing components ...

    PricingTable: {
      label: 'Pricing Table',
      fields: {
        title: {
          type: 'text',
          label: 'Title',
        },
        subtitle: {
          type: 'textarea',
          label: 'Subtitle',
        },
        plans: {
          type: 'array',
          label: 'Pricing Plans',
          arrayFields: {
            name: {
              type: 'text',
              label: 'Plan Name',
            },
            price: {
              type: 'number',
              label: 'Price',
            },
            currency: {
              type: 'select',
              label: 'Currency',
              options: [
                { label: 'USD', value: 'USD' },
                { label: 'EUR', value: 'EUR' },
                { label: 'VND', value: 'VND' },
              ],
            },
            interval: {
              type: 'radio',
              label: 'Billing Interval',
              options: [
                { label: 'Monthly', value: 'month' },
                { label: 'Yearly', value: 'year' },
              ],
            },
            features: {
              type: 'array',
              label: 'Features',
              arrayFields: {
                feature: {
                  type: 'text',
                  label: 'Feature',
                },
              },
              getItemSummary: (item) => item.feature,
            },
            highlighted: {
              type: 'radio',
              label: 'Highlight this plan?',
              options: [
                { label: 'Yes', value: true },
                { label: 'No', value: false },
              ],
            },
            ctaText: {
              type: 'text',
              label: 'Button Text',
            },
            ctaLink: {
              type: 'text',
              label: 'Button Link',
            },
          },
          defaultItemProps: {
            name: 'New Plan',
            price: 0,
            currency: 'USD',
            interval: 'month',
            features: [],
            highlighted: false,
            ctaText: 'Get Started',
            ctaLink: '#',
          },
          getItemSummary: (item) => `${item.name} - $${item.price}/${item.interval}`,
        },
      },
      defaultProps: {
        title: 'Choose Your Plan',
        subtitle: 'Select the perfect plan for your needs',
        plans: [
          {
            name: 'Basic',
            price: 9.99,
            currency: 'USD',
            interval: 'month',
            features: ['Feature 1', 'Feature 2', 'Feature 3'],
            highlighted: false,
            ctaText: 'Get Started',
            ctaLink: '#',
          },
          {
            name: 'Pro',
            price: 19.99,
            currency: 'USD',
            interval: 'month',
            features: ['All Basic features', 'Feature 4', 'Feature 5', 'Feature 6'],
            highlighted: true,
            ctaText: 'Get Started',
            ctaLink: '#',
          },
          {
            name: 'Enterprise',
            price: 49.99,
            currency: 'USD',
            interval: 'month',
            features: ['All Pro features', 'Feature 7', 'Feature 8', 'Priority Support'],
            highlighted: false,
            ctaText: 'Contact Sales',
            ctaLink: '#',
          },
        ],
      },
      render: ({ title, subtitle, plans, ...props }) => (
        <PricingTable
          title={title}
          subtitle={subtitle}
          plans={plans}
          {...props}
        />
      ),
    },
  },
};
```

### Bước 4: Thêm Component vào BlockRenderer (Optional)

Nếu bạn muốn render component từ Strapi data:

File: `/landingpage/src/components/BlockRenderer.tsx`

```typescript
import PricingTable from './pricing-table';

export default function BlockRenderer({ block }: { block: any }) {
  switch (block.__component) {
    // ... existing cases ...
    
    case 'blocks.pricing-table':
      return (
        <PricingTable
          title={block.title}
          subtitle={block.subtitle}
          plans={block.plans}
          className={block.styles?.className}
          style={block.styles?.style}
          id={block.styles?.id}
        />
      );
    
    default:
      return null;
  }
}
```

### Bước 5: Test Component

#### 5.1. Rebuild Packages

```bash
# Rebuild strapi-page-builder-react nếu cần
cd packages/strapi-page-builder-react
pnpm build

# Restart Next.js
cd ../../landingpage
rm -rf .next
yarn dev
```

#### 5.2. Test trong Editor

1. Truy cập Page Builder: http://localhost:1337/admin/plugins/page-builder
2. Tìm "Pricing Table" trong component list
3. Kéo component vào page
4. Chỉnh sửa properties
5. Save và preview

### Bước 6: Styling và Customization

#### 6.1. Thêm Tailwind Classes

```typescript
// Trong component
<div className="bg-gradient-to-br from-blue-50 to-purple-50">
  {/* content */}
</div>
```

#### 6.2. Thêm Animations

```typescript
import { motion } from 'framer-motion';

export default function PricingTable({ plans, ...props }) {
  return (
    <section {...props}>
      {plans.map((plan, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {/* plan content */}
        </motion.div>
      ))}
    </section>
  );
}
```

#### 6.3. Responsive Design

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
  {/* cards */}
</div>
```

### Bước 7: TypeScript Types (Best Practice)

#### 7.1. Tạo Types File

File: `/landingpage/src/types/components.ts`

```typescript
export interface PricingPlan {
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  highlighted: boolean;
  ctaText: string;
  ctaLink: string;
}

export interface PricingTableProps {
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}
```

#### 7.2. Sử dụng Types

```typescript
import type { PricingTableProps } from '@/types/components';

export default function PricingTable(props: PricingTableProps) {
  // ...
}
```

### Checklist Tạo Component Mới

- [ ] Tạo Strapi component schema (`.json`)
- [ ] Tạo nested components nếu cần
- [ ] Rebuild Strapi
- [ ] Tạo React component (`.tsx`)
- [ ] Thêm TypeScript types
- [ ] Đăng ký trong `page-builder-config.tsx`
- [ ] Thêm vào `BlockRenderer.tsx` (nếu cần)
- [ ] Test trong Page Builder editor
- [ ] Thêm styling và animations
- [ ] Test responsive design
- [ ] Document component props
- [ ] Commit code

### Tips và Best Practices

1. **Naming Convention**:
   - Strapi: `blocks.pricing-table`
   - React: `PricingTable`
   - File: `pricing-table.tsx`

2. **Default Props**:
   - Luôn cung cấp default values
   - Giúp component hoạt động ngay khi thêm vào

3. **Validation**:
   - Validate props trong component
   - Hiển thị fallback UI nếu data invalid

4. **Performance**:
   - Sử dụng `React.memo` cho components phức tạp
   - Lazy load images
   - Optimize re-renders

5. **Accessibility**:
   - Thêm ARIA labels
   - Keyboard navigation
   - Semantic HTML

6. **Testing**:
   - Test component độc lập
   - Test trong Page Builder
   - Test responsive design
   - Test với real data từ Strapi

## Template System


### Template Structure

```json
{
  "content": [
    {
      "type": "HeroSection",
      "props": {
        "id": "hero-1",
        "title": "Welcome",
        "subtitle": "Get started"
      }
    },
    {
      "type": "Container",
      "props": {
        "id": "container-1"
      }
    }
  ],
  "root": {
    "props": {}
  },
  "zones": {
    "container-1": [
      {
        "type": "Text",
        "props": {
          "id": "text-1",
          "content": "Hello World"
        }
      }
    ]
  }
}
```

### Template Management

#### Tạo Template Mới

1. Chọn Content Type
2. Click **Template** dropdown → **Create new**
3. Nhập tên template
4. (Optional) Duplicate từ template có sẵn
5. Click **Create**

#### Chỉnh sửa Template

1. Chọn template từ dropdown
2. Thực hiện thay đổi
3. Click **Save**

#### Xóa Template

Hiện tại chưa hỗ trợ xóa template từ UI. Cần xóa trực tiếp từ database.

## Permissions

### Editor Permissions

```typescript
{
  read: boolean,    // Xem editor
  edit: boolean,    // Chỉnh sửa content
  modify: boolean,  // Thêm/xóa components
}
```

### Enforce Template Shape

Khi `enforceTemplateShape = true`:
- Chỉ cho phép edit content
- Không cho phép thêm/xóa/di chuyển components
- Dùng cho non-default locales

## Troubleshooting

### Editor không load

**Triệu chứng**: Loader hiển thị mãi không mất

**Nguyên nhân**:
1. `tokenUrl` empty (thiếu url, licenceToken, hoặc locale)
2. iframe không load được
3. CHILD_READY message không được gửi

**Giải pháp**:
1. Check console logs:
```javascript
[Page Builder] tokenUrl deps: {...}
[Page Builder] tokenUrl generated: ...
[Page Builder] iframe loaded successfully
[Editor] Sending CHILD_READY message to parent
[Page Builder] CHILD_READY received
```

2. Rebuild packages:
```bash
cd packages/strapi-page-builder-react
pnpm build

cd ../../landingpage
rm -rf .next
yarn dev
```

3. Hard refresh browser (Ctrl+Shift+R)

### Components không hiển thị

**Nguyên nhân**:
- Component chưa được register trong config
- Props không đúng type
- Component throw error

**Giải pháp**:
1. Check `page-builder-config.tsx`
2. Verify component props
3. Check browser console for errors

### Save không hoạt động

**Nguyên nhân**:
- Permissions không đủ
- Template ID invalid
- Network error

**Giải pháp**:
1. Check permissions: `canEdit` hoặc `canModify`
2. Verify template ID exists
3. Check network tab for API errors

### Locale issues

**Nguyên nhân**:
- `availableLocales` empty
- Locale không match với Strapi config

**Giải pháp**:
1. Check Strapi i18n plugin enabled
2. Verify locales configured in Strapi
3. Check API response includes locales

## Best Practices

### 1. Component Design

- **Single Responsibility**: Mỗi component làm một việc
- **Reusable**: Thiết kế để tái sử dụng
- **Configurable**: Expose props cần thiết
- **Default Values**: Luôn có default props

### 2. Performance

- **Lazy Loading**: Load components khi cần
- **Memoization**: Sử dụng React.memo cho components nặng
- **Debounce**: Debounce onChange handlers
- **Optimize Images**: Sử dụng Next.js Image component

### 3. User Experience

- **Clear Labels**: Field labels rõ ràng
- **Help Text**: Thêm description cho fields phức tạp
- **Validation**: Validate input ngay lập tức
- **Loading States**: Hiển thị loading khi cần

### 4. Maintenance

- **Type Safety**: Sử dụng TypeScript
- **Documentation**: Document component props
- **Testing**: Test components independently
- **Version Control**: Git commit thường xuyên

## Bước tiếp theo

- [Landing Page Application](./06-landing-page.md)
- [API Integration](./07-api-integration.md)
- [Troubleshooting](./09-troubleshooting.md)
