#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float wave(float arg, float mulp, float mult, float amp, float lift, float fi) {
    return amp*sin(mulp*PI*arg+mult*u_time+fi)+lift;
}

float smth(float fun, float arg, float blur, float flip) {
    return (.5-0.5*flip)+flip*smoothstep(fun-.5*blur,fun+.5*blur,arg);
}

float plot(float fun, float arg, float thicc, float blur) {
    return smth(fun+.5*thicc,arg,blur,-1.)-smth(fun-.5*thicc,arg,blur,-1.);
}

float sq(float x, float y, float w, float h, vec2 uv) {
    return step(x,uv.x)*step(y,uv.y)*(1.-step(x+w,uv.x))*(1.-step(y+h,uv.y));
}

float circle(vec2 pos, vec2 uv, float r) {
    return 1.-step(r,4.*dot(uv-pos,uv-pos));
}

void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
	uv.x*=u_resolution.x/u_resolution.y;
    vec3 color=vec3(.0);
    color.r=circle(vec2(.5),uv,.3);
    color.r*=smth(wave(uv.x,3.,1.,.125,0.5,.0),uv.y,.0,-.25);
    gl_FragColor=vec4(color,1.0);
}