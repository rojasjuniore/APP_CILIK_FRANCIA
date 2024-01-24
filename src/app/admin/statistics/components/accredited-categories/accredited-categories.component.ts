import { Component, OnInit, ViewChild } from '@angular/core';
import { RecordsService } from 'src/app/services/records.service';
import { environment } from 'src/environments/environment';
import { ModalAccreditedUsersComponent } from '../modal-accredited-users/modal-accredited-users.component';

@Component({
  selector: 'app-accredited-categories',
  templateUrl: './accredited-categories.component.html',
  styleUrls: ['./accredited-categories.component.css']
})
export class AccreditedCategoriesComponent implements OnInit {

  @ViewChild('modalAccreditedUsers') modalAccreditedUsers!: ModalAccreditedUsersComponent;


  accreditationsList: any;
  total: any;
  isLoading = true;
  constructor(
    private recordsSrv: RecordsService
  ) { }

  async ngOnInit(): Promise<void> {
    this.getAccreditationsCount();
  }

  async getAccreditationsCount() {
    this.isLoading = true; // Set loading state to true when the function starts

    try {
      const result: any = await this.recordsSrv.getAccreditationsCount(environment.dataEvent.keyDb);
      console.log(result);

      // Assuming result.result.conteos is an array and needs to be sorted
      if (result && result.result && Array.isArray(result.result.conteos)) {
        this.accreditationsList = result.result.conteos.sort((a, b) => b.count - a.count);
        this.total = result.result.total;
      } else {
        // Handle the case where result.result.conteos is not an array or undefined
        console.error('Invalid or empty data received');
        this.accreditationsList = []; // or set it to some default value
      }
    } catch (error) {
      console.error('Error fetching accreditations count:', error);
      // Handle the error appropriately
      // Optionally, set accreditationsList to a default value or keep it unchanged
    } finally {
      this.isLoading = false; // Ensure isLoading is set to false when the function ends
    }
  }




  launchAccreditedUsersrModal(code) {
    console.log(code);
    this.modalAccreditedUsers.showModal({
      code: code,
    });
  }

}
