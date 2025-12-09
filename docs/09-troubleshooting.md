# Troubleshooting - Giải quyết Vấn đề

## Page Builder Issues

### 1. Editor Không Load - Loader Hiển thị Mãi

**Triệu chứng**:
- Truy cập Page Builder URL
- Thấy loader spinner
- Editor không bao giờ hiển thị
- Có thể thấy message "No tokenUrl - check console for details"

**Nguyên nhân**:
Đây là vấn đề phức tạp với nhiều nguyên nhân có thể:

1. **`tokenUrl` empty**: Thiếu một trong ba giá trị: `url`, `licenceToken`, hoặc `locale`
2. **`availableLocales` không được populate**: `useMemo` dependency array thiếu `availableLocales`
3. **iframe không load**: URL không đúng hoặc Next.js dev server không chạy
4. **CHILD_READY message không được gửi**: Editor component không gửi message

**Debug Steps**:

1. **Mở Browser Console** và tìm các logs sau:

```javascript
// Check if URL params are extracted
[Page Builder] URL params useMemo running, availableLocales: [...]
[Page Builder] URL params extracted: {contentType, templateId, contentId, locale}

// Check if API returns data
[Page Builder] getEditorData called with: {...}
[Page Builder] API response: {...}
[Page Builder] Setting licenceToken: ...
[Page Builder] Setting url: ...
[Page Builder] Setting availableLocales: [...]

// Check if tokenUrl is generated
[Page Builder] tokenUrl deps: {url, licenceToken, locale, ...}
[Page Builder] tokenUrl generated: http://...

// Check if iframe loads
[Page Builder] iframe loaded successfully

// Check if editor sends ready message
[Editor] Sending CHILD_READY message to parent
[Page Builder] CHILD_READY received, calling handlePopulate
```

2. **Xác định vấn đề**:

- **Nếu thấy "tokenUrl empty because"**: Check giá trị nào missing
- **Nếu không thấy "tokenUrl generated"**: `useMemo` dependencies có vấn đề
- **Nếu không thấy "iframe loaded"**: iframe URL không đúng
- **Nếu không thấy "CHILD_READY"**: Editor component có vấn đề

**Giải pháp**:

#### A. Fix `useMemo` Dependencies

File: `/packages/strapi-page-builder/admin/src/pages/HomePage.tsx`

```typescript
// Line 82-92: Ensure availableLocales is in dependency array
const { contentType, templateId, contentId, locale } = useMemo(() => {
  // ... code ...
}, [window?.location.href, availableLocales])  // ← Must include availableLocales

// Line 164-174: Ensure locale is in dependency array
const tokenUrl = useMemo(() => {
  // ... code ...
}, [url, licenceToken, contentId, contentType, templateId, locale])  // ← Must include locale
```

#### B. Fix CHILD_READY Message

File: `/packages/strapi-page-builder-react/src/index.tsx`

```typescript
// Line 129-182: Send CHILD_READY after message handler is set up
useEffect(() => {
  const handleMessage = (event: MessageEvent) => {
    // ... message handling ...
  };
  window.addEventListener("message", handleMessage);
  
  // Send CHILD_READY after handler is registered
  console.log('[Editor] Sending CHILD_READY message to parent');
  sendMessage({ type: "child_ready", data: {} });
  
  return () => window.removeEventListener("message", handleMessage);
}, [saveTemplate]);
```

#### C. Rebuild và Restart

```bash
# 1. Rebuild strapi-page-builder plugin
cd packages/strapi-page-builder
pnpm build

# 2. Rebuild strapi-page-builder-react
cd ../strapi-page-builder-react
pnpm build

# 3. Reinstall in landingpage
cd ../../landingpage
rm -rf .next
rm -rf node_modules/@wecre8websites
yarn install --force

# 4. Restart Next.js dev server
pkill -f "next dev"
yarn dev

# 5. Hard refresh browser (Ctrl+Shift+R)
```

### 2. Components Không Hiển thị Trong Editor

**Triệu chứng**:
- Editor load thành công
- Sidebar trái trống hoặc thiếu components
- Không thể kéo components vào page

**Nguyên nhân**:
- Components chưa được register trong `page-builder-config.tsx`
- Config file có lỗi syntax
- Component import failed

**Giải pháp**:

1. **Check config file**:

File: `/landingpage/src/lib/page-builder-config.tsx`

```typescript
import { Config } from '@wecre8websites/strapi-page-builder-react';

// Import all components
import HeroSection from '@/components/hero-section';
import Banner from '@/components/banner';
// ... other imports

export const config: Config = {
  components: {
    HeroSection: {
      fields: {
        // ... fields definition
      },
      defaultProps: {
        // ... default props
      },
      render: (props) => <HeroSection {...props} />,
    },
    // ... other components
  },
};
```

2. **Verify component exports**:

```typescript
// Component must be default export
export default function HeroSection(props) {
  // ...
}

// Or named export with default
export { HeroSection as default };
```

3. **Check browser console** for import errors

### 3. Save Không Hoạt động

**Triệu chứng**:
- Click Save button
- Không có response
- Hoặc error trong console

**Nguyên nhân**:
- Permissions không đủ
- Template ID invalid
- Network error
- CORS issues

**Giải pháp**:

1. **Check permissions**:

```javascript
// In browser console
console.log(permissions);
// Should show: {read: true, edit: true, modify: true}
```

2. **Verify template ID**:

```javascript
// Check URL params
const params = new URLSearchParams(window.location.search);
console.log('Template ID:', params.get('_templateId'));
```

3. **Check network tab**:
- Look for PUT request to `/page-builder/editor/templates/{id}`
- Check response status and body
- Verify request headers include auth token

