var glsl = {
	vec2: function(x, y) {
		return "vec2(" + x.toFixed(3) + ", " + y.toFixed(3) + ")"; 
	},
	vec3: function(x, y, z) {
		return "vec2(" + x.toFixed(3) + ", " + y.toFixed(3) +  ", " + z.toFixed(3) +")"; 
	}
}