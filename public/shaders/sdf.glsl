float sdCircle(vec2 q, vec2 p, float r)
{
	float l = length(q - p) - r;
	return l;
}