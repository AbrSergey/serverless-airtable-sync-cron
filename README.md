# serverless-airtable-sync-cron

**Cron lambda for synchronization AirTable bases with your private database**

## Instructions

1. `npm install -g serverless` - install Serverless framework globally

2. `npm install` - install dependencies

3. Enter environment variables:

- EXTERNAL_SERVICE_AIRTABLE_API_KEY

- EXTERNAL_SERVICE_AIRTABLE_BASE_ID

- EXTERNAL_SERVICE_SENTRY_DSN_SCHEDULERS

4. `serverless invoke local --function airtableSyncFunction` - run lambda on local machine

5. `serverless deploy function -f airtableSyncFunction` - deploy to AWS provider
