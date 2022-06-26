import Airtable from 'airtable';

import appConfig from '../../config';

class AirtableSingleton {
  public instance: Airtable;

  constructor() {
    this.instance = new Airtable({
      apiKey: appConfig.airtable.apiKey,
      noRetryIfRateLimited: true,
    });
  }
}

export default new AirtableSingleton();
