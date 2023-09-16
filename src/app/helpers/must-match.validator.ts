import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

// export function MustMatch(field1: string, field2: string): ValidatorFn {
//     return (control: AbstractControl): ValidationErrors | null => {
//         const formGroup = control.parent as FormGroup;
//         if (!formGroup) { return null; }

//         const f1 = formGroup.controls[field1];
//         const f2 = formGroup.controls[field2];

//         if(f2.errors && !f2.errors.mustMatch) {
//             return null;
//         }

//         if(f1.value !== f2.value) {
//             // f2.setErrors({ mustMatch: true });
//             return { mustMatch: true };
//         }else {
//             // f2.setErrors(null);
//             return null;
//         }
//     };
// }
