function myFunction() {
	const x = document.getElementById("selectdl");
	let i = x.selectedIndex;
  	var numb = x.options[i].value;
  	checkNumber(numb);
}
function checkNumber(numb) {
	const li = document.getElementsByTagName("p");
	const leng = li.length;
	let i;
 	if(isNaN(numb) == false)
 	{	
	 	for (i = 0; i < leng; i++) {
	 		li[i].style.display="none";
	   	 	li[numb-1].style.display = "block";
	  	}	
  	}
  	if(numb == "chan")
  	{	
  		for (i = 0; i < leng; i++) {
  			li[i].style.display ="none";
	 		if(i % 2 != 0)
	 		{
		   	 	li[i].style.display = "block";
	   	 	}
	  	}
  	}
  	if(numb == "le")
  	{	
  		for (i = 0; i < li.length; i++) {
  			li[i].style.display = "none";
	 		if(i == 0 || i % 2 == 0)
	 		{
		   	 	li[i].style.display = "block";
	   	 	}
	  	}
  	}
  	if(numb == "reset")
  	{
  		for (i = 0; i < li.length; i++) {
  			li[i].style.display ="none";	
	  	}
  	}
}
