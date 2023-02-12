#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

void main() {

	vec2 position = gl_FragCoord.xy / u_resolution.x;

	vec2 leftEpicentre = vec2(0.3, .5);
	vec2 rigtEpicentre = vec2(0.7, .5);
	
	float amplitude = 50.;
	float phase = -u_time;
	
	float leftWave = sin(amplitude * distance(leftEpicentre, position) + phase);
	float rightWave = sin(amplitude * distance(rigtEpicentre, position) + phase);
	
	float red = rightWave;
	float green = leftWave + rightWave;
	float blue = leftWave;

	gl_FragColor = vec4( vec3( red, green, blue ), 1.0 );

}
