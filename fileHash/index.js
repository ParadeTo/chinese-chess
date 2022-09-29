import sparkMD5 from 'spark-md5'
const go = new Go()
WebAssembly.instantiateStreaming(fetch('/main.wasm'), go.importObject).then(
  (result) => {
    go.run(result.instance)
  }
)

window.addEventListener('load', () => {
  const $file = document.getElementById('file')
  const $jsBtn = document.getElementById('jsBtn')
  const $goBtn = document.getElementById('goBtn')

  let file

  $file.addEventListener('change', async (e) => {
    file = e.target.files[0]
  })

  $jsBtn.addEventListener('click', async () => {
    if (!file) return
    const s = Date.now()
    const aB = await file.arrayBuffer()
    const spark = new sparkMD5.ArrayBuffer()
    spark.append(aB)
    console.log(spark.end())
    console.log('Time:', Date.now() - s)
  })

  $goBtn.addEventListener('click', async () => {
    if (!file) return
    const s = Date.now()
    const aB = await file.arrayBuffer()
    const unit8Array = new Uint8Array(aB)
    console.log(window.getHash(unit8Array))
    console.log('Time:', Date.now() - s)
  })
})

// https://github.com/gptankit/go-wasm
// https://javascript.info/arraybuffer-binary-arrays#:~:text=Uint8Array%20%E2%80%93%20treats%20each%20byte%20in,values%20from%200%20to%2065535.
