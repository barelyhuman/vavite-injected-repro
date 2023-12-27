import { Plugin } from "vite";
import { vavite } from "vavite";

export function dummy() {
  return [
    configInject(),
    vavite({
      clientAssetsDir: "./dist/client",
      handlerEntry: "./src/handler.tsx",
      reloadOn: "static-deps-change",
      serveClientAssetsInDev: true,
    }),
  ];
}

function configInject(): Plugin {
  return {
    name: "dummy-injector",
    enforce: "pre",
    config() {
      return {
        appType: "custom",
        buildSteps: [
          {
            name: "client",
            config: {
              build: {
                outDir: "dist/client",
                manifest: true,
                rollupOptions: { input: "./src/client-entry.tsx" },
              },
            },
          },
          {
            name: "server",
            config: {
              build: {
                target: "node18",
                ssr: true,
                outDir: "dist/server",
              },
            },
          },
        ],
      };
    },
  };
}
