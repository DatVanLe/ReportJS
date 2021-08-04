document.onkeyup = function(event){
	const kbshift = 16;
	const kbdel = 46;
	if(event.keyCode == kbshift)
	{
		document.getElementById('addform').click();
	}
	if(event.keyCode == kbdel)
	{
		document.getElementById('resetform').click();
	}
}
function inputphone(input){
	if(input.value.length == 3)
	{
		input.value = input.value + "-";
	}
	if(input.value.length == 7)
	{
		input.value = input.value + "-";
	}
}
function upfunction(input){
	// let input=document.getElementById("input");	
	input.value = input.value.replace(/\w\S*/gi, function(letter) {
   		return letter.charAt(0).toUpperCase() + letter.slice(1).toLowerCase();
  	});
}
function inputbd(input){
	if(input.value.length == 2)
	{
		input.value = input.value + "-";
	}
	if(input.value.length == 5)
	{
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
function getvalue(name)
{
	return document.getElementById(name).value;
}
var err = [];
function check_null(name, value)
{	
	if(value == "")
	{
		err.push('Vui lòng nhập ' + name);
	}
}
function check_length(name, value, min , max)
{
	if((value > 0 && value < min) || value > max)
	{
		err.push('Vui lòng nhập ' + name + ' lớn hơn ' + min + ' nhỏ hơn ' + max + ' ký tự');
	}
}
function check_regx(name, value, pattern)
{
	if(value.match(pattern))
	{
		err.push('Vui lòng kiểm tra ký tự đặc biệt + định dạng + qui ước của ' + name );
	}
}
function check_format(name, value, format)
{
	if(value != "" && !value.match(format))
	{
		err.push('Vui lòng kiểm tra định dạng của ' + name );
	}
}
function func_validate(){
	event.preventDefault();
	err = [];
	//name
	const name = getvalue('name');
	const length_name = getvalue('name').length;
	const pattern_name = /[0-9]|[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
	check_null('Tên',name);	
	check_length('Tên', length_name, 8, 50);
	check_regx('Tên', name, pattern_name);
	//email
	const email = getvalue('email');
	const length_email = getvalue('email').length;
	const format_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	check_null('Email', email);
	check_length('Email', length_email, 8, 100);
	check_format('Email', email, format_email);
	//phone
	const phone = getvalue('phone');
	const pattern_phone = /[a-zA-Z]|[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/g;
	const format_phone = /^0[0-9]{2}-[0-9]{3}-[0-9]{4}/;
	check_null('Phone', phone);
	check_regx('Phone', phone, pattern_phone);
	check_format('Phone', phone, format_phone);
	//birthday
	const birthday = getvalue('birthday');
	const format_birthday = /^([0-9]{2})-([0-9]{2})-([0-9]{4})$/;
	check_null('BirthDay', birthday);
	check_format('BirthDay', birthday, format_birthday);
	var d = new Date();
	var year = d.getFullYear();
	var lastDay = new Date(birthday.slice(6), birthday.slice(3,5), 0);
	var date = lastDay.getDate();
	if(birthday.slice(3,5) > 12 || birthday.slice(0,2) > date || birthday.slice(6) >= year)
	{	
		err.push('Xin vui lòng kiểm tra lại ngày tháng năm');
	}
	//password
	const password = getvalue('password');
	const length_password = getvalue('password').length;
	const format_password = /^[A-Z]{1}[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
	check_null('Password', password);
	check_length('Password', length_password, 8, 30);
	check_format('Password', password, format_password);
	//repassword
	const repassword = getvalue('repassword');
	check_null('Repassword', repassword);
	if(repassword != "" && repassword != password)
	{
		err.push('Chưa khớp với password');
	}
	//img
	const img = getvalue('files');
	check_null('IMG', img);
	if(img != "")
	{
		const Extension = img.substring(
        img.lastIndexOf('.') + 1).toLowerCase();
		if(Extension == "png" || Extension == "bmp" || Extension == "jpg")
		{	
		}else{
			err.push("Vui lòng chọn ảnh có đuôi .png .jpg .bmp");
		}
	}
	//no err
	if(err != "")
	{	
		let txt = "<ul>";
		for(let i in err)
		{
			txt += "<li>" + err[i] + " " + "</li>" + "<br>";
		}
		document.getElementById("err").innerHTML = txt;
		txt += "</ul>";
		event.preventDefault();
	}
	if(err == "")
	{
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
