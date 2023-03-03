
function dependancyBonus(rate, childU18, childO18, aa, spouse ){
    let resultU = 0;
    let result = 0;
    let final = 0;
    console.log(rate, childU18, childO18, aa, spouse);

     for (let x in rating_bonus){
         if(rate == x){
             for( let y in rating_bonus[x]){
                if (aa == 'yes' && spouse == 'married'){
                    result += rating_bonus[x][y].AA;
                    console.log(result)
                  }
                  
                //only children under 18
                 if(childU18 >= 1  && childO18 >= 0){
                     resultU = resultU + ((childU18 - 1) * rating_bonus[x][y].U18Rate); 
                    // console.log("a:" + resultU);
                 }
                 //combined chilfren u18 and over 18
                if(childO18 >= 1  && childU18 > 1){
                     result = result + ((childO18)  * rating_bonus[x][y].O18Rate);  
                    // console.log("b:" + result)
                     return result + resultU;
                   }
                  //Only Child over 18                
                if(childO18 == 1  && childU18 == 0){
                    //console.log("c:" + result)
                    return result + resultU;
                  }
                  //More than Children over 18
                  if(childO18 > 1  && childU18 == 0){
                    result = result + ((childO18 - 1)  * rating_bonus[x][y].O18Rate);  
                    //console.log( "d:"  + result)
                    return result + resultU;
                  }
                  //Only one Child under 18 and multiple children over 18
                  if(childO18 >= 1  && childU18 >= 1){
                    result = result + ((childO18)  * rating_bonus[x][y].O18Rate);  
                    //console.log( "e:" + result)
                    return result + resultU;
                  }
                   

            
             }

            }
     }

     return result + resultU;
 }

function genterateRatePay(rate){
    let result = 0;

    for(let x in disa_pert){
        if(rate == x){
            result = disa_pert[x];
        }
    } 
    return result;
}

function dependancyPay(rate, spouse, child, parent){
    let result = 0;
    for (let x in DP) {
        if (rate == x ) {
            for (let y in DP[x]) {
                if(DP[x][y].hasSpouse == spouse && DP[x][y].hasChild == child && DP[x][y].hasParent == parent){
                    result = DP[x][y].monthlypay;
                    //console.log(result)
                }
            }
        }
      }

      return result;
}

function runOnStart(){
    var marriage =document.getElementById("maritalStat");

    var AandA = document.getElementById("AnA");
    // when client clicked on select element 
    marriage.addEventListener("click", () => {
        // if default value is changed
        marriage.addEventListener("change", () => {
          // if value switched by client
            switch (marriage.value) {
              case "married":
              //do somthing with  , "add" value
              AandA.style.display = '';
                break;  // then take break
              case "single":
              //do somthing with  , "remove" value
              AandA.style.display = 'none';
                break; // then take break
            }
          });
        });
}

document.addEventListener("DOMContentLoaded", function (event) {
    if(document.readyState !== 'loading') {
        runOnStart();
    }
})

function createFig(total, ptotal,months){
    if(months > 1  ){
        return ((ptotal - total) * months);
    }if (months == 1){
        return (ptotal - total);
    }

}

