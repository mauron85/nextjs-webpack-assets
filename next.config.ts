// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  webpack: (config, { webpack }) => {
    config.plugins.push({
      apply: (compiler) => {
        compiler.hooks.compilation.tap("LogFinalFilenamesPlugin", (compilation) => {
          compilation.hooks.processAssets.tap(
            {
              name: "LogFinalFilenamesPlugin",
              stage: webpack.Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
            },
            () => {
              const assetNames = Object.keys(compilation.assets);
              console.log("Final asset filenames:", assetNames);
            }
          );
        });
      },
    });
    return config;
  }
};

export default nextConfig;
