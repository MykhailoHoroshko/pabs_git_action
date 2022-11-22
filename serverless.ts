import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "ingestion-layer-lambda",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  package: {
    individually: true,
  },
  // import the function via paths
  functions: {
    test: {
      handler: "index.handler",
    },
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      sourcemap: true,
      target: "node16",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
      keepOutputDirectory: true,
    },
  },
};

module.exports = serverlessConfiguration;
