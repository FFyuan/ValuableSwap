/**
 *
 * Created by Yuan on 5/16/16.
 */

import { Control } from "angular2/common";

interface ValidationResult{
    [key:string]:boolean;
}

export class ValidatorService {

    static startsWithNumber(control: Control): ValidationResult {

        if ( control.value !="" && !isNaN(control.value.charAt(0)) ){
            return {"startsWithNumber": true};
        }

        return null;
    }

    static usernameTaken(control: Control): Promise<ValidationResult> {

        return new Promise((resolve, reject) => {

        });

    }
}
