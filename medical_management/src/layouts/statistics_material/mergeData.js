export function mergeData(data, firstDateInput) {
    const result = [];
    const productMap = {};

    data.forEach((product) => {
       const { code, name, expiry, importDate, quantity }  = product;

       if (!productMap[code]) {
        productMap[code] = {
            code,
            name,
            importQuantity: 0,
            soldQuantity: 0,
            storageQuantity: 0,
            brokenQuantity: 0
        };
       }

       if (importDate > firstDateInput) {
        productMap[code].importQuantity += quantity;
       }

       productMap[code].soldQuantity += (0.8 * quantity);

       if (expiry > firstDateInput) {
        productMap[code].storageQuantity += (0.2 * quantity);
       }

       if (expiry < firstDateInput) {
        productMap[code].brokenQuantity += (0.2 * quantity);
       }
    });

    for (const code in productMap) {
        result.push(productMap[code]);
    }
    
    return result;
}