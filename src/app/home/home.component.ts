import { Component, OnInit } from '@angular/core';
import { QueryService } from '../query.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';

const DEFAULT_QUERY = `
SELECT c.name
FROM images i
JOIN c IN i.Person
WHERE i.type = 'image'
and c.tracker.breach=1`.trim();

interface Form {
  query: string;
}

interface Resource {
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private readonly form: FormGroup;

  resources: Resource[];

  constructor(private query: QueryService, fb: FormBuilder) {
    this.form = fb.group({
      query: [DEFAULT_QUERY],
    });
  }

  ngOnInit() {
  }

  runQuery() {
    const form = this.form.value as Form;
    this.query.query<Resource>(form.query, null)
      .pipe(
        tap((resp) => this.resources = resp.resources),
      )
      .subscribe();
  }

}
