import * as readline from 'node:readline/promises';
import{stdin as input, stdout as output} from 'node:process';
const userInput = readline.createInterface({input, output});

let mand = [];
let geschenkmand = []
let grootte;
do {
    grootte = parseFloat(await userInput.question("Hoe groot is de geschenkmand (3 - 20)? "));
    if (isNaN(grootte)) {
        console.log("Geen nummer. Probeer opnieuw.");
    } else if (grootte < 3 || grootte > 20) {
        console.log("De grootte van de geschenkmand is fout. Probeer opnieuw.");
    }
} while (isNaN(grootte) || grootte < 3 || grootte > 20);

async function vulGeschenkmand() {
    for (let i = 0; i < grootte; i++){
        let keuze;
        let geschenk;
        do {         
            keuze = (await userInput.question("Welk geschenk kies je? (keuze: W, B, F) ")).toUpperCase();
            if (Math.random() < 0.1) {
                console.log("Je hebt een geschenk gewonnen!");
                geschenk = true
            }
        
            
            switch (keuze) {

                case 'W':
                    mand.push('Wijn');
                    if (geschenk == true){
                        geschenkmand.push('Wijn')
                    };
                    break;

                case 'B':
                    mand.push('Bier');
                    if (geschenk == true){
                        geschenkmand.push('Bier')
                    };
                    break;

                case 'F':
                    mand.push('Fruitsap');
                    if (geschenk == true){
                        geschenkmand.push('Fruitsap')
                    };
                    break;

                default:
                    console.log('Foutieve invoer, probeer opnieuw...');
                    keuze = false;
            }
        } while (!keuze);
    }
}

function berekenTotaal(){
    let totaal = 0;
    
    for (let i = 0 ; i < grootte; i++){
        
        switch (mand[i]){

            case 'Bier':
                totaal += 2
                break;
            
            case 'Wijn':
                totaal += 10
                break;

            case 'Fruitsap':
                totaal += 3
                break;

            default:     
        }
        switch (geschenkmand[i]){

            case 'Bier':
                totaal -= 2
                break;
            
            case 'Wijn':
                totaal -= 10
                break;

            case 'Fruitsap':
                totaal -= 3
                break;

            default:      
        }
    } return totaal;
}

function berekenTotaalBTW(){
    let totaalBTW = 0;
    
    for (let i = 0 ; i < grootte; i++){
        
        switch (mand[i]){

            case 'Bier':
                totaalBTW += (2 + (2/100) * 6)
                break;
            
            case 'Wijn':
                totaalBTW += (10 + (10/100) * 21)
                break;

            case 'Fruitsap':
                totaalBTW += (3 + (3/100)* 12)
                break;

            default:
       
        }
        switch (geschenkmand[i]){

            case 'Bier':
                totaalBTW -= (2 + (2/100) * 6)
                break;
            
            case 'Wijn':
                totaalBTW -= (10 + (10/100) * 21)
                break;

            case 'Fruitsap':
                totaalBTW -= (3 + (3/100)* 12)
                break;

            default:
       
        }
    } return totaalBTW;
}

await vulGeschenkmand();

console.log('De waarde van je mand is: ' + berekenTotaal(mand) + ' Euro.' );
console.log('Inclusief BTW is dit: ' + berekenTotaalBTW(mand).toFixed(2) + ' Euro.');
process.exit();

 