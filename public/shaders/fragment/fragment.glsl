


float map(vec2 q)
{
	float result = 1.0;
	float c1 = sdCircle(q, circle.xy, circle.z);
	float c2 = sdCircle(q, vec2( 1.25,  0.0), 0.75);

	//float result = smin(c1, c2, 0.75);
	
	//float result = c1;

	return 1.0 - smoothstep(0.0, 3.0 / resolution.y * camera.z*1.25, result);
}

