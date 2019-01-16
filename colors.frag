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

void main() {
    vec2 uv=gl_FragCoord.xy/u_resolution.xy;
    uv.x*=u_resolution.x/u_resolution.y;
    vec3 frq=vec3(1.2,.3,.6);
    vec3 wav=sin(frq*u_time)*.5+.5;
    vec3 pwav=sin(uv.x+frq*u_time)*.5+.5;
    vec3 plots=vec3(plot(pwav[0],uv.y,0.02,0.01),plot(pwav[1],uv.y,0.02,0.01),plot(pwav[2],uv.y,0.02,0.01));
    vec3 bars=vec3(plot(wav[0],uv.y,0.005,0.01),plot(wav[1],uv.y,0.005,0.01),plot(wav[2],uv.y,0.005,0.01));
    vec3 color=wav+plots;
    gl_FragColor=vec4(color,1.0);
}