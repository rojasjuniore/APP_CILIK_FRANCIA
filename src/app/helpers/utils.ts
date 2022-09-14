
// import Web3 from 'web3';
// import BigNumber from "bignumber.js";

// https://ethereum.stackexchange.com/questions/35014/how-to-show-18-decimals-token-balance-in-readable-format


/**
 * @name toWei
 * @description                 Convert from Ether to Wei  in the correct format
 * @param value 
 * @returns 
 */
export function toWei(value, decimals): any {
    if (!value) { return 0 }
    if (decimals == 18) {
        //  return Web3.utils.toWei(value.toString());
    } else {
        //  let x = new BigNumber(value).multipliedBy(10 ** decimals)
        //  return x.toString()
    }
}


/**
 * @name toGwei
 * @description                 Convert from Ether to Wei  in the correct format
 * @param value 
 * @returns 
 */
export function toGwei(value): any {
    // return Web3.utils.toWei(value.toString(), 'gwei');

}

/**
 * @name toHex
 * @param value 
 * @returns 
 */
export function toHex(value): any {
    // return Web3.utils.toHex(value);
}


/**
 * @name fromGwei
 * @param value 
 * @returns 
 */
export function fromGwei(value): any {
    //  return Web3.utils.fromWei(value.toString(), 'gwei');

}


/**
 * @name parseUnits
 * @param value 
 * @returns 
 */
export function parseUnits(value): any {
    //  return Web3.utils.fromWei(value.toString(), 'gwei');
}


/**
 * @name fromWei
 * @description                     Convert from Wei to Ether in the correct format
 * @param value 
 * @param decimals 
 * @returns 
 */
export function fromWei(value, decimals): any {
    if (!value) { return 0 }
    if (decimals == 18) {
        //  return Web3.utils.fromWei(value.toString());
    } else {
        // let x = new BigNumber(value).dividedBy(10 ** decimals).toString(10)
        // return x.toString()
    }
}

/**
 * @name toBN
 * @param value 
 * @returns 
 */
export function toBN(value): any {
    // return Web3.utils.toBN(value)
}


/**
 * @name addressIsValid
 * @description                     Verify that the address is valid
 * @param accounts 
 * @returns 
 */
export function addressIsValid(accounts) {
    //  return Web3.utils.isAddress(accounts)
}


/**
 * @name addDays
 * @description                       Agregamos dias a la fecha actual      
 * @param days 
 * @returns 
 */
export function addDays(days) {
    let dateInAWeek = new Date(); // now
    dateInAWeek.setDate(dateInAWeek.getDate() + days); // add 7 days
    const deadline = Math.floor(dateInAWeek.getTime() / 1000); // unix timestamp
    return deadline.toString()
}


/**
 * @name getDateFromBlock
 * @description                     Transforma una fecha de bloque a js
 * @param timestamp 
 * @returns 
 */
export function getDateFromBlock(timestamp) {
    let date = new Date(timestamp * 1000);
    return date
}


/**
 * @name fromBasicPoint
 * @param value 
 * @returns 
 */
export function fromBasicPoint(value) {
    return Number(value) / 100;
}


/**
 * @name toBasicPoint
 * @param value 
 * @returns 
 */
export function toBasicPoint(value) {
    return Number(value) * 100;
}


/**
 * @name convertFromDaysToSeconds
 * @description                 Convertimos los dias por segundo
 * @param day 
 * @returns 
 */
export function convertFromDaysToSeconds(day) {
    return 86400 * day;
}
