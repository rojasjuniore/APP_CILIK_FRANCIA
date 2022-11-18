

/**
 * Calcular totales de una orden de compra
 * @param orderDoc 
 * @returns 
 */
export function purchaseTotales(orderDoc: any = {}){
    const { 
        rooms = [], 
        additionalCategoryPasses: categoryPasses = [], 
        eventPasses = [],
        coupons = [],
    } = Object.assign({}, orderDoc);
    let groupDiscount = 0;

    const nroParticipantsByRoom = rooms
      .map((room: any) => room.capacity)
      .reduce((a: number, b: number) => a + b, 0);

    const {
        roomsFullPrice,
        roomsPrice,
    } = rooms.reduce((acc, next) => {
        acc.roomsFullPrice += next.fullPrice;
        acc.roomsPrice += next.price;
        return acc;
    }, {
        roomsFullPrice: 0,
        roomsPrice : 0
    });

    const {
        additionalDaysAmountFullPrice,
        additionalDaysAmount
    } = rooms.map(room => room.additionals)
    .filter((row) => row.length > 0)
    .map((data) => 
        data.map((row) => ({
            fullPrice: row.quantity * row.fullPrice,
            price: row.quantity * row.price
        }))
        .reduce((prev, curr) => {
            prev.fullPrice += curr.fullPrice;
            prev.price += curr.price;
            return prev;
        },{
            fullPrice: 0,
            price: 0
        })
    )
    .reduce((prev, curr) => {
        prev.additionalDaysAmountFullPrice += curr.fullPrice;
        prev.additionalDaysAmount += curr.price;
        return prev;
    },{
        additionalDaysAmountFullPrice: 0,
        additionalDaysAmount: 0
    });

    const {
        additionalCategoryPassesAmountFullPrice,
        additionalCategoryPasses
    } = categoryPasses
    .map((row) => {
        if(row.type == 'group'){
            return row.data.map((group) => ({
                fullPrice: group.quantity * group.fullPrice,
                price: group.quantity * group.price,
            })).reduce((prev, curr) =>{
                prev.fullPrice += curr.fullPrice;
                prev.price += curr.price;
                return prev;
            },{
                fullPrice: 0,
                price: 0
            })

        }else{
            return {
                fullPrice: row.quantity * row.fullPrice,
                price: row.quantity * row.price,
            };
        }
    })
    .reduce((prev, curr) => {
        prev.additionalCategoryPassesAmountFullPrice += curr.fullPrice;
        prev.additionalCategoryPasses += curr.price;
        return prev;
    },{
        additionalCategoryPassesAmountFullPrice: 0,
        additionalCategoryPasses: 0,
    });

    const {
        evenPassesFullAmount,
        evenPassesAmount
    } = eventPasses.reduce((acc, next) => {
        acc.evenPassesFullAmount += next.quantity * next.fullPrice;
        acc.evenPassesAmount += next.quantity * next.price;
        return acc;
    }, {
        evenPassesFullAmount: 0,
        evenPassesAmount : 0
    });

    const subTotalFullPrice = [
        roomsFullPrice, 
        additionalDaysAmountFullPrice, 
        additionalCategoryPassesAmountFullPrice,
        evenPassesFullAmount
    ].reduce((prev, curr) => prev + curr, 0)

    let subTotal = [
        roomsPrice, 
        additionalDaysAmount, 
        additionalCategoryPasses,
        evenPassesAmount
    ].reduce((prev, curr) => prev + curr, 0);

    /**
     * Calcular descuento por grupo
     */
    if(nroParticipantsByRoom >= 20){
      groupDiscount = 0.10;
    }else if(nroParticipantsByRoom >= 10){
      groupDiscount = 0.05;
    }

    const groupDiscountAmount = groupDiscount * subTotal;
    subTotal -= groupDiscountAmount;

    const coupon = (coupons.length > 0) ? coupons[0] : { type: 'amount', discount: 0 };
    const couponAmount = (coupon.type == 'percentage') ? (subTotal * coupon.discount) / 100 : coupon.discount;
    subTotal -= couponAmount;

    const discount = subTotalFullPrice - subTotal;
    const total = subTotal;

    return {
        roomsFullPrice,
        roomsPrice,
        additionalDaysAmountFullPrice,
        additionalDaysAmount,
        additionalCategoryPasses,
        additionalCategoryPassesAmountFullPrice,
        evenPassesFullAmount,
        evenPassesAmount,
        couponAmount,
        subTotalFullPrice,
        subTotal,
        discount,
        groupDiscount,
        groupDiscountAmount,
        total
    };
}