import { FieldSet, Records } from 'airtable';

import { AirtableBase } from 'airtable/lib/airtable_base';

import { Logger } from '../logger.service';

import airtableSingleton from './airtable.singleton';

export class AirTableService {
  private readonly logger = new Logger(AirTableService.name);
  private readonly airtable = airtableSingleton.instance;
  private readonly airtableBase: AirtableBase;

  constructor(baseId: string) {
    this.airtableBase = this.airtable.base(baseId);
  }

  public getAll(
    tableList: string[],
  ): Promise<{ table: string; records: Records<FieldSet> }[]> {
    this.logger.debug(`getAll from tables = "${JSON.stringify(tableList)}"`);

    return Promise.all(
      tableList.map(async (table) => {
        const records = await this.airtableBase.table(table).select().all();
        return {
          table,
          records,
        };
      }),
    );
  }
}
