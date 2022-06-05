import { defineConfig } from 'vite';
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname'
import react from '@vitejs/plugin-react';
const path = require("path");
const fs = require('fs');

const plugins = [
  manualChunksPlugin(),
  react()
];

const build = {
  // lib: {
  //   entry: path.resolve(__dirname, 'lib/main.js'),
  //   name: 'MyLib',
  //   fileName: (format) => `my-lib.${format}.js`
  // },
  chunkSizeWarningLimit: 600,
  rollupOptions: {
    // make sure to externalize deps that shouldn't be bundled
    // into your library
    // external: ['vue'],
    output: {
      // Provide global variables to use in the UMD build
      // for externalized deps
      // globals: {
      //   vue: 'Vue'
      // }
    }
  }
};

const resolve = {
  alias: [
    {
      find: '@',
      replacement: path.resolve(__dirname, 'src')
    }
  ]
};

export default defineConfig(({ command, mode }) => {
  if (command == 'serve') {
    return {
      server: {
        open: '/',
        disableHostCheck: true,
        hot: true,
      },
      resolve,
      build,
      plugins,
    };
  }
  return {
    base: (path.resolve(__dirname, './dist/')).replace(/\\/g, '/'),
    build,
    resolve,
    plugins,
  }
})

// https://vitejs.dev/config/
// export default defineConfig({
//   base: (path.resolve(__dirname, './dist/')).replace(/\\/g, '/'),
//   build: {
//     // lib: {
//     //   entry: path.resolve(__dirname, 'lib/main.js'),
//     //   name: 'MyLib',
//     //   fileName: (format) => `my-lib.${format}.js`
//     // },
//     rollupOptions: {
//       // make sure to externalize deps that shouldn't be bundled
//       // into your library
//       // external: ['vue'],
//       output: {
//         // Provide global variables to use in the UMD build
//         // for externalized deps
//         // globals: {
//         //   vue: 'Vue'
//         // }
//       }
//     }
//   },
    // base: process.env.ELECTRON=="true" ? './' : ".",
    // build: {
    //   rollupOptions: {
    //     // https://rollupjs.org/guide/en/#outputmanualchunks
    //     output: {
    //       manualChunks: {
    //         'group-user': [
    //           './src/UserDetails',
    //           './src/UserDashboard',
    //           './src/UserProfileEdit',
    //         ],
    //       },
    //     },
    //   },
    // },
//   // base: process.env.ELECTRON=="true" ? './' : ".",
//   // build: {
//   //   rollupOptions: {
//   //     // https://rollupjs.org/guide/en/#outputmanualchunks
//   //     output: {
//   //       manualChunks: {
//   //         'group-user': [
//   //           './src/UserDetails',
//   //           './src/UserDashboard',
//   //           './src/UserProfileEdit',
//   //         ],
//   //       },
//   //     },
//   //   },
//   // },
//   plugins: [
//     manualChunksPlugin(),
//     vue()
//   ],
// });