import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Container, CosmosClient } from '@azure/cosmos';

interface QueryConfig {
  connectionString: string;
  db: string;
  container: string;
}

@Injectable({
  providedIn: 'root'
})
export class QueryContainerService {
  private container: Container;
  constructor(private http: HttpClient) { }

  get(): Observable<Container> {
    if (this.container) {
      return of(this.container);
    } else {
      return this.http.get<QueryConfig>('assets/config.json')
        .pipe(
          tap((resp) => console.log(resp)),
          map((resp) => new CosmosClient(resp.connectionString)
            .database(resp.db)
            .container(resp.container)),
          tap((container) => this.container = container),
        );
    }
  }
}
