// Frame profiler: plays a seed headless to a busy moment, then reports milliseconds per frame for the simulation, preparing the
// 3D render, the HUD and the GPU, at a desktop size and at a phone size, with JavaScript at full speed and slowed down.
// Usage: node tools/perf.js [URL flags, default seed=4&level=4] [seconds to play first, default 40]
// The GPU column is software rendering on Linux (SwiftShader), so compare it between builds, not with a real phone.
// CPU throttling slows only the page's JavaScript, the way Chrome DevTools does ("4x" is about a mid-range phone).
const { spawn } = require('child_process'); const fs = require('fs'); const os = require('os'); const path = require('path');
const ROOT = path.dirname(__dirname);
const [flags = 'seed=4&level=4', warm = '40'] = process.argv.slice(2);
const FILE = path.resolve(process.env.FILE || path.join(ROOT, 'index.html'));
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const GL = process.platform === 'darwin' ? ['--headless=new', '--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] : ['--headless', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'];
const PROFILES = (process.env.PROFILES || 'desktop:1,phone:1,phone:4').split(',').map(p => p.split(':'));
const DEVICES = { desktop: { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false }, phone: { width: 390, height: 844, deviceScaleFactor: 3, mobile: true } };
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run(dev, rate) {
  const port = 9900 + Math.floor(Math.random() * 90), prof = fs.mkdtempSync(path.join(os.tmpdir(), 'cinderwatch-perf-')), D = DEVICES[dev];
  const ch = spawn(CHROME, GL.concat(['--window-size=' + D.width + ',' + D.height, '--remote-debugging-port=' + port, '--user-data-dir=' + prof, '--mute-audio', 'about:blank']), { stdio: 'ignore' });
  let ws = null; for (let i = 0; i < 80 && !ws; i++) { await sleep(150); try { const j = await (await fetch('http://127.0.0.1:' + port + '/json')).json(); const pg = j.find(t => t.type === 'page'); if (pg) ws = new WebSocket(pg.webSocketDebuggerUrl); } catch (e) { } }
  if (!ws) throw new Error('could not start Chrome at ' + CHROME + ' (set CHROME)');
  await new Promise(r => ws.addEventListener('open', r));
  let id = 0; const pend = new Map();
  ws.addEventListener('message', ev => { const m = JSON.parse(ev.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); if (r.result.exceptionDetails) throw new Error(r.result.exceptionDetails.exception.description); return r.result.result.value; };
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', D);
  if (D.mobile) { await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 }); await send('Emulation.setEmitTouchEventsForMouse', { enabled: true }); }
  await send('Page.navigate', { url: 'file://' + FILE + '#manual=1&' + flags });
  for (let i = 0; i < 80; i++) { await sleep(250); try { if (await ev('!!(window.__cw && __cw.G.B)')) break; } catch (e) { } }
  await ev(`(() => { for (let i = 0; i < ${+warm * 30}; i++) __cw.step(1 / 30); return 1; })()`); // play to a busy moment without drawing
  await ev('__cw.perf(10)'); // warm up the shaders
  await send('Emulation.setCPUThrottlingRate', { rate: +rate });
  const r = await ev('__cw.perf(40)');
  ws.close(); ch.kill(); await sleep(200); try { fs.rmSync(prof, { recursive: true, force: true }); } catch (e) { }
  return r;
}

(async () => {
  console.log('profile      sim  render   hud    gpu   (ms per frame)   draw calls  triangles  lights  scene px      screen px    monsters towers');
  const passes = [];
  for (const [dev, rate] of PROFILES) {
    const r = await run(dev, rate), f = v => v.toFixed(1).padStart(6);
    passes.push([dev + ' ' + rate + 'x', r.pass]);
    console.log(`${(dev + ' ' + rate + 'x').padEnd(10)}${f(r.sim)}${f(r.render)}${f(r.hud)}${f(r.gpu)}${''.padEnd(19)}${String(r.calls).padStart(8)}${String(r.tris).padStart(11)}${String(r.lights).padStart(8)}   ${(r.iw + 'x' + r.ih).padEnd(12)}${(r.dw + 'x' + r.dh).padEnd(14)}${String(r.mons).padStart(5)}${String(r.towers).padStart(7)}`);
  }
  console.log('\nGPU milliseconds per pass (scene includes redrawing shadow maps; "no shadows" is the scene with them left as they are):');
  for (const [name, P] of passes) console.log('  ' + name.padEnd(10) + Object.entries(P).map(([k, v]) => k.replace('sceneNoShadow', 'scene, no shadows') + ' ' + v.toFixed(1)).join('  '));
})();
