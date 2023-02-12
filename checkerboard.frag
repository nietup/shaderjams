#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

void main() {

	vec2 position = gl_FragCoord.xy / u_resolution.x;
	
	float scale = 50.;
	
	float horizontalLines = sin(scale * position.y);
	float verticalLines = sin(scale * position.x);
	
	float red = horizontalLines;
	float green = step(.00001, horizontalLines + verticalLines);
	float blue = verticalLines;

	gl_FragColor = vec4( vec3( red, green, blue ), 1.0 );

}
//todo figure out why sines cancel out until they cross