4. **Fix CORS** (if needed):

File: `/strapi/config/middlewares.ts`

```typescript
export default [
  // ...
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:3000', 'http://localhost:1337'],
      credentials: true,
    },
  },
];
```

### 4. Media Picker Không Hoạt động

**Triệu chứng**:
- Click "Select Image"
- Modal không mở
- Hoặc modal trống

**Nguyên nhân**:
- Message passing không hoạt động
- Upload plugin permissions
- MinIO connection issues

**Giải pháp**:

1. **Check message flow**:

```javascript
// In editor (child window)
window.parent.postMessage({
  type: 'request_media',
  data: { target: 'image1', type: 'image' }
}, '*');

// In parent window - should see:
[Page Builder] Received message from iframe: {type: "request_media", ...}
```

2. **Verify Upload permissions**:
- Settings → Users & Permissions → Roles → Public
- Enable: Upload `find`, `findOne`

3. **Check MinIO**:

```bash
# Check MinIO is running
docker-compose ps minio

# Access MinIO console
open http://localhost:9001
# Login: minioadmin / minioadmin
```

## Strapi Issues

### 1. Database Connection Error

**Triệu chứng**:
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Giải pháp**:

```bash
# Check PostgreSQL is running
docker-compose ps postgres

# Restart if needed
docker-compose restart postgres

# Check logs
docker-compose logs postgres

# Verify connection
psql -h localhost -U strapi -d strapi
```

### 2. Admin Panel Không Load

**Triệu chứng**:
- Blank page
- 404 errors
- Build errors

**Giải pháp**:

```bash
# Rebuild admin
cd strapi
yarn build

# Clear cache
rm -rf .cache
rm -rf build

# Restart
yarn develop
```

### 3. Plugin Không Xuất hiện

**Triệu chứng**:
- Page Builder plugin không có trong menu

**Giải pháp**:

1. **Check plugin config**:

File: `/strapi/config/plugins.ts`

```typescript
export default {
  'page-builder': {
    enabled: true,
    resolve: './src/plugins/page-builder',
  },
};
```

2. **Verify plugin installation**:

```bash
cd packages/strapi-page-builder
pnpm build

# Link to strapi
cd ../../strapi
yarn add file:../packages/strapi-page-builder
```

3. **Restart Strapi**:

```bash
yarn develop
```

## Next.js Issues

### 1. Module Not Found

**Triệu chứng**:
```
Module not found: Can't resolve '@wecre8websites/strapi-page-builder-react'
```

**Giải pháp**:

```bash
cd landingpage

# Remove and reinstall
rm -rf node_modules
yarn install

# If using local package
cd ../packages/strapi-page-builder-react
pnpm build

cd ../../landingpage
yarn install --force
```

### 2. Port Already in Use

**Triệu chứng**:
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Giải pháp**:

```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 yarn dev
```

### 3. Build Errors

**Triệu chứng**:
- TypeScript errors
- Import errors
- Missing dependencies

**Giải pháp**:

```bash
# Clear Next.js cache
rm -rf .next

# Check TypeScript
yarn tsc --noEmit

# Install missing dependencies
yarn install

# Rebuild
yarn build
```

## Docker Issues

### 1. Container Won't Start

**Giải pháp**:

```bash
# Check logs
docker-compose logs <service-name>

# Remove and recreate
docker-compose down
docker-compose up -d

# Remove volumes (WARNING: deletes data)
docker-compose down -v
docker-compose up -d
```

### 2. Port Conflicts

**Giải pháp**:

Edit `docker-compose.yml`:

```yaml
services:
  postgres:
    ports:
      - "5433:5432"  # Use different host port
```

## Performance Issues

### 1. Slow Editor Load

**Giải pháp**:

1. **Optimize images**:
- Use WebP format
- Compress images
- Use appropriate sizes

2. **Reduce bundle size**:

```bash
# Analyze bundle
cd landingpage
yarn build
yarn analyze
```

3. **Enable caching**:

File: `/landingpage/next.config.ts`

```typescript
export default {
  images: {
    formats: ['image/webp'],
  },
  compress: true,
};
```

### 2. Slow API Responses

**Giải pháp**:

1. **Add database indexes**
2. **Enable Strapi caching**
3. **Use CDN for media**
4. **Optimize queries**

## Common Errors

### Error: "Invalid token"

**Giải pháp**:
- Regenerate API token in Strapi
- Update `.env.local` in landingpage
- Restart Next.js dev server

### Error: "CORS policy"

**Giải pháp**:
- Update `/strapi/config/middlewares.ts`
- Add frontend URL to allowed origins
- Restart Strapi

### Error: "Cannot read property of undefined"

**Giải pháp**:
- Add null checks
- Provide default values
- Use optional chaining (`?.`)

## Debug Tools

### Browser DevTools

```javascript
// Check state
console.log('State:', {
  tokenUrl,
  locale,
  templateJson,
  childReady,
});

// Monitor messages
window.addEventListener('message', (e) => {
  console.log('Message:', e.data);
});
```

### React DevTools

- Install React DevTools extension
- Inspect component props and state
- Profile performance

### Network Tab

- Monitor API calls
- Check request/response
- Verify headers and payload

## Getting Help

1. **Check console logs** first
2. **Search existing issues** on GitHub
3. **Create detailed bug report** with:
   - Steps to reproduce
   - Expected vs actual behavior
   - Console logs
   - Screenshots
   - Environment info

## Bước tiếp theo

- [Page Builder](./05-page-builder.md)
- [API Integration](./07-api-integration.md)
- [Project Structure](./03-project-structure.md)
