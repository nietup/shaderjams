#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

/*
Demonstration of smoothstep(e0, e1, x).
Smoothstep interpolates x between values e0 and e1.
Possible implementation of smoothstep is 3x^2 - 2x^3.

Green is smoothstep, blue is linear.
Smoothstep(0, 1, x) reaches 1 at the same "moment" as linear function,
but the transition is more smooth.

Value is displayed as going from full color (1) to black (0).
"scale" factor makes the functions reach 1 "faster", 
for plots, see: https://www.wolframalpha.com/input?i=3%285*x%29%5E2+-+2%285*x%29%5E3+and+5x+for+x+in+%5B0..0.2%5D
*/

void main() {

	vec2 position = gl_FragCoord.xy / u_resolution.x;

    float scale = 3.5;

	vec2 smoothCentre = vec2(.7, .7);
    float x = distance(smoothCentre, position);
    float reverseSmoothstep = 1.-smoothstep(0., 1., scale*x);

    vec2 distCentre = vec2(.3, .3);
    float reverseDistance = 1.-scale*distance(distCentre, position);

	float red = 0.;
	float green = reverseSmoothstep;
	float blue = reverseDistance;

	gl_FragColor = vec4( vec3( red, green, blue ), 1.0 );

}