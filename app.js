function main () {

    const canvas = document.querySelector('#c')
    // THREE requires these, must exist => scene camera renderer

    ////////////////
    // CAMERA SETUP
    ////////////////
    const fieldOfView = 50
    //const aspectRatio = 2
    const aspectRatio = canvas.clientWidth / canvas.clientHeight
    const nearField = 0.1
    const farField = 2000

    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearField, farField)

    ////////////////
    // RENDERER SETUP
    ////////////////

    const renderer = new THREE.WebGLRenderer({canvas})

    const width = canvas.clientWidth
    const height = canvas.clientHeight
    renderer.setSize(width, height)
    
    ////////////////
    // SCENE SETUP
    ////////////////    

    const scene = new THREE.Scene()
    const loader = new THREE.TextureLoader()

    const texture = loader.load(
        'https://threejs.org/manual/examples/resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg',
        () => {
            const rt = new THREE.WebGLCubeRenderTarget(texture.image.height)
            rt.fromEquiRectangularTexture(renderer, texture)
            scene.background = rt.texture
        }
    )

    function render () {
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }

    requestAnimationFrame(render)

}

main()