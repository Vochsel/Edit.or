function Camera() {

	var x = 0;
	var y = 0;
	var zoom = 1;

	if(localStorage["Edit.or_Camera"]) {
		var loadcam = JSON.parse(localStorage["Edit.or_Camera"]);
		x = loadcam.pos[0];
		y = loadcam.pos[1];
		zoom = loadcam.zoom;
		console.log("Found storage")
		console.log(loadcam);
	}
	var p = vec2.create();
	p[0] = x;
	p[1] = y;
	return {
		pos: p,
		zoom: zoom,
		data: mat3.create(),
		reset: function() {
			this.pos = vec2.create();
			this.zoom = 10;
		},
		setup: function() {
			mat3.scale(this.data, this.data, [this.zoom, this.zoom]);
			mat3.translate(this.data, this.data, this.pos);
		},
		update: function() {
			//this.zoom += Input.Mouse.scrollDelta * (5 + Input.Mouse.scrollDelta);
			//this.zoom = Math.clamp(this.zoom, 0.1, 1000000);
			if(Math.abs(Input.Mouse.scrollDelta) > 0.0) {
				var d = Input.Mouse.scrollDelta;
				d *= 2;
				d = 1 - d;
				this.zoom *= d;
				mat3.scale(this.data, this.data, [d, d]);
				console.log(d);
			}

			if(Input.Mouse.leftClick)
			{
				this.pos[0] += Input.Mouse.dx;
				this.pos[1] += Input.Mouse.dy;
				mat3.translate(this.data, this.data, [Input.Mouse.dx, Input.Mouse.dy]);
			}
			localStorage["Edit.or_Camera"] = JSON.stringify(this);

			

		}
	}
}