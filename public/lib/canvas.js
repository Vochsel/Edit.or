var Graphics = {
	draw: {
		circle: function(ctx, x, y, rad, style) {
			ctx.beginPath();
			ctx.arc(x, y, rad, 0, 2 * Math.PI);
			ctx.closePath();

			if(style.fill !== undefined) {
				ctx.fillStyle = style.fill.color;
				ctx.fill();
			}

			if(style.stroke !== undefined) {
				ctx.lineWidth = style.stroke.width;
				ctx.strokeStyle = style.stroke.color;
				ctx.stroke();
			}
		}
	}
}