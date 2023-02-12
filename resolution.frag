#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

/*
This example demonstrates why divide gl_FragCoord by one dimension (width or height).
When the screen size is variable, dividing by one dimension will give us position normalized to the sqare.

In this example, although both circles are the same radius, blue circle will be flattened depending on the width to height ratio.
*/

void main() {

	vec2 positionXX = gl_FragCoord.xy / u_resolution.x;
    vec2 centreXX = vec2(0.4, 0.4);
    float circleXX = 1.-step(.15, distance(centreXX, positionXX));

    vec2 positionXY = gl_FragCoord.xy / u_resolution.xy;
    vec2 centreXY = vec2(0.6, 0.6);
    float circleXY = 1.-step(.15, distance(centreXY, positionXY));

	float red = 0.;
	float green = circleXX;
	float blue = circleXY;

	gl_FragColor = vec4( vec3( red, green, blue ), 1.0 );

}