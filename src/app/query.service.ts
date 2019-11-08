import { Injectable } from '@angular/core';
import { CosmosClient, SqlQuerySpec, FeedOptions } from '@azure/cosmos';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QueryContainerService } from './query-container.service';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  client: CosmosClient;

  constructor(private queryContainer: QueryContainerService) {
  }

  query<T = any>(query: string | SqlQuerySpec, options: FeedOptions) {
    return this.queryContainer.get()
      .pipe(
        flatMap((container) => container.items.query<T>(query, options).fetchNext())
      )
  }
}
