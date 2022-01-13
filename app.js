function main () {

    const canvas = document.querySelector('#canvasElement')
    // THREE requires these, must exist => scene camera renderer

    ////////////////
    // CAMERA SETUP
    ////////////////
    const fieldOfView = 75
    //const aspectRatio = 2
    const aspectRatio = canvas.clientWidth / canvas.clientHeight
    const nearField = 0.1
    const farField = 2000

    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearField, farField)
    camera.position.z = 1

    ////////////////
    // RENDERER SETUP
    ////////////////

    const renderer = new THREE.WebGLRenderer({canvas})

    // Finally, add here the instance for Orbital Controls
    new THREE.OrbitControls(camera, canvas)
   
    ////////////////
    // SCENE SETUP
    ////////////////    

    const scene = new THREE.Scene()
    const loader = new THREE.TextureLoader()

    const texture = loader.load(
        'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/snowy_field.jpg',
        () => {
            const rt = new THREE.WebGLCubeRenderTarget(texture.image.height)
            rt.fromEquirectangularTexture(renderer, texture)
            scene.background = rt.texture
        }
    )

    function render () {
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        

        camera.aspect = width / height
        camera.updateProjectionMatrix()

        renderer.setSize(width, height, false)
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }

    requestAnimationFrame(render)

}

main()