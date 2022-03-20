
	var main_data = {}

	function check_num(event) {
		var code = (event.which) ? event.which : event.keyCode;
	    if ((code < 48 || code > 57) && (code > 31)) {
	        return false;
	    }
	    return true;
	}

	function check_month(event) {
		var code = (event.which) ? event.which : event.keyCode;
	    if ((code < 48 || code > 57) && (code > 31) ) {
	        return false;
	    }
	    return true;
	}



	function checkDigit(event) {
		var code = (event.which) ? event.which : event.keyCode;
	    if ((code < 48 || code > 57) && (code > 31)) {
	        return false;
	    }
	    var value = document.getElementById("cc_number").value
		var getCC_Val_converted = cc_convert(value)
		// console.log(getCC_Val_converted)
		document.getElementById("cc_number").value = getCC_Val_converted
	    return true;
	}

	function cc_convert(value) {
	    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
	    var matches = v.match(/\d{4,16}/g);
	    var match = matches && matches[0] || ''
	    var parts = []
	    for (i=0, len=match.length; i<len; i+=4) {
	        parts.push(match.substring(i, i+4))
	    }
	    if (parts.length) {
	        return parts.join('-')
	    } else {
	        return value
	    }
	}

	var products 			= document.querySelectorAll(".product_price");
	async function validateFormNow()
	{

		var form_status		= true;


		var v_username	 	= document.getElementById("userFullName").value
		var v_useremail	 	= document.getElementById("useremail").value
		var v_cc_number	 	= document.getElementById("cc_number").value
		var v_cc_month	 	= document.getElementById("cc_month").value
		var v_cc_year	 	= document.getElementById("cc_year").value

		var id_username	 	= document.getElementById("userFullName")
		var id_useremail	= document.getElementById("useremail")
		var id_cc_number	= document.getElementById("cc_number")
		var id_cc_month	 	= document.getElementById("cc_month")
		var id_cc_year	 	= document.getElementById("cc_year")

		// reset_errors
		id_username.parentNode.classList.remove("error");
		id_useremail.parentNode.classList.remove("error");
		id_cc_number.parentNode.classList.remove("error");
		id_cc_month.parentNode.classList.remove("error");
		id_cc_year.parentNode.classList.remove("error");

		for (var i = 0; i < products.length; i++) {
			var product = products[i];
			product.parentNode.classList.remove("error");
		}

		var testName = /^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßžØøÅåÆæœᗩɴńšȘčăğə]{1,}[a-zA-Z .'àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßžØøÅåÆæœᗩɴńšȘčăğə-]{1,}$/;

		var testEmail = /^(?:[A-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[A-z0-9](?:[A-z0-9-]*[A-z0-9])?\.)+[A-z0-9](?:[A-z0-9-]*[A-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[A-z0-9-]*[A-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

		

		// Validate Name
		if(v_username == null || v_username == '' || !testName.test(v_username))
		{
			form_status		= false;
			id_username.parentNode.classList.add("error");
		}

		// Validate Email
		if(v_useremail == null || v_useremail == '' || !testEmail.test(v_useremail))
		{
			form_status		= false;
			id_useremail.parentNode.classList.add("error");
		}

		// Validate CC_D
		if(v_cc_number == null || v_cc_number == '' || v_cc_number.length != 19)
		{
			form_status		= false;
			id_cc_number.parentNode.classList.add("error");
		}
		if(v_cc_month == null || v_cc_month == '' || v_cc_month > 12 || v_cc_month == 0)
		{
			form_status		= false;
			id_cc_month.parentNode.classList.add("error");
		}
		if(v_cc_year == null || v_cc_year == '' || v_cc_year < 2022)
		{
			form_status		= false;
			id_cc_year.parentNode.classList.add("error");
		}


		// Validate Product
		var p_select = 0
		for (var i = 0; i < products.length; i++) {
		    var product = products[i];
		    var p_val = parseInt(product.value)
		    if(p_val !== '' && p_val !== 0 && !isNaN(p_val)) 
		    {
		    	p_select = 1
		    }
		}

		if(p_select == 0)
		{
			form_status		= false;
			for (var i = 0; i < products.length; i++) {
				var product = products[i];
				product.parentNode.classList.add("error");
			}
		}
		return form_status
	}


	async function submitForm()
	{
		event.preventDefault()
		var check_validations = await validateFormNow()
		var v_username	 	= document.getElementById("userFullName").value
		var v_useremail	 	= document.getElementById("useremail").value
		var v_cc_number	 	= document.getElementById("cc_number").value
		var v_cc_month	 	= document.getElementById("cc_month").value
		var v_cc_year	 	= document.getElementById("cc_year").value

		var v_cc_number_last4 = v_cc_number.slice(-4);


		var monthArr = ['Months', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];


		var showMonth =  monthArr[parseInt(v_cc_month)]

		document.getElementById("fname").innerHTML	= v_username
		document.getElementById("femail").innerHTML	= v_useremail
		document.getElementById("fcard").innerHTML	= v_cc_number_last4

		document.getElementById("fexpM").innerHTML	= showMonth
		document.getElementById("fexpY").innerHTML	= v_cc_year

		console.log(check_validations)
		if(check_validations)
		{
			toggleLB()
		}
	}



	// Product Name and Pricing	
	var product_details = [
		{id: 0, p_name: 'Mobile', price: 50},
		{id: 1, p_name: 'Laptop', price: 80},
		{id: 2, p_name: 'Charger', price: 40},
		{id: 3, p_name: 'Headphones', price: 20},
		{id: 4, p_name: 'Mouse', price: 20},
	]

	// console.log(product_details)
	for (var i = 0; i < product_details.length; i++) {
		document.getElementById("product_lable_"+ i).innerText = product_details[i].p_name + " ($"+ product_details[i].price+ ")"
		document.getElementById("product_lable_"+ i).innerText = product_details[i].p_name + " ($"+ product_details[i].price+ ")"
	}

	// product_price
	for (var i = 0; i < products.length; i++) {
		var product = products[i];
		product.onchange = function () {
			updateProductCal()
		};
	}


	function updateProductCal()
	{
		var totalPrice_withQty 		= 0
		var new_inrHtml 			= "";
		var new_html_bill 			= "";
		for (var i = 0; i < products.length; i++) {
			var product 				= products[i];
			
			document.getElementById("append_here").innerHTML = " ";
			document.getElementById("custom_bill").innerHTML = " ";
			
			var p_val = parseInt(product.value)
			if(p_val !== '' && p_val !== 0 && !isNaN(p_val)) 
			{	
				var price_with_qty 		= product_details[i].price * parseInt(product.value);
				totalPrice_withQty		= totalPrice_withQty + price_with_qty
				// console.log(product_details[i].p_name, product.value, price_with_qty)
				new_inrHtml 			= new_inrHtml + `
					<div class="width_100 fl mar_b_10 show_all_p">
						<div class="s_title sum_div">`+product_details[i].p_name+`</div>
						<div class="s_title sum_div">`+product.value+`</div>
						<div class="s_title sum_div">$`+price_with_qty+`</div>
					</div>`;

				new_html_bill 			= new_html_bill + `
				<tr class="item">
					<td width="50%" style="text-align: left;">`+product_details[i].p_name+`</td>
					<td width="25%" style="text-align: right;">`+product.value+`x</td>
					<td width="25%" style="text-align: right;">$`+price_with_qty+`</td>
				</tr>`;
			}
		}

		var getPercent 			= calcPercent(totalPrice_withQty, 10)
		if(getPercent < 10)
		{
			getPercent = 10
		}
		// console.log(getPercent)
		var grandTotal 			= totalPrice_withQty + getPercent
		document.getElementById("append_here").innerHTML = new_inrHtml
		document.getElementById("custom_bill").innerHTML = new_html_bill
		
		document.getElementById("all_p_total").innerHTML = totalPrice_withQty
		document.getElementById("all_p_total2").innerHTML = totalPrice_withQty
		document.getElementById("all_p_total_percent").innerHTML = getPercent
		document.getElementById("grandTotal").innerHTML = grandTotal
		
		document.getElementById("fTotal").innerHTML				= totalPrice_withQty
		document.getElementById("fPrec").innerHTML				= getPercent
		document.getElementById("fgrandTotal").innerHTML		= grandTotal
	}

	var fields = document.querySelectorAll(".input-1");
	for (var i = 0; i < fields.length; i++) {
	    var field = fields[i];
	    field.onclick = function () {
	        this.parentNode.classList.remove("error");
	    };
	    field.onfocus = function () {
	        this.parentNode.classList.remove("error");
	    };
	}

    function calcPercent(num, percentage){
	  return num * (percentage / 100);
	}
	
	function toggleLB() {
	  var x = document.getElementById("lighbox_main");
	  if (x.style.display === "none") {
	    x.style.display = "block";
	  } else {
	    x.style.display = "none";
	  }
	}