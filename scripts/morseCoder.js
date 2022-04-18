export class morseCoder {
    static codes;
    
    static textToSymbolic(text) {
        var appendix;
        var code = text.toLowerCase().split('');
        for (let i = 0; i < code.length; i++) {
            if ((code[i] == ' ') || (code[i+1] == ' ') || (i == code.length - 1)) {
                appendix = '';
            } else {
                appendix = '   '
            }
            code[i] = this.codes.symbolic[code[i]] + appendix;
        }
        return code.join('');
    }
    
    static textToDigital(text) {
        var appendix;
        var code = text.toLowerCase().split('');
        for (let i = 0; i < code.length; i++) {
            if ((code[i] == ' ') || (code[i+1] == ' ') || (i == code.length - 1)) {
                appendix = '';
            } else {
                appendix = '000'
            }
            code[i] = this.codes.digital[code[i]] + appendix;
        }
        return code.join('');
    }
    
}

fetch('../assets/data/morseCodes.json').then((response)=> {
    response.json().then((data) => {
        morseCoder.codes = data;
    }).catch(alert);
}).catch(alert);