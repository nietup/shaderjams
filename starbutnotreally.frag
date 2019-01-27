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

float circle(vec2 pos, vec2 uv, float r, float thicc) {
    return smoothstep(r+thicc,r-thicc,4.*dot(uv-pos,uv-pos));
}

mat2 scale(float sf) {
    return mat2(sf,0.,0.,sf);
}

void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
	uv.x*=u_resolution.x/u_resolution.y;
    vec3 color=vec3(.0);
    float sf=1.;
    vec2 gv=uv;
    color+=mix(vec3(0.730,0.638,0.168),vec3(0.735,0.199,0.093),gv.x*gv.y/0.5)*circle(sf*vec2(.5,.5),gv,.4,.02)
    +(1.-circle(sf*vec2(.5,.5),gv,.4,.02))
    /vec3(0.037,0.177,0.615)*circle(sf*vec2(wave(.0,1.,1.,.45,.5,.5*PI),wave(.0,1.,1.,.08,.5,0.)),gv,.02,.006)
    +vec3(0.037,0.177,0.615)*circle(sf*vec2(wave(.0,1.,1.,.45,.5,.5*PI),wave(.0,1.,1.,.08,.5,0.)),gv,.02,.006);
    gl_FragColor=vec4(color,1.0);
}