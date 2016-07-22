var SDF = {
	shapes: [],
	stringify: function() {
		var map_beg = "float map(vec2 q){ float result = 1.0;";

		var map_shapes = "";

		for(var i = 0; i < this.shapes.length; ++i) {
			var shapeVar = "shape" + i;
			map_shapes += "float " + shapeVar + "=" + this.shapes[i].stringify() + ";";
			map_shapes += "result = smin(result, " + shapeVar + " , " + this.shapes[i].blend.toFixed(3) + ");"
		}

		var map_end = "return 1.0 - smoothstep(0.0, 3.0 / resolution.y * camera.z*1.25, result);}";
		return Utils.String.combine([map_beg, map_shapes, map_end], {infix: '\n'});
	},
	Create: {
		circle: function(x, y, rad, color, blend) {
			var c = {
				c: Maths.Create.circle(x, y, rad),
				blend: blend,
				color: color,
				stringify: function() {
					return "sdCircle(q, " + glsl.vec2(this.c.pos.x, this.c.pos.y) + ", " + this.c.rad.toFixed(3) + ")"
				}
			}

			SDF.shapes.push(c);
			return c;
		}
	}
};