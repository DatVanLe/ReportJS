function myFunction() {
	const x = document.getElementById("selectdl");
	let i = x.selectedIndex;
  	let numB = x.options[i].value;
  	checknumBer(numB);
}
function checknumBer(numB) {
	const li = document.getElementsByTagName("p");
	const leng = li.length;
	let i;
 	if (isNaN(numB) == false) {	
	 	for (i = 0; i < leng; i++) {
	 		li[i].style.display="none";
	   	 	li[numB-1].style.display = "block";
	  	}	
  	}
  	if (numB == "chan") {	
  		for (i = 0; i < leng; i++) {
  			li[i].style.display ="none";
	 		if(i % 2 != 0) {
		   	 	li[i].style.display = "block";
	   	 	}
	  	}
  	}
  	if (numB == "le") {	
  		for (i = 0; i < li.length; i++) {
  			li[i].style.display = "none";
	 		if(i == 0 || i % 2 == 0) {
		   	 	li[i].style.display = "block";
	   	 	}
	  	}
  	}
  	if (numB == "reset") {
  		for (i = 0; i < li.length; i++) {
  			li[i].style.display ="none";	
	  	}
  	}
}
