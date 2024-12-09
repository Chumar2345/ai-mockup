/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://new_owner:M6nyFmxOviL2@ep-rough-cherry-a556laab.us-east-2.aws.neon.tech/new?sslmode=require',
    }
  };