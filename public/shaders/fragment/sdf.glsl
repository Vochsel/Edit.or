
float sdCircle(vec2 q, vec2 p, float r)
{
	float l = length(q - p) - r;
	return l;
	//return smoothstep(r, r - 0.0025, l);
}

vec2 opRep(vec2 p, vec2 c) 
{
	return mod(p, c) - 0.5 * c;
}

float smin(float a, float b, float k) {
	float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
	return mix(b, a, h) - k * h * (1.0 - h);
}


float grid(vec2 q, float lineWidth)
{
	vec2 grid = mod(q, 1.0) / 10.0;
	return grid.x + grid.y;
}
