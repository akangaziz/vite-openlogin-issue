import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import NodeGlobalsPolyfillPlugin from "@esbuild-plugins/node-globals-polyfill";
import rollupNodePolyFill from 'rollup-plugin-polyfill-node'


// https://vitejs.dev/config/
export default defineConfig({
  publicDir: 'static',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    include: [
      // 'Vue',
      //'@toruslabs/openlogin-ed25519',
      //'@toruslabs/openlogin',
    
      
    ],
    exclude: [
    ],
    esbuildOptions: {
      sourcemap: false,
      // Node.js global to browser globalThis
      define: {
          global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
          NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true
          }),
          // NodeModulesPolyfillPlugin(),
          
      ],
   }
  },
  build:{
    exclude: [
      
    ],
    assetsDir: 'src', 
    sourcemap: false,
    define: {
        global: 'globalThis',
    },
    rollupOptions: {
        output: {
            format: "umd",
            globals: {
            },
        },
        // external: ['vue'],
        plugins: [
          rollupNodePolyFill(),
          ],
        
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  }, 
})
