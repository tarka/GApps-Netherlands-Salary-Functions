
// Calculated the payable tax for a given gross salary for 2011
function nlTaxForSalary2011(salary) {
  if (typeof salary != "number" || salary < 0) {
    return("error: input must be a number");
  }

  // Defined brackets. First number is the top salary for that bracket, the second is the rate.
  var brackets = [[18628, 0.33],
                  [33436, 0.4195],
                  [55694, 0.42],
                  [Number.MAX_VALUE, 0.52]];
  var taxPayable = 0; // Running total of payable tax
  var prevBlockEnd = 0;
  var remainingTaxable = salary;
  
  // Loop through the tax brackets. After each iteration we remove the 
  // taxed amount from the salary. For this reason we also reduce each 
  // bracket by the previous max. End when there's no more salary or brackets.
  for (var i = 0; i < brackets.length; i++) {
    var blockEnd = brackets[i][0], rate = brackets[i][1];

    var end = blockEnd - prevBlockEnd;
    var prevBlockEnd = blockEnd;

    var taxable = (remainingTaxable > end) ? end : remainingTaxable;
    taxPayable += taxable * rate;
    
    remainingTaxable -= taxable;
    if (remainingTaxable <= 0) 
      break;
  }
  
  return taxPayable;
}

// Calculated net salary from the gross. 
function nlNetSalary_2011(gross) {
  return gross - nlTaxForSalary2011(gross);
}

// Calculated net salary from the gross, assuming the 30% rule is in effect. 
function nlNetSalary_w30pcRule_2011(gross) {
  return gross - nlTaxForSalary2011(gross * 0.7);
}
