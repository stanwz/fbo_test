
//float texture containing the positions of each particle
uniform sampler2D positions;

//size
uniform float pointSize;

varying vec3 vPos;
varying float size;

void main() {

    //the mesh is a nomrliazed square so the uvs = the xy positions of the vertices
    vec3 pos = texture2D( positions, position.xy ).xyz;

    vPos = pos;

    //pos now contains the position of a point in space taht can be transformed
    gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );

    gl_PointSize = size = max( 1., ( smoothstep( 64./128., 127./128., position.x ) ) * pointSize );
}