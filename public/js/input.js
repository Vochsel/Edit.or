var Input = {
	Mouse : {
		x : 0,
		y : 0,
		lx : 0,
		ly : 0,
		dx : 0,
		dy : 0,
		scroll: 1,
		scrollDelta: 0,
		leftClick: false,
		rightClick: false,
		middleClick: false
	},
	setup: function(dom) {
		//Mouse movement
		dom.onmousemove = function(e) {
			Input.Mouse.x = -e.screenX / 500;
			Input.Mouse.y = e.screenY / 500;
		}
		//Mouse scroll
		dom.addEventListener("mousewheel", function(e) {
		  Input.Mouse.scrollDelta = -e.wheelDelta / 5000;
		  Input.Mouse.scroll += Input.Mouse.scrollDelta;
		  Input.Mouse.scroll = Math.max(Input.Mouse.scroll, 0.2);
		  //console.log(Input.Mouse.scroll);
		});

		//Mouse button
		window.addEventListener("mousedown", function(e) {
			switch(e.button)
			{
				case 0:
					Input.Mouse.leftClick = true;
					break;
				case 1:
					Input.Mouse.middleClick = true;
					break;
				case 2:
					e.preventDefault();
					Input.Mouse.rightClick = true;
					break;
			}
		});

		window.addEventListener("mouseup", function(e) {
			switch(e.button)
			{
				case 0:
					Input.Mouse.leftClick = false;
					break;
				case 1:
					Input.Mouse.middleClick = false;
					break;
				case 2:
					Input.Mouse.rightClick = false;
					break;
			}
		});
	},
	update: function() {
		//Mouse delta and last
		Input.Mouse.dx = Input.Mouse.x - Input.Mouse.lx;
		Input.Mouse.dy = Input.Mouse.y - Input.Mouse.ly;
	},
	lateUpdate: function() {
		Input.Mouse.scrollDelta = 0;

		Input.Mouse.lx = Input.Mouse.x;
		Input.Mouse.ly = Input.Mouse.y;
	}
}