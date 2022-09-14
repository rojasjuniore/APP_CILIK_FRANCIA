import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { convertFromDaysToSeconds } from '../helpers/utils';
import { ContractService } from './contract.service';

@Injectable({
  providedIn: 'root'
})
export class StakeService {

  private setAccountStakes = new Subject<any>();
  accountStakes$ = this.setAccountStakes.asObservable();
  account: any;


  constructor(
    private spinner: NgxSpinnerService,
    public contractService: ContractService) {


    let oldData = this.contractService.getDataContract()
    this.account = oldData.accounts
  }


  // let stakeID = await devToken.stake(stake_amount, convertFromDaysToSeconds(30), toWei(0.07), { from: owner });

  async stake(stake_amount: string, date: number, apy: string) {
    this.spinner.show();
    await this.contractService.reInitializating()

    // console.log("stake_amount", stake_amount)
    // console.log("date", date)
    // console.log("date", apy)

    await this.contractService
      .uToken
      .methods
      .stake(stake_amount, date, apy)
      .estimateGas({ from: this.account })
      .then(async (gas) => {
        console.log("gas", gas);
        // We now have the gas amount, we can now send the transaction
        let result = await this
          .contractService
          .uToken
          .methods
          .stake(stake_amount, date, apy)
          .send({
            from: this.account,
            gas: gas
          })

        console.log("result", result)
        await this.contractService.reInitializating()
        this.getHasStake()
        alert("stake Successful")
        this.spinner.hide();
      }).catch((error) => {
        this.spinner.hide();
        alert("User denied transaction ")
        throw new Error(error);
      });
  }

  /**
   * @notice
   * hasStake is used to check if a account has stakes and the total amount along with all the seperate stakes
   */
  async getHasStake() {
    await this.contractService.reInitializating()

    console.log("account", this.account)
    if (!this.account) { return }
    this.
      contractService
      .uToken
      .methods
      .hasStake(this.account)
      .call()
      .then((result) => {
        //  console.log("result", result)
        this.setAccountStakes.next(result)
      })
      .catch((error) => {
        throw new Error(error);
      })
  }

  /**
 * @notice withdrawStake is used to withdraw stakes from the account holder
 */
  async withdrawStake(stake_amount: string, stake_index: string) {
    this.spinner.show();
    await this.contractService.reInitializating()

    console.log("stake_amount", stake_amount)

    this.spinner.show();
    this.
      contractService
      .uToken
      .methods
      .withdrawStake(stake_amount, stake_index)
      .estimateGas({ from: this.account })
      .then(async (gas) => {

        console.log("gas", gas);
        // We now have the gas amount, we can now send the transaction
        await this.
          contractService
          .uToken
          .methods
          .withdrawStake(stake_amount, stake_index)
          .send({
            from: this.account,
            gas: gas
          })

        this.contractService.reInitializating()
        alert("withdraw Stake Successful")
      }).catch((error) => {
        console.log("error", error)
        alert("User denied transaction")
        this.spinner.hide();
        throw new Error(error);
      });
  }



}
