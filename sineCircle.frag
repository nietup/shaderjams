#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

void main() {

	vec2 position = gl_FragCoord.xy / u_resolution.x;

	vec2 centre = vec2(.5, .5);
	
	float amplitude = 50.;
	float phase = 0.;
	
	float leftWave = sin(amplitude * distance(centre, position) + phase);
	
	float red = 0.;
	float green = leftWave;
	float blue = 0.;

	gl_FragColor = vec4( vec3( red, green, blue ), 1.0 );

}