import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    devtools(),
    tsConfigPaths(),
    tanstackStart(),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    nitro({
      config: {
        preset: "vercel",
      },
    }),
    viteReact(),
    tailwindcss(),
  ],
  ssr: {
    noExternal: ["streamdown"],
  },
});
