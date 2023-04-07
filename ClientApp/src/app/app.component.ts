import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading = true;
  error: any;
  data: any;
  displayedColumns: string[] = ['name', 'description', ];

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          query {
            superheroes {
              name,
              description,
              superpowers(order: {superPower:ASC}) {
                superPower,
                description
              }
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.data = result.data.superheroes;
      })

    const dataSource = this.data;
  }
}
