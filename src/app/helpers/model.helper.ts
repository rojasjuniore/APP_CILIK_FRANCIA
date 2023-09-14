


/**
 * Manejar consultas que retornan arreglos
 *
 * @param snapshot
 * @returns
 */
export async function handlerArrayResult(snapshot: any, opts: any = {}){
    const {idField = "_id"} = opts;
    let result: any[] = [];
    
    if(snapshot.empty){ return result; }

    snapshot.forEach((doc: any) => {
        result.push(
            Object.assign({}, doc.data(), {[idField]: doc.id})
        );
    });
    
    return result;
}

/**
 * Manejar consutlas que retornan un objeto
 *
 * @param snapshot
 * @returns
 */
export async function handlerObjectResult(snapshot: any, opts: any = {}){
    const {idField = "_id"} = opts;

    if(!snapshot.exists){ return null; }

    return Object.assign({}, snapshot.data(), {[idField]: snapshot.id});
}

export async function handlerArrayResultRDB(snapshot: any, opts: any = {}){
    const {idField = "_id"} = opts;
    let result: any[] = [];
    
    if(snapshot.numChildren() == 0){ return result; }

    snapshot.forEach((doc: any) => {
        result.push(
            Object.assign({}, doc.val(), {[idField]: doc.key})
        );
    });
    
    return result;
}

export async function handlerObjectResultRDB(snapshot, opts: any = {}){
    const {idField = "_id"} = opts;
    if(!snapshot.exists()){ return null; }
    return Object.assign({}, snapshot.val(), {[idField]: snapshot.key});
}




