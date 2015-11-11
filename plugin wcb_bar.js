var DISCOUNTAPP = (function() {
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
     ));
         return (matches == null) ? (Date.now()/1000) : matches[1];
 };
 
var paidDate = getCookie('customer-has-paid-orders');
var currentDate = Math.round(Date.now()/1000);
var difer = currentDate - paidDate;
var newHttp = window.location.protocol;
var newURL = window.location.host;
var parsURL = newURL.replace("track.", "");
console.log(parsURL);
var discConfig = {
	'wcb5':{
		"minTime" : 2592000,
		"maxTime" : 5184000,
		"title" : "Good to see you again! Want a paper with 5% off?",
		"button" : "Sure, I’ll Order Now!",
		"gaCode" : "if(typeof(ga)!='undefined')ga('send', 'event', 'discount_heder', 'click', '5%_discount');"
	},
	'wcb7':{
		"minTime" : 5184001,
		"maxTime" : 7776000,
		"title" : "Hey, you’re back! Great! Here’s a special offer for you.",
		"button" : "Order with 7% Off",
		"gaCode" : "if(typeof(ga)!='undefined')ga('send', 'event', 'discount_heder', 'click', '7%_discount');"
	},
	'wcb10':{
		"minTime" : 7776001,
		"maxTime" : 10368000,
		"title" : "We’ve missed you so much! Want a special 10% discount?",
		"button" : "Yes, I Want a Discount!",
		"gaCode" : "if(typeof(ga)!='undefined')ga('send', 'event', 'discount_heder', 'click', '10%_discount');"
	},
	'wcb15':{
		"minTime" : 10368001,
		"maxTime" : Infinity,
		"title" : "Thank God you’re back! A special 15% discount is waiting for you.",
		"button" : "Get My Discount Now!",
		"gaCode" : "if(typeof(ga)!='undefined')ga('send', 'event', 'discount_heder', 'click', '15%_discount');"
	}
};

function currentDiscount(count) {
	for (var n in discConfig) {
		if ( count >= discConfig[n].minTime && count <= discConfig[n].maxTime) {
	        return n;
		}
	}
	return false;
};

function setDiscount(code) {
	document.getElementsByName('discount_top_a')[0].setAttribute("href", newHttp + "//" + parsURL + "/order?discount_code=" + code);
	document.getElementsByName('discount_top_a')[0].setAttribute("onclick", discConfig[code].gaCode);
	document.getElementById('discount_top_p').innerHTML = discConfig[code].title;
	document.getElementById('discount_top_butt').innerHTML = discConfig[code].button;
	document.getElementById('discount_top').style.display = "block";
};
var promoCode = currentDiscount(difer);
if (promoCode !== false) {
		setDiscount(promoCode);
	}
	document.getElementById('close_but').addEventListener("click", function(){
	document.getElementById('discount_top').style.display = "none";
	});
})();