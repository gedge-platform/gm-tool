// vite.config.js
import { defineConfig, loadEnv } from "file:///C:/Users/Admin/Desktop/github/gm-tool/.yarn/__virtual__/vite-virtual-46aced8843/0/cache/vite-npm-3.2.5-f23b9ecb5b-ad35b7008c.zip/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Admin/Desktop/github/gm-tool/.yarn/__virtual__/@vitejs-plugin-react-virtual-7c27e6af3d/0/cache/@vitejs-plugin-react-npm-2.2.0-a43e4127d1-cc85ab31b4.zip/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";

// postcss.config.js
import autoprefixer from "file:///C:/Users/Admin/Desktop/github/gm-tool/.yarn/__virtual__/autoprefixer-virtual-5166bd786d/0/cache/autoprefixer-npm-10.4.14-1e0b8c34fb-e9f18e664a.zip/node_modules/autoprefixer/lib/autoprefixer.js";
var postcss_config_default = {
  plugins: [autoprefixer]
};

// vite.config.js
import copy from "file:///C:/Users/Admin/Desktop/github/gm-tool/.yarn/cache/rollup-plugin-copy-npm-3.4.0-1f9ca5b167-6eed5b2498.zip/node_modules/rollup-plugin-copy/dist/index.commonjs.js";
import { viteCommonjs } from "file:///C:/Users/Admin/Desktop/github/gm-tool/.yarn/cache/@originjs-vite-plugin-commonjs-npm-1.0.3-75b36e7757-e4cd22a73e.zip/node_modules/@originjs/vite-plugin-commonjs/lib/index.js";
var __vite_injected_original_dirname = "C:\\Users\\Admin\\Desktop\\github\\gm-tool";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAicG9zdGNzcy5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBZG1pblxcXFxEZXNrdG9wXFxcXGdpdGh1YlxcXFxnbS10b29sXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBZG1pblxcXFxEZXNrdG9wXFxcXGdpdGh1YlxcXFxnbS10b29sXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9BZG1pbi9EZXNrdG9wL2dpdGh1Yi9nbS10b29sL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHBvc3Rjc3MgZnJvbSBcIi4vcG9zdGNzcy5jb25maWcuanNcIjtcclxuaW1wb3J0IGNvcHkgZnJvbSBcInJvbGx1cC1wbHVnaW4tY29weVwiO1xyXG5pbXBvcnQgeyB2aXRlQ29tbW9uanMgfSBmcm9tIFwiQG9yaWdpbmpzL3ZpdGUtcGx1Z2luLWNvbW1vbmpzXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCAoeyBtb2RlIH0pID0+IHtcclxuICBwcm9jZXNzLmVudiA9IHsgLi4ucHJvY2Vzcy5lbnYsIC4uLmxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSkgfTtcclxuICByZXR1cm4gZGVmaW5lQ29uZmlnKHtcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBwb3J0OiA4MDgwLFxyXG4gICAgICBvcGVuOiBmYWxzZSxcclxuICAgICAgcm9vdDogXCJzcmNcIixcclxuICAgICAgcHVibGljRGlyOiBcIi4uL3B1YmxpY1wiLFxyXG4gICAgICAvLyBwcm94eToge1xyXG4gICAgICAvLyAgICcvYXBpJzoge1xyXG4gICAgICAvLyAgICAgdGFyZ2V0OiAnaHR0cDovLzE5Mi4xNjguMC4xODg6NTY3MDEnLFxyXG4gICAgICAvLyAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAvLyAgICAgd3M6IHRydWUsXHJcbiAgICAgIC8vICAgICByZXdyaXRlOiBwYXRoID0+IHJlcGxhY2UoL15cXC9hcGkvLCAnJylcclxuICAgICAgLy8gfVxyXG4gICAgICAvLyB9XHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgZW1wdHlPdXREaXI6IHRydWUsXHJcbiAgICAgIG91dERpcjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwicHVibGljXCIsIFwiZGlzdFwiKSxcclxuICAgICAgLy8gcHVibGljUGF0aDogXCJcIixcclxuICAgICAgc291cmNlbWFwOiBmYWxzZSxcclxuICAgICAgbWluaWZ5OiB0cnVlLFxyXG4gICAgICBjb21tb25qc09wdGlvbnM6IHtcclxuICAgICAgICB0cmFuc2Zvcm1NaXhlZEVzTW9kdWxlczogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHJlYWN0KHtcclxuICAgICAgICAvLyBVc2UgUmVhY3QgcGx1Z2luIGluIGFsbCAqLmpzeCBhbmQgKi50c3ggZmlsZXNcclxuICAgICAgICBpbmNsdWRlOiBcIioqLyoue2pzeCx0c3h9XCIsXHJcbiAgICAgICAgYmFiZWw6IHtcclxuICAgICAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgIFwiYmFiZWwtcGx1Z2luLXN0eWxlZC1jb21wb25lbnRzXCIsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3NyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBwcmVwcm9jZXNzOiBmYWxzZSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICB9LFxyXG4gICAgICB9KSxcclxuICAgICAgY29weSh7XHJcbiAgICAgICAgdGFyZ2V0czogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiLCBcImltYWdlc1wiKSxcclxuICAgICAgICAgICAgZGVzdDogcmVzb2x2ZShfX2Rpcm5hbWUsIFwicHVibGljXCIpLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIGNvcHlPbmNlOiB0cnVlLCAvLyBcdUMyRTRcdUQ1ODlcdUQ1NThcdUFDRTAgXHVENTVDXHVCQzg4XHVCOUNDIGNvcHkgXHVENTU4XHVBQzhDIFx1QjlDQ1x1QjRFNFx1QzVCNFx1QzkwQ1xyXG4gICAgICAgIGhvb2s6IFwiY29uZmlnXCIsIC8vIGhvb2tcdUM3M0NcdUI4NUMgY29uZmlnXHVDNzU4IFx1QzJFNFx1RDU4OSBcdUMyRENcdUM4MTBcdUM3M0NcdUI4NUMgXHVDNzdDXHVDRTU4IFx1QzJEQ1x1Q0YxQ1x1QzkwQ1xyXG4gICAgICB9KSxcclxuICAgICAgdml0ZUNvbW1vbmpzKCksXHJcbiAgICBdLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgIFwiQFwiOiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIiksXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHBvc3Rjc3MsXHJcbiAgICAgIGRldlNvdXJjZW1hcDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBvcHRpbWl6ZURlcHM6IHtcclxuICAgICAgYXV0bzogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSk7XHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcQWRtaW5cXFxcRGVza3RvcFxcXFxnaXRodWJcXFxcZ20tdG9vbFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcQWRtaW5cXFxcRGVza3RvcFxcXFxnaXRodWJcXFxcZ20tdG9vbFxcXFxwb3N0Y3NzLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvQWRtaW4vRGVza3RvcC9naXRodWIvZ20tdG9vbC9wb3N0Y3NzLmNvbmZpZy5qc1wiO2ltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSBcImF1dG9wcmVmaXhlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHBsdWdpbnM6IFthdXRvcHJlZml4ZXJdLFxyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZTLFNBQVMsY0FBYyxlQUFlO0FBQ25WLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7OztBQ0YyUixPQUFPLGtCQUFrQjtBQUU1VSxJQUFPLHlCQUFRO0FBQUEsRUFDYixTQUFTLENBQUMsWUFBWTtBQUN4Qjs7O0FEQUEsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBTDdCLElBQU0sbUNBQW1DO0FBUXpDLElBQU8sc0JBQVEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUMzQixVQUFRLE1BQU0sRUFBRSxHQUFHLFFBQVEsS0FBSyxHQUFHLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQyxFQUFFO0FBQ2hFLFNBQU8sYUFBYTtBQUFBLElBQ2xCLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFdBQVc7QUFBQSxJQVNiO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxhQUFhO0FBQUEsTUFDYixRQUFRLFFBQVEsa0NBQVcsVUFBVSxNQUFNO0FBQUEsTUFFM0MsV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLE1BQ1IsaUJBQWlCO0FBQUEsUUFDZix5QkFBeUI7QUFBQSxNQUMzQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxRQUVKLFNBQVM7QUFBQSxRQUNULE9BQU87QUFBQSxVQUNMLFNBQVM7QUFBQSxZQUNQO0FBQUEsY0FDRTtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxLQUFLO0FBQUEsZ0JBQ0wsYUFBYTtBQUFBLGdCQUNiLFlBQVk7QUFBQSxjQUNkO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsTUFDRCxLQUFLO0FBQUEsUUFDSCxTQUFTO0FBQUEsVUFDUDtBQUFBLFlBQ0UsS0FBSyxRQUFRLGtDQUFXLE9BQU8sUUFBUTtBQUFBLFlBQ3ZDLE1BQU0sUUFBUSxrQ0FBVyxRQUFRO0FBQUEsVUFDbkM7QUFBQSxRQUNGO0FBQUEsUUFDQSxVQUFVO0FBQUEsUUFDVixNQUFNO0FBQUEsTUFDUixDQUFDO0FBQUEsTUFDRCxhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxNQUMvQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNIO0FBQUEsTUFDQSxjQUFjO0FBQUEsSUFDaEI7QUFBQSxJQUNBLGNBQWM7QUFBQSxNQUNaLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRixDQUFDO0FBQ0g7IiwKICAibmFtZXMiOiBbXQp9Cg==
