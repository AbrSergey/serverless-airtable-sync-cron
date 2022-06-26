# serverless-airtable-sync-cron

**Cron lambda for synchronization AirTable bases with your private database**

## Description

Airtable public API has a rate limit of 5 requests per second, per base.

In many cases it is necessary to synchronize Airtable records with your private database.

This Lambda is an example of how data can be synchronized if changes occur only in Airtable.

## Tech stack

AWS Lambda with Serverless framework on Node.js/Typescript

## Instructions

1. `npm install -g serverless` - install Serverless framework globally

2. `npm install` - install dependencies

3. Enter environment variables:

- EXTERNAL_SERVICE_AIRTABLE_API_KEY

- EXTERNAL_SERVICE_AIRTABLE_BASE_ID

- EXTERNAL_SERVICE_SENTRY_DSN_SCHEDULERS

4. `serverless invoke local --function airtableSyncFunction` - run lambda on local machine

5. `serverless deploy function -f airtableSyncFunction` - deploy to AWS provider
