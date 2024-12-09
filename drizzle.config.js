/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ai-resume-db_owner:5kwlmJIzN0cS@ep-shiny-feather-a51bozhv.us-east-2.aws.neon.tech/ai-resume-db?sslmode=require',
    }
  };