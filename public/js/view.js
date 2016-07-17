function Camera() {

	var x = 0;
	var y = 0;
	var zoom = 1;

	if(localStorage["Edit.or_Camera"]) {
		var loadcam = JSON.parse(localStorage["Edit.or_Camera"]);
		x = loadcam.pos.x;
		y = loadcam.pos.y;
		zoom = loadcam.zoom;
		console.log("Found storage")
		console.log(loadcam);
	}

	return {
		pos: {
			x: x,
			y: y
		},
		zoom: zoom,
		update: function() {
			this.zoom += Input.Mouse.scrollDelta * (5 + Input.Mouse.scrollDelta);
			this.zoom = Math.clamp(this.zoom, 0.1, 1000000);
			if(Input.Mouse.leftClick)
			{
				this.pos.x += Input.Mouse.dx;
				this.pos.y += Input.Mouse.dy;
			}
			localStorage["Edit.or_Camera"] = JSON.stringify(this);
		}
	}
}