import {
  ViewerApp,
  AssetManagerPlugin,
  GBufferPlugin,
  ProgressivePlugin,
  TonemapPlugin,
  SSRPlugin,
  SSAOPlugin,
  mobileAndTabletCheck,
  BloomPlugin,
  Vector3,
  GammaCorrectionPlugin,
  MeshBasicMaterial2,
  Color,
  AssetImporter,
  addBasePlugins,
} from 'webgi';
import './styles.css';

async function setupViewer() {
  const viewer = new ViewerApp({
    canvas: document.getElementById('webgi-canvas') as HTMLCanvasElement,
    useRgbm: false,
  });

  const manager = await viewer.addPlugin(AssetManagerPlugin);

  await addBasePlugins(viewer);

  viewer.renderer.refreshPipeline();

await manager.addFromPath('./assets/scene.glb');
}

setupViewer();
