import { AbstractControl, Validators } from "@angular/forms";

export class FormValidator extends Validators{
    public static cpf(control:AbstractControl){
        const cpf = FormValidator.limparCpf(control.value);
        if( [   "00000000000",
                "11111111111",
                "22222222222",
                "33333333333",
                "44444444444",
                "55555555555",
                "66666666666",
                "77777777777",
                "88888888888",
                "99999999999",
            ].includes(cpf)
        ){
            return {repeatedNumber:true}
        }
        
        const cpfNumbers:number[] = cpf.split('').map((e:string)=>Number.parseInt(e) ?? null).filter((e:Number|null) => e !== null && !Number.isNaN(e));
        
        if(cpfNumbers.length !== cpf.length){
            return {invalidPattern:true}
        }
        
        if(cpfNumbers.length < 11 || cpfNumbers.length != 11){
            return {invalidLength:true};
        }

        let firstVerifyDigit  :number    = ((( cpfNumbers[0] * 10 + cpfNumbers[1] * 9 + cpfNumbers[2] * 8 + cpfNumbers[3] * 7 + cpfNumbers[4] * 6 + cpfNumbers[5] * 5 + cpfNumbers[6] * 4 + cpfNumbers[7] * 3 + cpfNumbers[8] * 2 ) * 10) % 11);
        if(firstVerifyDigit == 10){
            firstVerifyDigit = 0;
        }
        const firstVerifyDigitValidator:boolean = firstVerifyDigit == cpfNumbers[9];
        let secondVerifyDigit :number    = ((( cpfNumbers[0] * 11 + cpfNumbers[1] * 10 + cpfNumbers[2] * 9 + cpfNumbers[3] * 8 + cpfNumbers[4] * 7 + cpfNumbers[5] * 6 + cpfNumbers[6] * 5 + cpfNumbers[7] * 4 + cpfNumbers[8] * 3 + cpfNumbers[9] * 2 ) * 10) % 11);
        if(secondVerifyDigit == 10){
            secondVerifyDigit = 0;
        }
        const secondVerifyDigitValidator:boolean = secondVerifyDigit == cpfNumbers[10];

        if(!firstVerifyDigitValidator || !secondVerifyDigitValidator){
            return {validationFailed: true}
        }

        return null;
    }

    public static limparCpf(cpf:string):string{
        return cpf.replace(/\.|-/g,'');
    }
}
