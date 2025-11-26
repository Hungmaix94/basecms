# Landing Page Project

This project is a Next.js application initialized with shadcn UI, demonstrating how to integrate a custom component registry.

## Project Setup

The project was created using `create-next-app` with TypeScript, Tailwind CSS, ESLint, and the App Router.

```bash
npx create-next-app@latest landingpage --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
```

## Shadcn UI Initialization

shadcn UI was initialized in the project with default settings.

```bash
cd landingpage
npx shadcn@latest init --yes --css-variables --base-color="slate"
```

## Adding a Custom Component Registry

To use a custom component registry with shadcn UI, you need to modify the `components.json` file in your project. The custom registry is added as an alias within the `registries` object, using a template URL where `{name}` is a placeholder for the component name.

1.  **Open `components.json`:**
    `landingpage/components.json`

2.  **Add your custom registry alias:**
    Locate the `"registries": {}` object and add your custom registry alias and its template URL. For this project, we used `@custom` as the alias and `https://registry-template-alpha.vercel.app/r/{name}.json` as the template URL.

    The `registries` section should look like this:

    ```json
    "registries": {
      "@custom": "https://registry-template-alpha.vercel.app/r/{name}.json"
    }
    ```

## Installing Components from the Custom Registry

Once your custom registry is configured in `components.json`, you can install components from it using the `shadcn add` command, prefixed with your custom registry alias.

To install the `hero-section` component from the `@custom` registry:

```bash
cd landingpage
npx shadcn@latest add @custom/hero-section --yes
```

This command will fetch the `hero-section` component from your specified custom registry and add it to your project.

## Using the Installed Component

After installing a component, you can import and use it in your Next.js pages or components.

For example, to use the `HeroSection` component in `src/app/page.tsx`:

1.  **Open `src/app/page.tsx`:**

2.  **Add the import statement:**

    ```typescript
    import HeroSection from "../components/hero-section";
    ```

3.  **Render the component in your JSX:**

    ```typescript
    export default function Home() {
      return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
          <main>
            <HeroSection />
          </main>
        </div>
      );
    }
    ```

## Running the Application

To run the Next.js application and see your installed components:

1.  **Navigate to the project directory:**
    ```bash
    cd landingpage
    ```
2.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open your web browser and go to `http://localhost:3000` to view the application.