#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

void main() {

	vec2 positionXX = gl_FragCoord.xx / u_resolution.x;
	vec2 positionYY = gl_FragCoord.yy / u_resolution.x;
	
	float scale = 40.;
	
	float horizontalLines = sin(scale * length(positionYY));
	float verticalLines = sin(scale * length(positionXX));
	
	float red = horizontalLines;
	float green = step(.00001, horizontalLines + verticalLines);
	float blue = verticalLines;

	gl_FragColor = vec4( vec3( red, green, blue ), 1.0 );

}
