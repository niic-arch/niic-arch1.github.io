jQuery.fn.extend({
	addClassDelayed: function(c, i, random) {
		if (random) {
			this.each(function() {
				setTimeout(function() {$(this).addClass(c)}.bind(this), Math.random()*i);
			})
		} else {
			setTimeout(function() {$(this).addClass(c)}.bind(this), i);
		}
	}
})


jQuery.fn.extend({
	removeClassDelayed: function(c, i, random) {
		if (random) {
			this.each(function() {
				setTimeout(function() {$(this).removeClass(c)}.bind(this), Math.random()*i);
			})
		} else {
			setTimeout(function() {$(this).removeClass(c)}.bind(this), i);
		}
	}
})



jQuery.fn.extend({
	fullSelector: function() {
		var selector = "";
		
		var pid = $(this).parent().attr("id");
		if (pid) { 
			selector += "#"+ pid;
		}
		
		var pClassNames = $(this).parent().attr("class");
		if (pClassNames) {
			selector += "." + $.trim(pClassNames).replace(/\s/gi, ".");
		}
		
		selector += " ";
		
		var id = $(this).attr("id");
		if (id) { 
			selector += "#"+ id;
		}
		
		var classNames = $(this).attr("class");
		if (classNames) {
			selector += "." + $.trim(classNames).replace(/\s/gi, ".");
		}
		
		return selector;
	}
});


jQuery.fn.extend({
	fadeToImg: function(src, duration) {
		if (typeof(duration) == 'undefined') {
			d = 1000;
		} else {
			d = duration;
		}
		
		$(this).clone().insertAfter(this).addClass('temp');
		$('<img>').appendTo(this).load(src, function() {
			$(this).parent().css('background-image', 'url('+src+')');
			$(this).parent().fadeIn(d);
			$($(this).parent().fullSelector()+'.temp').fadeOut(d, function() {
				$(this).remove();
			})
			$(this).remove();
		})
	}
})

jQuery.fn.extend({
	cycleInit: function(imgs, intv, fad) {
		return this.each(function() {
			this.images = imgs;
			this.interval = intv;
			this.fade = fad;
			
			this.current = -1;
		})
	},
	cycleStop: function() {
		return this.each(function() {
			clearInterval(this.loop);
			$(this).fadeOut(2000);
		})
	},
	cyclePause: function() {
		return this.each(function() {
			clearInterval(this.loop);
			
		})
	},
	cycleStart: function() {
		return this.each(function() {
			$(this).fadeIn(this.fade)
			$(this).cycleNext();
			
			this.loop = setInterval(function() {
				$(this).cycleNext();				
			}.bind(this), this.interval);
		})
	},
	cycleNext: function() {
		return this.each(function() {
			this.current++;

			if (this.current === this.images.length) {
				$(this).cycleStop();
			} else {			
				$(this).fadeToImg(this.images[this.current], this.fade)
			}
		})
	}
})