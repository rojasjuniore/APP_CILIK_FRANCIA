import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-purchases-dasdboard',
  templateUrl: './purchases-dasdboard.component.html',
  styleUrls: ['./purchases-dasdboard.component.css']
})
export class PurchasesDasdboardComponent implements OnInit {
  public uid!: string;
  public queries = {
    pending: {
      available: true,
      query: [
        { field: 'status', condition: '==', value: 'pending' },
        // {field: 'uid', condition: '==', value: null},
      ],
      opts: { orderBy: [{ field: "createdAt", order: "desc" }] }
    },

    paymentProcess: {
      available: false,
      query: [
        { field: 'status', condition: '==', value: 'paymentProcess' },
        // {field: 'uid', condition: '==', value: null},
      ],
      opts: { orderBy: [{ field: "createdAt", order: "desc" }] }
    },


    completed: {
      available: false,
      query: [
        { field: 'status', condition: '==', value: 'completed' },
        // {field: 'uid', condition: '==', value: null},
      ],
      opts: { orderBy: [{ field: "createdAt", order: "desc" }] }
    },
    rejected: {
      available: false,
      query: [
        { field: 'status', condition: '==', value: 'rejected' },
        // {field: 'uid', condition: '==', value: null},
      ],
      opts: { orderBy: [{ field: "createdAt", order: "desc" }] }
    },
    preApproved: {
      available: false,
      query: [
        { field: 'status', condition: '==', value: 'preApproved' },
      ],
      opts: { orderBy: [{ field: "createdAt", order: "desc" }] }
    },
  };

  private sub$!: Subscription;

  constructor(
    private authSrv: AuthenticationService,
  ) { }


  selectTab(tabName: string): void {
    // Set all to false initially
    for (let key in this.queries) {
      this.queries[key].available = false;
    }

    // Enable the selected tab
    if (this.queries.hasOwnProperty(tabName)) {
      this.queries[tabName].available = true;
    }
  }


  ngOnInit(): void {

    this.sub$ = this.authSrv.uid$.subscribe((uid) => {
      // console.log('uid', uid);
      if (!uid) { return; }
      this.uid = uid;
      this.updateValues();
    });

  }

  /**
   * Habilitar las consultas que requieren el uid del usuario
   */
  updateValues() {
    const snapshot = Object.entries(this.queries).map(([key, value]) => {
      const available = (this.uid) ? true : false;
      const query = value.query.map((query) => query.field === 'uid' ? { ...query, value: this.uid } : query);
      const opts = value.opts;
      return { [key]: { available, query, opts } };
    })
      .reduce((acc, cur) => ({ ...acc, ...cur }), {});
    // console.log('snapshot', snapshot);
    this.queries = { ...this.queries, ...snapshot };
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

}
