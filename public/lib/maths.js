(function(){Math.clamp=function(a,b,c){return Math.max(b,Math.min(c,a));}})();

var Maths = {
	Intersect: {
		PointToAABB: function(point, aabb) {

		}, 
		PointToCircle: function(point, circle) {

		},
		CircleToCircle: function(circleA, circleB) {
			var offset = circleA.pos.sub(circleB.pos);
			var dist = offset.length();
			var radComb = circleA.rad + circleB.rad;
			if(dist < radComb) {
				return true;
			}

			return false;
		},
		AABBToAABB: function(boxA, boxB) {

		}
	},
	Create: {
		point: function(x, y) {
			return {
				x: x,
				y: y,
				add: function(other) {
					return Maths.Create.point(this.x + other.x, this.y + other.y);
				},
				sub: function(other) {
					return Maths.Create.point(this.x - other.x, this.y - other.y);
				},
				length: function() {
					return Math.sqrt((x * x) + (y * y));
				}
			}
		},
		circle: function(x, y, radius) {
			return {
				pos: Maths.Create.point(x, y),
				rad: radius
			}
		},
		aabb: function(x, y, w, h) {
			return {
				pos: Maths.Create.point(x, y),
				w: w,
				h: h
			}
		}
	}
}