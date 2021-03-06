void main() {
  float aspect = resolution.x / resolution.y;

  vec2 sc = gl_FragCoord.xy / resolution;
  vec2 uv = sc * 2.0 - 1.0;
  uv.x *= aspect;

  //Apply view translation (Should be mat3)
  uv += camera.xy;
  uv *= camera.z;

  vec3 t = vec3(uv, 1.0);
  //t *= view;
  //t = view * t;
  uv = t.xy;

  vec3 col = vec3(0.9);

  col = mix(col, vec3(0.5), grid(uv, 0.1));
  col = mix(col, vec3(0.1), map(uv));


  gl_FragColor = vec4(col, 1.0);
}