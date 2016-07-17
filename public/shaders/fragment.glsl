precision mediump float;

uniform vec2 resolution;
uniform float time;

uniform vec3 camera;	//Should be mat3

uniform vec3 circle;

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

float map(vec2 q)
{
	float c1 = sdCircle(q, circle.xy, circle.z);
	float c2 = sdCircle(q, vec2( 1.25,  0.0), 0.72);

	float result = smin(c1, c2, 0.75);
	//float result = c1;

	return 1.0 - smoothstep(0.0, 3.0 / resolution.y * camera.z*1.25, result);
}

float grid(vec2 q, float lineWidth)
{
	vec2 grid = mod(q, 1.0) / 10.0;
	return grid.x + grid.y;
}

void main() {
  	float aspect = resolution.x / resolution.y;

	vec2 sc = gl_FragCoord.xy / resolution;
  	vec2 uv = sc * 2.0 - 1.0;
  	uv.x *= aspect;

  	//Apply view translation (Should be mat3)
  	uv += camera.xy * 1.23;
  	uv *= camera.z;
  
	vec3 col = vec3(0.9);

	col = mix(col, vec3(0.1), map(uv));
	//col = mix(col, vec3(0.0), grid(uv, 0.1));

	gl_FragColor = vec4(col, 1.0);
}