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
    float f1=wave(uv.x,4.,1.,0.125,.5,.0);
    float r=plot(f1,uv.y,.01,.01);
    float f2=uv.x*wave(uv.x,4.,1.,.125,.5,.0);
    float g=plot(f2,uv.y,.03,.01);
    float f3=wave(uv.x,7.,1.,.06125,.85,0.);
    float f4=wave(uv.x,7.,1.,.06125,.85,PI);
    float b=smth(f3,uv.y,.02,1.)*smth(f4,uv.y,.02,-1.);
    
    //reverse clouds
    float f5=wave(uv.x,7.,-1.,.06125,.85,0.);
    float f6=wave(uv.x,7.,-1.,.06125,.85,PI);
    b+=smth(f5,uv.y,.02,1.)*smth(f6,uv.y,.02,-1.);
    //reverse ribbon
    // float f7=(1.-uv.x)*wave(uv.x,4.,-1.,.125,.5,PI);
    // g=plot(max(f2,f7),uv.y,.03,.01);
    //reverse sin
    float f8=wave(uv.x,4.,-1.,0.125,.5,.0);
    r+=plot(max(f1,f8),uv.y,.01,.01);
    
    vec3 color=vec3(r,g,b);
    gl_FragColor=vec4(color,1.0);
}