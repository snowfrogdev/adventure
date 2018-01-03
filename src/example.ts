import { createScript, ScriptTypeBase } from "../lib/create-script-decorator";

@createScript()
class Mouse extends ScriptTypeBase implements ScriptType {
    name = 'mouse';

    pos: pc.Vec3;

    redMaterial: pc.Asset;
    greenMaterial: pc.Asset;
    blueMaterial: pc.Asset;

    attributes = {
        redMaterial: {
            type: 'asset',
            assetType: 'material'
        } as pc.AttributesArgs,
        greenMaterial: {
            type: 'asset',
            assetType: 'material'
        } as pc.AttributesArgs,
        blueMaterial: {
            type: 'asset',
            assetType: 'material'
        } as pc.AttributesArgs
    }

    // initialize code called once per entity
    initialize() {
        this.pos = new pc.Vec3();

        // Disabling the context menu stops the browser displaying a menu when
        // you right-click the page
        this.app.mouse.disableContextMenu();

        // Use the on() method to attach event handlers.
        // The mouse object supports events on move, button down and
        // up, and scroll wheel.
        this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
    }

    onMouseMove(event: pc.MouseEvent) {
        // Use the camera component's screenToWorld function to convert the
        // position of the mouse into a position in 3D space
        var depth = 10;
        var cameraEntity = this.app.root.findByName('Camera') as pc.Entity;
        cameraEntity.camera.screenToWorld(event.x, event.y, depth, this.pos);
    
        // Finally update the cube's world-space position
        this.entity.setPosition(this.pos);
    }

   onMouseDown(event: pc.MouseEvent) {
        // If the left mouse button is pressed, change the cube color to red
        if (event.button === pc.MOUSEBUTTON_LEFT) {
            this.entity.model.meshInstances[0].material = this.redMaterial.resource as pc.Material;
        }
    
        // If the left mouse button is pressed, change the cube color to green
        if (event.button === pc.MOUSEBUTTON_MIDDLE) {
            this.entity.model.meshInstances[0].material = this.greenMaterial.resource as pc.Material;
        }
    
        // If the left mouse button is pressed, change the cube color to blue
        if (event.button === pc.MOUSEBUTTON_RIGHT) {
            this.entity.model.meshInstances[0].material = this.blueMaterial.resource as pc.Material;
        }
    }
}
