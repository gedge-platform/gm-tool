// vite.config.js
import { defineConfig, loadEnv } from "file:///D:/git%20folder/gm-tool/.yarn/__virtual__/vite-virtual-46aced8843/0/cache/vite-npm-3.2.5-f23b9ecb5b-ad35b7008c.zip/node_modules/vite/dist/node/index.js";
import react from "file:///D:/git%20folder/gm-tool/.yarn/__virtual__/@vitejs-plugin-react-virtual-7c27e6af3d/0/cache/@vitejs-plugin-react-npm-2.2.0-a43e4127d1-cc85ab31b4.zip/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";

// postcss.config.js
import autoprefixer from "file:///D:/git%20folder/gm-tool/.yarn/__virtual__/autoprefixer-virtual-5d997a32ab/0/cache/autoprefixer-npm-10.4.13-261edbcee5-dcb1cb7ae9.zip/node_modules/autoprefixer/lib/autoprefixer.js";
var postcss_config_default = {
  plugins: [autoprefixer]
};

// vite.config.js
import copy from "file:///D:/git%20folder/gm-tool/.yarn/cache/rollup-plugin-copy-npm-3.4.0-1f9ca5b167-6eed5b2498.zip/node_modules/rollup-plugin-copy/dist/index.commonjs.js";
import { viteCommonjs } from "file:///D:/git%20folder/gm-tool/.yarn/cache/@originjs-vite-plugin-commonjs-npm-1.0.3-75b36e7757-e4cd22a73e.zip/node_modules/@originjs/vite-plugin-commonjs/lib/index.js";
var __vite_injected_original_dirname = "D:\\git folder\\gm-tool";
var vite_config_default = ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    server: {
      port: 8080,
      open: false,
      root: "src",
      publicDir: "../public"
    },
    build: {
      emptyOutDir: true,
      outDir: resolve(__vite_injected_original_dirname, "public", "dist"),
      sourcemap: false,
      minify: true,
      commonjsOptions: {
        transformMixedEsModules: true
      }
    },
    plugins: [
      react({
        include: "**/*.{jsx,tsx}",
        babel: {
          plugins: [
            [
              "babel-plugin-styled-components",
              {
                ssr: true,
                displayName: true,
                preprocess: false
              }
            ]
          ]
        }
      }),
      copy({
        targets: [
          {
            src: resolve(__vite_injected_original_dirname, "src", "images"),
            dest: resolve(__vite_injected_original_dirname, "public")
          }
        ],
        copyOnce: true,
        hook: "config"
      }),
      viteCommonjs()
    ],
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "src")
      }
    },
    css: {
      postcss: postcss_config_default,
      devSourcemap: true
    },
    optimizeDeps: {
      auto: true
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAicG9zdGNzcy5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxnaXQgZm9sZGVyXFxcXGdtLXRvb2xcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGdpdCBmb2xkZXJcXFxcZ20tdG9vbFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovZ2l0JTIwZm9sZGVyL2dtLXRvb2wvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgcG9zdGNzcyBmcm9tIFwiLi9wb3N0Y3NzLmNvbmZpZy5qc1wiO1xyXG5pbXBvcnQgY29weSBmcm9tIFwicm9sbHVwLXBsdWdpbi1jb3B5XCI7XHJcbmltcG9ydCB7IHZpdGVDb21tb25qcyB9IGZyb20gXCJAb3JpZ2luanMvdml0ZS1wbHVnaW4tY29tbW9uanNcIjtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUgfSkgPT4ge1xyXG4gIHByb2Nlc3MuZW52ID0geyAuLi5wcm9jZXNzLmVudiwgLi4ubG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKSB9O1xyXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIHBvcnQ6IDgwODAsXHJcbiAgICAgIG9wZW46IGZhbHNlLFxyXG4gICAgICByb290OiBcInNyY1wiLFxyXG4gICAgICBwdWJsaWNEaXI6IFwiLi4vcHVibGljXCIsXHJcbiAgICAgIC8vIHByb3h5OiB7XHJcbiAgICAgIC8vICAgJy9hcGknOiB7XHJcbiAgICAgIC8vICAgICB0YXJnZXQ6ICdodHRwOi8vMTkyLjE2OC4wLjE4ODo1NjcwMScsXHJcbiAgICAgIC8vICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgIC8vICAgICB3czogdHJ1ZSxcclxuICAgICAgLy8gICAgIHJld3JpdGU6IHBhdGggPT4gcmVwbGFjZSgvXlxcL2FwaS8sICcnKVxyXG4gICAgICAvLyB9XHJcbiAgICAgIC8vIH1cclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICBlbXB0eU91dERpcjogdHJ1ZSxcclxuICAgICAgb3V0RGlyOiByZXNvbHZlKF9fZGlybmFtZSwgXCJwdWJsaWNcIiwgXCJkaXN0XCIpLFxyXG4gICAgICAvLyBwdWJsaWNQYXRoOiBcIlwiLFxyXG4gICAgICBzb3VyY2VtYXA6IGZhbHNlLFxyXG4gICAgICBtaW5pZnk6IHRydWUsXHJcbiAgICAgIGNvbW1vbmpzT3B0aW9uczoge1xyXG4gICAgICAgIHRyYW5zZm9ybU1peGVkRXNNb2R1bGVzOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgcmVhY3Qoe1xyXG4gICAgICAgIC8vIFVzZSBSZWFjdCBwbHVnaW4gaW4gYWxsICouanN4IGFuZCAqLnRzeCBmaWxlc1xyXG4gICAgICAgIGluY2x1ZGU6IFwiKiovKi57anN4LHRzeH1cIixcclxuICAgICAgICBiYWJlbDoge1xyXG4gICAgICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgXCJiYWJlbC1wbHVnaW4tc3R5bGVkLWNvbXBvbmVudHNcIixcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzc3I6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHByZXByb2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pLFxyXG4gICAgICBjb3B5KHtcclxuICAgICAgICB0YXJnZXRzOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjXCIsIFwiaW1hZ2VzXCIpLFxyXG4gICAgICAgICAgICBkZXN0OiByZXNvbHZlKF9fZGlybmFtZSwgXCJwdWJsaWNcIiksXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgY29weU9uY2U6IHRydWUsIC8vIFx1QzJFNFx1RDU4OVx1RDU1OFx1QUNFMCBcdUQ1NUNcdUJDODhcdUI5Q0MgY29weSBcdUQ1NThcdUFDOEMgXHVCOUNDXHVCNEU0XHVDNUI0XHVDOTBDXHJcbiAgICAgICAgaG9vazogXCJjb25maWdcIiwgLy8gaG9va1x1QzczQ1x1Qjg1QyBjb25maWdcdUM3NTggXHVDMkU0XHVENTg5IFx1QzJEQ1x1QzgxMFx1QzczQ1x1Qjg1QyBcdUM3N0NcdUNFNTggXHVDMkRDXHVDRjFDXHVDOTBDXHJcbiAgICAgIH0pLFxyXG4gICAgICB2aXRlQ29tbW9uanMoKSxcclxuICAgIF0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgXCJAXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBjc3M6IHtcclxuICAgICAgcG9zdGNzcyxcclxuICAgICAgZGV2U291cmNlbWFwOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIG9wdGltaXplRGVwczoge1xyXG4gICAgICBhdXRvOiB0cnVlLFxyXG4gICAgfSxcclxuICB9KTtcclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxnaXQgZm9sZGVyXFxcXGdtLXRvb2xcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGdpdCBmb2xkZXJcXFxcZ20tdG9vbFxcXFxwb3N0Y3NzLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovZ2l0JTIwZm9sZGVyL2dtLXRvb2wvcG9zdGNzcy5jb25maWcuanNcIjtpbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gXCJhdXRvcHJlZml4ZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBwbHVnaW5zOiBbYXV0b3ByZWZpeGVyXSxcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5UCxTQUFTLGNBQWMsZUFBZTtBQUMvUixPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlOzs7QUNGdU8sT0FBTyxrQkFBa0I7QUFFeFIsSUFBTyx5QkFBUTtBQUFBLEVBQ2IsU0FBUyxDQUFDLFlBQVk7QUFDeEI7OztBREFBLE9BQU8sVUFBVTtBQUNqQixTQUFTLG9CQUFvQjtBQUw3QixJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDM0IsVUFBUSxNQUFNLEVBQUUsR0FBRyxRQUFRLEtBQUssR0FBRyxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUMsRUFBRTtBQUNoRSxTQUFPLGFBQWE7QUFBQSxJQUNsQixRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixXQUFXO0FBQUEsSUFTYjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsYUFBYTtBQUFBLE1BQ2IsUUFBUSxRQUFRLGtDQUFXLFVBQVUsTUFBTTtBQUFBLE1BRTNDLFdBQVc7QUFBQSxNQUNYLFFBQVE7QUFBQSxNQUNSLGlCQUFpQjtBQUFBLFFBQ2YseUJBQXlCO0FBQUEsTUFDM0I7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsUUFFSixTQUFTO0FBQUEsUUFDVCxPQUFPO0FBQUEsVUFDTCxTQUFTO0FBQUEsWUFDUDtBQUFBLGNBQ0U7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsS0FBSztBQUFBLGdCQUNMLGFBQWE7QUFBQSxnQkFDYixZQUFZO0FBQUEsY0FDZDtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QsS0FBSztBQUFBLFFBQ0gsU0FBUztBQUFBLFVBQ1A7QUFBQSxZQUNFLEtBQUssUUFBUSxrQ0FBVyxPQUFPLFFBQVE7QUFBQSxZQUN2QyxNQUFNLFFBQVEsa0NBQVcsUUFBUTtBQUFBLFVBQ25DO0FBQUEsUUFDRjtBQUFBLFFBQ0EsVUFBVTtBQUFBLFFBQ1YsTUFBTTtBQUFBLE1BQ1IsQ0FBQztBQUFBLE1BQ0QsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsTUFDL0I7QUFBQSxJQUNGO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDSDtBQUFBLE1BQ0EsY0FBYztBQUFBLElBQ2hCO0FBQUEsSUFDQSxjQUFjO0FBQUEsTUFDWixNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0YsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogW10KfQo=
