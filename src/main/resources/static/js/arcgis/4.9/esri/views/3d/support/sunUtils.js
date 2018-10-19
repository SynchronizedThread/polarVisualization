// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define(["require","exports","../lib/gl-matrix","../lib/SunCalc","./mathUtils"],function(N,p,m,u,w){function l(h,f,k,a){for(var e=[],c=0;c<k.length;c++)e[c]=(a[c]-k[c])*h/f+k[c];return e}Object.defineProperty(p,"__esModule",{value:!0});p.settings={local:{altitude:1500,ambientAtNight:.1,ambientAtNoon:.45,ambientAtTwilight:.2,diffuseAtNoon:.65,diffuseAtTwilight:.7},global:{altitude:8E5,ambient:.015,diffuse:.75},planarDirection:{localAltitude:1E4,globalAltitude:1E6,globalAngles:{azimuth:1.3*Math.PI,altitude:.6*
Math.PI}}};p.computeColorAndIntensity=function(h,f){var k,a,e,c=f.z,d=K;m.vec3d.set3(1,1,1,d.ambient.color);d.ambient.intensity=p.settings.global.ambient;m.vec3d.set3(1,1,1,d.diffuse.color);d.diffuse.intensity=p.settings.global.diffuse;c=(Math.abs(c)-p.settings.local.altitude)/(p.settings.global.altitude-p.settings.local.altitude);c=w.clamp(c,0,1);d.globalFactor=c;f=u.getTimes(h,f.y,f.x);if(1>c){a=h.valueOf();var n,g;f.polarException===u.POLAR_EXCEPTION.MIDNIGHT_SUN?(n=a-36E5*(h.getHours()+48)-6E4*
h.getMinutes(),g=n+432E6):f.polarException===u.POLAR_EXCEPTION.POLAR_NIGHT?(n=a-2,g=a-1):(n=f.sunrise.valueOf(),g=f.sunset.valueOf());var q=g-n;e=n+q/2;var r=q/4;k=e-r;var r=e+r,b=.06*q,q=n-b/2;n+=b/2;var v=g-b/2,D=g+b/2;g=p.settings.local;var E=[.01,g.ambientAtNight],F=[.8,.8,1],G=[.01,.01,.01],x=[g.diffuseAtTwilight,g.ambientAtTwilight],y=[1,.75,.75],z=[.8,.8,1],A=[.9*g.diffuseAtNoon,g.ambientAtNoon],B=[1,.98,.98],C=[.98,.98,1],H=[g.diffuseAtNoon,g.ambientAtNoon],I=[1,1,1],J=[1,1,1];g=[0,0];var t=
[0,0],b=[0,0];a<q||a>D?(g=E,t=G,b=F):a<n?(b=n-q,g=l(a-q,b,E,x),t=l(a-q,b,G,y),b=l(a-q,b,F,z)):a<k?(b=k-n,g=l(a-n,b,x,A),t=l(a-n,b,y,B),b=l(a-n,b,z,C)):a<e?(b=e-k,g=l(a-k,b,A,H),t=l(a-k,b,B,I),b=l(a-k,b,C,J)):a<r?(b=r-e,g=l(a-e,b,H,A),t=l(a-e,b,I,B),b=l(a-e,b,J,C)):a<v?(b=v-r,g=l(a-r,b,A,x),t=l(a-r,b,B,y),b=l(a-r,b,C,z)):a<D&&(b=D-v,g=l(a-v,b,x,E),t=l(a-v,b,y,G),b=l(a-v,b,z,F));a=g[0];e=t;k=g[1];m.vec3d.lerp(b,d.ambient.color,c,d.ambient.color);d.ambient.intensity=w.lerp(k,d.ambient.intensity,c);m.vec3d.lerp(e,
d.diffuse.color,c,d.diffuse.color);d.diffuse.intensity=w.lerp(a,d.diffuse.intensity,c)}c=h.valueOf();f.polarException===u.POLAR_EXCEPTION.MIDNIGHT_SUN?(h=c-36E5*(h.getHours()+48)-6E4*h.getMinutes(),f=h+432E6):f.polarException===u.POLAR_EXCEPTION.POLAR_NIGHT?(h=c-2,f=c-1):(h=f.sunrise.valueOf(),f=f.sunset.valueOf());h=1-w.clamp(Math.abs(c-(h+(f-h)/2))/432E5,0,1);d.noonFactor=h;return d};p.computeDirection=function(h,f,k,a){a||(a=m.vec3d.create());var e=L,c=m.mat4d.identity(M);if("global"===k)u.getPosition(h,
0,0,e),m.vec3d.set3(0,0,-1,a),m.mat4d.rotateX(c,-e.azimuth),m.mat4d.rotateY(c,-e.altitude);else{var d=p.settings.planarDirection;k=d.globalAngles;d=(Math.abs(f.z)-d.localAltitude)/(d.globalAltitude-d.localAltitude);d=w.clamp(d,0,1);1>d?(u.getPosition(h,f.y,f.x,e),e.azimuth=(1-d)*e.azimuth+d*k.azimuth,e.altitude=(1-d)*e.altitude+d*k.altitude):(e.azimuth=k.azimuth,e.altitude=k.altitude);m.vec3d.set3(0,-1,0,a);m.mat4d.rotateZ(c,-e.azimuth);m.mat4d.rotateX(c,-e.altitude)}m.mat4d.multiplyVec3(c,a);return a};
p.computeShadowsEnabled=function(h,f){return"global"===f?!0:Math.abs(h.z)<p.settings.planarDirection.localAltitude};var M=m.mat4d.identity(),L={azimuth:0,altitude:0},K={ambient:{color:m.vec3d.create(),intensity:0},diffuse:{color:m.vec3d.create(),intensity:0,direction:m.vec3d.create()},globalFactor:0,noonFactor:0}});