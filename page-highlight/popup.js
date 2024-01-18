const btn = document.querySelector('.changeColorBtn');
const colorGrid = document.querySelector('.colorGrid')
const colorValue = document.querySelector('.colorValue')

btn.addEventListener('click', async () => {
  const color = chrome.storage.sync.get('color', ({ color }) => {
    console.log('color: ', color)
  })
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: pickColor,
  }, async (injectionResults) => {
    const [data] = injectionResults;
    if (data.result) {
      const color = data.result.sRGBHex;
      colorGrid.style.backgroundColor = color;
      colorValue.innerText = color;

      try {
         await navigator.clipboard.writeText(color);
      } catch (err) {
        console.error(err)
      }


      console.log(colorGrid);
    }
    console.log(injectionResults);
  });
});

async function pickColor() {
  try {
    //picker
    const eyeDropper = new EyeDropper();
    return await eyeDropper.open();
    //const selectedColor = await eyeDropper.open();
    //console.log(selectedColor);
  } catch (err) {
    console.error(err)
  }
}