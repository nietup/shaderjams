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
    for(float i=-1.;i<=1.;i++) {
        for(float j=-1.;j<=1.;j++) {
    		vec2 uv=fract(5.*uv)+vec2(i,j);
    		vec2 translate=vec2(10.*cos(0.2*u_time),sin(3.*u_time));
    		uv+=translate*0.35;
    		color.b+=smth(wave(uv.x,1.,0.,.5,0.,0.),uv.y,.01,-1.)*smth(wave(uv.x,1.,0.,.5,0.,0.),.8-uv.y,.01,-1.)
    		+smth(wave(uv.x-.35,1.,0.,.5,0.,0.),uv.y,.01,-1.)*smth(wave(uv.x-.35,1.,0.,.5,0.,0.),.8-uv.y,.01,-1.)
    		-smth(wave(uv.x-.45,1.,0.,.5,0.,0.),uv.y,.01,-1.)*smth(wave(uv.x-.45,1.,0.,.5,0.,0.),.8-uv.y,.01,-1.);
        }
    }
    
    vec2 gv=fract(3.*uv);
    float circlek=circle(vec2(.5),gv,.3);
    color.b=max(0.,(.7*color.b))+.3;
    color.b*=circlek;
    color.rgb+=vec3(gv.x*gv.y*.3);
    gl_FragColor=vec4(color,1.0);
}