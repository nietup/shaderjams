#extension GL_OES_standard_derivatives : enable

precision highp float;

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

void main(void) {

	vec2 position = gl_FragCoord.xy / resolution.xx;

	vec2 leftEpicentre = vec2(0.3, 0.25);
	vec2 rigtEpicentre = vec2(0.7, 0.25);
	
	float amplitude = 50.;
	float phase = -time;
	
	float leftWave = sin(amplitude * distance(leftEpicentre, position) + phase);
	float rightWave = sin(amplitude * distance(rigtEpicentre, position) + phase);
	
	float red = 0.;//rightWave;
	float green = leftWave + rightWave;

	gl_FragColor = vec4( vec3( red, green, 0.0 ), 1.0 );

}
