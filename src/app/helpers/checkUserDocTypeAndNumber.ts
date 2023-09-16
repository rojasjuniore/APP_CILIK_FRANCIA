import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

/**
 * Válidar que el documento del usuario no exista en la base de datos
 * @param authSrv                       Servicio de autenticación
 * @param applyTo                       Aplicar validación a un campo específico
 * @param docTypeField                  Nombre del campo que contiene el tipo de documento
 * @param documentField                 Nombre del campo que contiene el número de documento
 */
export function checkUserDocTypeAndNumber(
    authSrv: AuthenticationService, 
    docTypeField: string = 'identificationType', 
    documentField: string = 'identification'
): AsyncValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
        const formGroup = control.parent as FormGroup;
        const f1 = formGroup.controls[docTypeField];
        const f2 = formGroup.controls[documentField];

        console.log({
            docTypeField: f1.value,
            documentField: f2.value,
        });

        const find = await authSrv.getDynamicToPromise(
            authSrv.collection,
            [
                {field: docTypeField, condition: '==', value: f1.value},
                {field: documentField, condition: '==', value: f2.value}
            ]
        );
        console.log('find', find);

        

        if(f1.errors && !f1.errors.dniStored 
        || f2.errors && !f2.errors.dniStored){
            return null;
        }

        return (find.length > 0) ? { dniStored: true } : null;
    }
}

// export function CheckUserDocument(
//     authSrv: AuthenticationService, 
//     docTypeField: string = 'identificationType', 
//     documentField: string = 'identification'
// ): AsyncValidatorFn {
//     return async (control: AbstractControl): Promise<ValidationErrors | null> => {
//         const formGroup = control.parent as FormGroup;
//         const dtf = formGroup.controls[docTypeField];
//         const df = formGroup.controls[documentField];


//         const find = await authSrv.getDynamicToPromise(
//             authSrv.collection,
//             [
//                 {field: docTypeField, condition: '==', value: dtf.value},
//                 {field: documentField, condition: '==', value: df.value}
//             ]
//         );
//         console.log('find', find);
//         // return find.length > 0 ? { checkUserDocument: true } : null;
//         return { checkUserDocument: true };
//     }
// }

// export async function CheckUserDocument(
//     authSrv: AuthenticationService, 
//     applyTo: string = 'identification', 
//     docTypeField: string = 'identificationType', 
//     documentField: string = 'identification'
// ){
//     return async (formGroup: FormGroup) => {
//         const dtf = formGroup.controls[docTypeField];
//         const df = formGroup.controls[documentField];
//         const af = formGroup.controls[applyTo];

//         /** Si alguno de los cambos presenta algun error - Retornar para no volver a procesar */
//         if(
//             dtf.errors && !dtf.errors.checkUserDocument
//             || df.errors && !df.errors.checkUserDocument
//         ){
//             return;
//         }

//         const find = await authSrv.getDynamicToPromise(
//             authSrv.collection,
//             [
//                 {field: docTypeField, condition: '==', value: dtf.value},
//                 {field: documentField, condition: '==', value: df.value}
//             ]
//         );
//         console.log('find', find);

//         return find.length > 0 ? af.setErrors({ checkUserDocument: true }) : af.setErrors(null);
//     };
// }