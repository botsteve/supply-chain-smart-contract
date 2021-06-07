import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function assetIdValidator(): ValidatorFn {
    let idRe: RegExp = /^[0-9]{3}$/i
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = idRe.test(control.value);
      return !forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }