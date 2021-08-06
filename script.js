$(document).ready(function() {
	var flag = true;
	$(document).keyup(function(event) { 
		const kbshift = 16;
		const kbdel = 46;
		if (event.keyCode == kbshift) {
			$('#addform').click();
		}
		if (event.keyCode == kbdel) {
			$('#resetform').click();
		}
	});
	$('#phone').keyup(function() {
		if ($(this).val().length == 3) {
			$(this).val( $(this).val() + "-");
		}
		if ($(this).val().length == 7) {
			$(this).val( $(this).val() + "-");
		}
	});
	$('#birthday').keyup(function() { 
		if ($(this).val().length == 2) {
			$(this).val( $(this).val() + "-" );
		}
		if ($(this).val().length == 5) {
			$(this).val( $(this).val() + "-" );
		}
	});
	$('#name').keyup(function() { 
	 	const fixName = $(this).val().split(" ");
		for (var i = 0; i < fixName.length; i++) {
			fixName[i] = fixName[i].charAt(0).toUpperCase() + fixName[i].slice(1).toLowerCase();
		}
	 	$(this).val(fixName.join(" "));
	});

	$("#files").change(function(e) {
		const output = $('#img');
		const reoutput = $('#reimg');
		output.attr('src', URL.createObjectURL(e.target.files[0]));
		reoutput.attr('src', URL.createObjectURL(e.target.files[0]));
		$("#img").css('display', 'block');	    
		$("#label").text("Change Avartar");		   	    		    	    
	});	
	function checkNull(fieldName, value) {
		const err_text = value.parent().find("span");
		if (value.val() == "") {
			err_text.text("Vui Lòng Nhập " + fieldName);

			return false;
		} else {
			err_text.text("");

			return flag;
		}	
	}
	function checkLength(fieldName, value, min , max) {
		const err_text = value.parent().find("span");
		if (value.val() != "") {
			if (value.val().length < min || value.val().length > max) {
				err_text.text("Vui lòng nhập " + fieldName + " Lớn hơn " + min + " Nhỏ hơn " + max + " ký tự");

				return false;
			}
			return flag;
		}
		return flag;
	}
	function checkRegx(fieldName, value, pattern) {
		const err_text = value.parent().find("span");
		if (value.val() != "") {
			if (value.val().match(pattern)) {
				err_text.text('Vui lòng kiểm tra ký tự đặc biệt + định dạng + qui ước của ' + fieldName);

				return false;
			}
			return flag;
		}
		return flag;
	}
	function checkFormat(fieldName, value, format) {
		const err_text = value.parent().find("span");
		if (value.val() != "") {		
			if (!value.val().match(format)) {
				err_text.text('Vui lòng kiểm tra định dạng của ' + fieldName);

				return false;
			}
			return flag;
		}
		return flag;
	}
	function checkFormatDate(filedName, value) {
		const err_text = value.parent().find("span");
		if (value.val() != "") {
			var d = new Date();
			var year = d.getFullYear();
			var lastDay = new Date(value.val().slice(6), value.val().slice(3,5), 0);
			var date = lastDay.getDate();
			if (value.val().slice(3,5) > 12 || value.val().slice(0,2) > date || value.val().slice(6) >= year) {	
				err_text.text('Xin vui lòng kiểm tra lại ngày tháng năm của ' + filedName);

				return false;
			}
			return flag;
		}
		return flag;
	}
	function checkImg(fieldName, value) {
		const err_text = value.parent().find("span");
		if (value.val() != "") {	
			const Extension = value.val().substring(
	        value.val().lastIndexOf('.') + 1).toLowerCase();
			if (Extension == "png" || Extension == "bmp" || Extension == "jpg") {
				return flag;	
			} else {
				err_text.text("Vui lòng chọn ảnh có đuôi .png .jpg .bmp " + fieldName);

				return false;
			}
		}
		return flag;
	}
	
	$("#addform").click(function() {
		flag = true;
		event.preventDefault();
	// 	//const variable
		const name = $("#name");
		const email = $("#email");
		const phone = $("#phone");
		const birthday = $("#birthday");
		const password = $("#password");
		const repassword = $("#repassword");
		const image = $("#files");
		//check null 
		flag = checkNull("Tên", name);
		flag = checkNull("Email", email);
		flag = checkNull('Phone', phone);
		flag = checkNull('Birthday', birthday);
		flag = checkNull('Password', password);
		flag = checkNull('Repassword', repassword);
		flag = checkNull('Image', image);
		// check length
		flag = checkLength('Họ và Tên', name, 8, 50 );
		flag = checkLength('Email', email, 1, 100);
		flag = checkLength('Password', password, 8, 30);
		//pattern
		const patternName = /[0-9]|[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;	
		const patternPhone = /[a-zA-Z]|[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/g;
		const formatEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const formatPhone = /(^[0][0-9]{2}-[0-9]{3}-[0-9]{4}){1}/;
		const formatPassword = /^[A-Z]{1}[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
		const formatBirthday = /^([0-9]{2})-([0-9]{2})-([0-9]{4})$/;
		// check Regex
		flag = checkRegx('Tên', name, patternName);
		flag = checkRegx('Phone', phone, patternPhone);
		
		//checkformat
		flag = checkFormat('Email', email, formatEmail);
		flag = checkFormat('Phone', phone, formatPhone);
		flag = checkFormat('Password', password, formatPassword);
		flag = checkFormat('BirthDay', birthday, formatBirthday);
		flag = checkFormatDate('BirthDay', birthday);
		flag = checkImg('Images', image);	
		// check repassword
		if (repassword.val() != "" && repassword.val() != password.val()) {
			err_text = repassword.parent().find("span");
			err_text.text('Chưa khớp với password');

			return flag = false;
		}
		// return result
		console.log(flag);
		if (flag) {
			$("#fullname").text(name.val());
			$("#fullemail").text(email.val());
			$("#fullphone").text(phone.val());
			$("#fullbirthday").text(birthday.val());
			$("#reimg").css('display', 'block');
			$("#avatar").css('display', 'none');

			return true;
		} else { 
			return false;
		}
	});
});
