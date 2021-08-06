document.onkeyup = function(event) {
	const kbshift = 16;
	const kbdel = 46;
	if (event.keyCode == kbshift) {
		document.getElementById('addform').click();
	}
	if (event.keyCode == kbdel) {
		document.getElementById('resetform').click();
	}
}
function inputPhone(input) {
	if (input.value.length == 3) {
		input.value = input.value + "-";
	}
	if (input.value.length == 7) {
		input.value = input.value + "-";
	}
}
function upFunction(input) {
	// let input=document.getElementById("input");	
	input.value = input.value.replace(/\w\S*/gi, function(letter) {
   		return letter.charAt(0).toUpperCase() + letter.slice(1).toLowerCase();
  	});
}
function inputBd(input) {
	if (input.value.length == 2) {
		input.value = input.value + "-";
	}
	if (input.value.length == 5) {
		input.value = input.value + "-";
	}
}
function change(event) {
	const output = document.getElementById('img');
	const reoutput = document.getElementById('reimg');
	output.src = URL.createObjectURL(event.target.files[0]);
	reoutput.src = URL.createObjectURL(event.target.files[0]);
	document.getElementById("img").style.display = "block";	    
	document.getElementById("label").innerHTML = "Change Avartar";		   	    		    	    
};
function getValue(name) {
	return document.getElementById(name).value;
}
var err = [];
function checkNull(name, value) {	
	if (value == "") {
		err.push('Vui lòng nhập ' + name);
	}
}
function checkLength(name, value, min , max) {
	if ((value > 0 && value < min) || value > max) {
		err.push('Vui lòng nhập ' + name + ' lớn hơn ' + min + ' nhỏ hơn ' + max + ' ký tự');
	}
}
function checkRegx(name, value, pattern) {
	if (value.match(pattern)) {
		err.push('Vui lòng kiểm tra ký tự đặc biệt + định dạng + qui ước của ' + name);
	}
}
function checkFormat(name, value, format) {
	if (value != "" && !value.match(format)) {
		err.push('Vui lòng kiểm tra định dạng của ' + name);
	}
}
function checkFormatDate(name, value) {
	var d = new Date();
	var year = d.getFullYear();
	var lastDay = new Date(value.slice(6), value.slice(3,5), 0);
	var date = lastDay.getDate();
	if (value.slice(3,5) > 12 || value.slice(0,2) > date || value.slice(6) >= year) {	
		err.push('Xin vui lòng kiểm tra lại ngày tháng năm của ' + name);
	}
}
function checkImg(name, value) {
	if (value != "") {
		const Extension = value.substring(
        value.lastIndexOf('.') + 1).toLowerCase();
		if (Extension == "png" || Extension == "bmp" || Extension == "jpg") {	
		} else {
			err.push("Vui lòng chọn ảnh có đuôi .png .jpg .bmp " + name);
		}
	}
}
function funValiDate() {
	event.preventDefault();
	err = [];
	//name
	const name = getValue('name');
	const length_name = getValue('name').length;
	const pattern_name = /[0-9]|[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
	checkNull('Tên',name);	
	checkLength('Tên', length_name, 8, 50);
	checkRegx('Tên', name, pattern_name);
	//email
	const email = getValue('email');
	const length_email = getValue('email').length;
	const format_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	checkNull('Email', email);
	checkLength('Email', length_email, 8, 100);
	checkFormat('Email', email, format_email);
	//phone
	const phone = getValue('phone');
	const pattern_phone = /[a-zA-Z]|[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/g;
	const format_phone = /^0[0-9]{2}-[0-9]{3}-[0-9]{4}/;
	checkNull('Phone', phone);
	checkRegx('Phone', phone, pattern_phone);
	checkFormat('Phone', phone, format_phone);
	//birthday
	const birthday = getValue('birthday');
	const format_birthday = /^([0-9]{2})-([0-9]{2})-([0-9]{4})$/;
	checkNull('BirthDay', birthday);
	checkFormat('BirthDay', birthday, format_birthday);
	checkFormatDate('BirthDay', birthday);
	//password
	const password = getValue('password');
	const length_password = getValue('password').length;
	const format_password = /^[A-Z]{1}[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
	checkNull('Password', password);
	checkLength('Password', length_password, 8, 30);
	checkFormat('Password', password, format_password);
	//repassword
	const repassword = getValue('repassword');
	checkNull('Repassword', repassword);
	if (repassword != "" && repassword != password) {
		err.push('Chưa khớp với password');
	}
	// //img
	const img = getValue('files');
	checkNull('IMG', img);
	checkImg('Avartar', img);
	//no err
	if (err != "") {	
		let txt = "<ul>";
		for(let i in err)
		{
			txt += "<li>" + err[i] + " " + "</li>" + "<br>";
		}
		document.getElementById("err").innerHTML = txt;
		txt += "</ul>";
		event.preventDefault();
	} 
	else {
		document.getElementById("fullname").innerHTML = name;
		document.getElementById("fullemail").innerHTML = email;
		document.getElementById("fullphone").innerHTML = phone;
		document.getElementById("fullbirthday").innerHTML = birthday;
		document.getElementById("reimg").style.display = "block";
		document.getElementById("avatar").style.display = "none";
		document.getElementById("err").innerHTML = "";
		event.preventDefault();
	}	
}
