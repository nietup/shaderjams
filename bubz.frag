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
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    float r,g,b=.0;
    float f=wave(uv.x,5.,.0,1.,.0,.0)*wave(uv.y,5.,-1.,1.,.0,.0);
    r=plot(f,uv.y,0.1,0.01);
    vec3 color=vec3(r,g,b);
    gl_FragColor=vec4(color,1.0);
}