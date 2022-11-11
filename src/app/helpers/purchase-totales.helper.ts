

/**
 * Calcular totales de una orden de compra
 * @param orderDoc 
 * @returns 
 */
export function totales(orderDoc: any = {}){
    const { 
        rooms = [], 
        additionalCategoryPasses: categoryPasses = [], 
        groupDiscount = 0,
        eventPasses = []
    } = Object.assign({}, orderDoc);

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
        }, {
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
        acc.fullPrice += next.quantity * next.fullPrice;
        acc.price += next.quantity * next.price;
        return acc;
    }, {
        fullPrice: 0,
        price : 0
    });

    const subTotalFullPrice = [
        roomsFullPrice, 
        additionalDaysAmountFullPrice, 
        additionalCategoryPassesAmountFullPrice,
        evenPassesFullAmount
    ].reduce((prev, curr) => prev + curr, 0)

    const subTotal = [
        roomsPrice, 
        additionalDaysAmount, 
        additionalCategoryPasses,
        evenPassesAmount
    ].reduce((prev, curr) => prev + curr, 0);

    const discount = subTotalFullPrice - subTotal;
    const groupDiscountAmount = groupDiscount * subTotal;
    const total = subTotal - groupDiscountAmount;

    return {
        roomsFullPrice,
        roomsPrice,
        additionalDaysAmountFullPrice,
        additionalCategoryPasses,
        evenPassesFullAmount,
        evenPassesAmount,
        subTotalFullPrice,
        subTotal,
        discount,
        groupDiscountAmount,
        total
    };
}