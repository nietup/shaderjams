#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

void main(void) {

	vec2 position = gl_FragCoord.xy / u_resolution.xx;

	vec2 leftEpicentre = vec2(0.3, 0.25);
	vec2 rigtEpicentre = vec2(0.7, 0.25);
	
	float amplitude = 50.;
	float phase = -u_time;
	
	float leftWave = sin(amplitude * distance(leftEpicentre, position) + phase);
	float rightWave = sin(amplitude * distance(rigtEpicentre, position) + phase);
	
	float red = 0.;//rightWave;
	float green = leftWave + rightWave;

	gl_FragColor = vec4( vec3( red, green, 0.0 ), 1.0 );

}