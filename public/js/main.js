var SPE_USES_PREVIEW_IMAGE = false;
const runtime = new SpeRuntime(SPLINE_EXPORTED_SCENE, SPLINE_ASSETS_LIST);

// ---
// my additions to the rendering
let canvasHeightPercentage = 0.6;
if (window.innerWidth < 500) {
    canvasHeightPercentage = 0.8;
    runtime.mOrbitControls.object.zoom = 0.7;
    runtime.mOrbitControls.object.updateProjectionMatrix();
}
const updateSize = () => {
    runtime.mViewportWidth = window.innerWidth * 1;
    runtime.mViewportHeight = window.innerHeight * canvasHeightPercentage;
    runtime.mViewportMode = 0;
    runtime.onResize();
};

/*
window.addEventListener("mousemove", () => {
    runtime.mScene.children[2].rotateZ(0.1);
})*/



function animate() {
    /*
    requestAnimationFrame( animate );

    if (!mouseDown) {
        target.x += ( mouseX - target.x ) * .2;
        target.y += ( - mouseY - target.y ) * .2;
        target.z = runtime.mMainCamera.position.z ;
        //runtime.mScene.children[2].add( target );
        window.tittapo = target;
        runtime.mScene.children[2].lookAt( target );
    }*/
}
//animate();

//window.addEventListener("mousemove", onDocumentMouseMove);

window.addEventListener("resize", updateSize)
updateSize();
// ---
runtime.run();