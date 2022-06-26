import { AWSLambda as SentryAWSLambda } from '@sentry/serverless';

import appConfig from '../config';
import { AirTableService } from '../services/airtable/airtable.service';
import { Logger } from '../services/logger.service';

class AirtableSyncCron {
  private readonly logger = new Logger(AirtableSyncCron.name);
  private readonly airTableService = new AirTableService(
    appConfig.airtable.baseId,
  );

  async migrate(tables: string[]) {
    const data = await this.airTableService.getAll(tables);

    await Promise.all(
      data.map(({ table, records }) => {
        // save to your private db

        this.logger.info(`migrated ${table} count = ${records.length}`);
      }),
    );
  }
}

SentryAWSLambda.init({
  dsn: appConfig.sentryDsn,
  tracesSampleRate: 1.0,
  environment: appConfig.stage,
});

export const handler = SentryAWSLambda.wrapHandler(
  async (event, context, cb) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
      await new AirtableSyncCron().migrate(['Table1', 'Table2']);
      cb(null);
    } catch (err: any) {
      SentryAWSLambda.captureException(err);
      cb(err);
    }
  },
);
