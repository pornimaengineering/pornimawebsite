const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: json
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-green-500");
      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-red-500");
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});

		function solarCalculator() {
			// Size of Power Plant
			var yearly = document.getElementById("energy-consumption").value;
			var daily = yearly/12/30;
			var reqKW = daily/4;
			var losses = reqKW*15/100;
			var totalSize = ceilingMath(reqKW+losses);
			var size = document.getElementById("size");
			size.innerHTML =  "<b>"+totalSize+" kW </b>";
			// Rooftop Area
			var panels = totalSize*1000/540;
			var roofarea = ceilingMath(panels*30);
			var rooftoparea = document.getElementById("rooftoparea");
			rooftoparea.innerHTML =  "<b>"+roofarea+" sqft</b>";
			// Estimated Project Cost
			var perkwcost=0;
			if(totalSize<=3){
				perkwcost=70000;
			}else if(totalSize>3 && totalSize<=10){
				perkwcost=60000;
			}else {
				perkwcost=55000;
			}
			var cost=totalSize*perkwcost;
			var totalcost = document.getElementById("totalcost");
			totalcost.innerHTML =  "<b>Rs. "+cost+" /-</b>";
			// Subsidy
			var subsidy = document.getElementById("subsidy");
			subsidy.innerHTML =  "<b>Rs. 78000 /-</b>";
			// Estimated Consumer Share
			if(totalSize<=2){
				totalSubsidy=30000*totalSize;
			} else if(totalSize==3){
				totalSubsidy=30000*2+18000;
			} else {
				totalSubsidy=78000;
			}
			var consshare=cost-totalSubsidy;
			var consumershare = document.getElementById("consumershare");
			consumershare.innerHTML =  "<b>Rs. "+consshare+" /-</b>";
			
			// Electricity Generation
									
			var genperday = document.getElementById("genperday");
			var perdaygen = ceilingMath(totalSize*4.3);
			genperday.innerHTML =  "<b>"+perdaygen+" kWh/Day</b>";
			
			var genperyear = document.getElementById("genperyear");
			var peryeargen = ceilingMath(perdaygen*365);
			genperyear.innerHTML =  "<b>"+peryeargen+" kWh/Year</b>";
			
			// Financial Savings
			var savingperday = document.getElementById("savingperday");
			if(perdaygen<300){
				var costperday=ceilingMath(perdaygen*8);;
			}else{
				var costperday=ceilingMath(perdaygen*13.5);
			}
			savingperday.innerHTML =  "<b>Rs. "+costperday+" /Day</b>";
			
			var savingpermonth = document.getElementById("savingpermonth");
			var costpermonth=ceilingMath(costperday*30);
			savingpermonth.innerHTML =  "<b>Rs. "+costpermonth+" /Month</b>";
			
			var savingperyear = document.getElementById("savingperyear");
			var costperyear=ceilingMath(costperday*365);
			savingperyear.innerHTML =  "<b>Rs. "+costperyear+" /Year</b>";
			// Emission Savings (in 25 years)
			var genlifetime = peryeargen*25;
			var emm=ceilingMath(genlifetime*0.001);
			var emmsaving = document.getElementById("emmsaving");
			emmsaving.innerHTML =  "<b>"+emm+" Tonne Co2</b>";
			// Payback Period
			var monthlybill = document.getElementById("electricity-bill").value;
			var months = cost/monthlybill;
			var paybackyears = ceilingMath(months/12);
			var paybacktime = document.getElementById("paybacktime");
			paybacktime.innerHTML =  "<b>"+paybackyears+" Years</b>";
			// Return on Investment
		};
		
		function ceilingMath(number, significance = 1, mode = 0) {
			// Ensure significance is positive for simplicity
			significance = Math.abs(significance);
			
			if (number >= 0) {
				// For positive numbers or zero, round up to the nearest multiple of significance
				return Math.ceil(number / significance) * significance;
			} else {
				if (mode === 0) {
					// For negative numbers and mode 0, round up away from zero
					return Math.ceil(number / significance) * significance;
				} else {
					// For negative numbers and mode not 0, round up towards zero
					return Math.floor(number / significance) * significance;
				}
			}
		}
