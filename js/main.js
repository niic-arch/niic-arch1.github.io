//	## main.js



$(document).ready(function() {
	$.getJSON( "backgrounds.json", function(data) {
	  $('#backimgs').cycleInit(data, 4000, 4000)
	});
	
	setTimeout(function() {
		$('#mainPage').css('visibility', 'visible');
		$('#mainPage').css('opacity', 1);
		setTimeout(function() {$('#backimgs').cycleStart()}, 2000);	      
	}, 1000);
})




$(document).keyup(function(e) {
});