function generateRating(){
    event.preventDefault()
    let currentRate = document.getElementById('current-rate').value;
    let potentialRate = document.getElementById('potentialRate').value;
    let hasSpouse = document.getElementById('maritalStat').value;
    let childU18 = document.getElementById('childU18').value;
    let childO18 = document.getElementById('childO18').value;
    let dependParent = document.getElementById('dependParent').value;
    let aid = document.getElementById('aid').value;  
    let hc = 'no'; 
    let backPayMonth = document.getElementById('backPay').value;

    //finds if there is a child
    if (childU18 > 0 || childO18 > 0){
        hc = 'yes';
   }
   // Current Rate
   const bonusRate = dependancyBonus(currentRate, childU18, childO18, aid, hasSpouse );
   const ratePay = genterateRatePay(currentRate); 
   const dependantRate =dependancyPay(currentRate, hasSpouse, hc, dependParent); 
   
   // Potenial Rate
   const potentbonusRate = dependancyBonus(potentialRate, childU18, childO18, aid, hasSpouse)
  //console.log(potentbonusRate)
   const potentPay = genterateRatePay(potentialRate);
   const potentdependantRate =dependancyPay(potentialRate, hasSpouse, hc, dependParent); 


   let total = (bonusRate + ratePay +dependantRate);
   let pot_total = (potentbonusRate + potentPay + potentdependantRate);


   let bpRate = createFig(total, pot_total ,backPayMonth);


   document.getElementById("curr-rate").innerHTML = total.toLocaleString("en-US", {style:"currency", currency:"USD"});
   document.getElementById("pot-rate").innerHTML =  pot_total.toLocaleString("en-US", {style:"currency", currency:"USD"});
   document.getElementById("diff-rate").innerHTML =  (pot_total - total).toLocaleString("en-US", {style:"currency", currency:"USD"});

   document.getElementById("monthly-rate").innerHTML = (total).toLocaleString("en-US", {style:"currency", currency:"USD"});
   document.getElementById("sixMonth-rate").innerHTML = (total*6).toLocaleString("en-US", {style:"currency", currency:"USD"});
   document.getElementById("year-rate").innerHTML = (total*12).toLocaleString("en-US", {style:"currency", currency:"USD"});
   document.getElementById("year5-rate").innerHTML =  (total*60).toLocaleString("en-US", {style:"currency", currency:"USD"});
   document.getElementById("year10-rate").innerHTML =  (total*120).toLocaleString("en-US", {style:"currency", currency:"USD"});
   
   document.getElementById("pot_monthly-rate").innerHTML = (pot_total).toLocaleString("en-US", {style:"currency", currency:"USD"});
   document.getElementById("pot_sixMonth-rate").innerHTML = (pot_total * 6).toLocaleString("en-US", {style:"currency", currency:"USD"});
   document.getElementById("pot_year-rate").innerHTML = (pot_total*12).toLocaleString("en-US", {style:"currency", currency:"USD"});
   document.getElementById("pot_year5-rate").innerHTML =  (pot_total*60).toLocaleString("en-US", {style:"currency", currency:"USD"});
   document.getElementById("pot_year10-rate").innerHTML =  (pot_total*120).toLocaleString("en-US", {style:"currency", currency:"USD"});
   
   document.getElementById("diff_monthly-rate").innerHTML = (pot_total - total).toLocaleString("en-US", {style:"currency", currency:"USD"});
   document.getElementById("diff_sixMonth-rate").innerHTML = ((pot_total* 6) - (total * 6)).toLocaleString("en-US", {style:"currency", currency:"USD"});
   document.getElementById("diff_year-rate").innerHTML = ((pot_total* 12) - (total * 12)).toLocaleString("en-US", {style:"currency", currency:"USD"});
   document.getElementById("diff_year5-rate").innerHTML =  ((pot_total* 60) - (total * 60)).toLocaleString("en-US", {style:"currency", currency:"USD"});
   document.getElementById("diff_year10-rate").innerHTML =  ((pot_total* 120) - (total * 120)).toLocaleString("en-US", {style:"currency", currency:"USD"});
}

function printPDF(){  
    const invoice = document.getElementById("printJS-form");
    console.log(invoice);
    var opt = {
        margin: [0, 0, 0.15, 0],
        filename: 'test.pdf',
        image:{ type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2,
          scrollX: 0,
          scrollY: 0 },
          pagebreak: { mode: ['avoid-all','legacy', 'css'], avoid: ['tr, css'] },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait', Size: 50 },
      };
      html2pdf().from(invoice).set(opt).save();
      html2pdf().from(invoice).set(opt).toPdf().get('pdf').then(function (pdfObj) {
 
         pdfObj.autoPrint();
         window.open(pdfObj.output('bloburl'), '_blank');
     });
  
  }