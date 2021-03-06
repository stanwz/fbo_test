uniform float colorA;
uniform float colorB;
uniform float timer;

varying vec3 vPos;
varying float size;

float hue2rgb(float f1, float f2, float hue) {
    if (hue < 0.0)
        hue += 1.0;
    else if (hue > 1.0)
        hue -= 1.0;
    float res;
    if ((6.0 * hue) < 1.0)
        res = f1 + (f2 - f1) * 6.0 * hue;
    else if ((2.0 * hue) < 1.0)
        res = f2;
    else if ((3.0 * hue) < 2.0)
        res = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;
    else
        res = f1;
    return res;
}

vec3 hsl2rgb(vec3 hsl) {
    vec3 rgb;

    if (hsl.y == 0.0) {
        rgb = vec3(hsl.z); // Luminance
    } else {
        float f2;

        if (hsl.z < 0.5)
            f2 = hsl.z * (1.0 + hsl.y);
        else
            f2 = hsl.z + hsl.y - hsl.y * hsl.z;

        float f1 = 2.0 * hsl.z - f2;

        rgb.r = hue2rgb(f1, f2, hsl.x + (1.0/3.0));
        rgb.g = hue2rgb(f1, f2, hsl.x);
        rgb.b = hue2rgb(f1, f2, hsl.x - (1.0/3.0));
    }
    return rgb;
}

vec3 hsl2rgb(float h, float s, float l) {
    return hsl2rgb(vec3(h, s, l));
}

void main()
{

    float colorDistance = 0.0;
    float pointDistance = length(vPos);
    colorDistance =  (pointDistance * .0015);

    float color = mix(colorA, colorB, (sin(timer/180.) + 1.) / 2.);

    float hue = color + colorDistance;
    float saturation = 1.0;
    float light = 0.35;

    vec3 col = hsl2rgb(hue, saturation, light);

    if( size > 1. )
    {
        gl_FragColor = vec4( col * vec3( 1. - length(gl_PointCoord.xy - vec2(.7)) ) * 1.5, .95 );
    } else {
        gl_FragColor = vec4( col, .5 );
    }
}