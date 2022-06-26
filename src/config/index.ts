const appConfig = {
  stage: process.env.STAGE || 'dev',
  region: process.env.REGION,
  airtable: {
    apiKey: <string>process.env.EXTERNAL_SERVICE_AIRTABLE_API_KEY,
    baseId: <string>process.env.EXTERNAL_SERVICE_AIRTABLE_BASE_ID,
  },
  sentryDsn: process.env.EXTERNAL_SERVICE_SENTRY_DSN_SCHEDULERS,
};

Object.entries(appConfig).forEach(([key, value]) => {
  if (typeof value === 'object') {
    Object.entries(value).forEach(([subKey, subValue]) => {
      if (!subValue) {
        console.warn(`ENV VAR = "${key}->${subKey}" IS NOT EXISTENT`);
      }
    });
  } else if (!value) {
    console.warn(`ENV VAR = "${key}" IS NOT EXISTENT`);
  }
});

export default appConfig;
