const { app, BrowserView, BrowserWindow, shell } = require("electron");
let win, twitter, _04si;
let isMac = process.platform === "darwin";

function newWin() {
   win = new BrowserWindow({
      width: 1080,
      height: 720,
   });
}

app.on("ready", () => {
   newWin();

   console.log(win.getContentSize());
   const height = win.getBounds().height - win.getContentSize()[1];
   console.log(height);
   // misskey.twitter
   twitter = new BrowserView();
   twitter.webContents.loadURL("https://twitter.com/");
   win.addBrowserView(twitter);

   twitter.setBounds({
      width: win.getContentSize()[0] / 2,
      height: win.getContentSize()[1],
      x: 0,
      y: height,
   });
   twitter.setAutoResize({
      width: true,
      height: true,
      horizontal: true,
      vertical: true,
   });

   // misskey.04.si
   _04si = new BrowserView({
      webPreferences: {
         scrollBounce: true,
      },
   });
   _04si.webContents.loadURL("https://misskey.04.si/");
   win.addBrowserView(_04si);
   _04si.setBounds({
      width: win.getContentSize()[0] / 2,
      height: win.getContentSize()[1],
      x: win.getContentSize()[0] / 2,
      y: height,
   });
   _04si.setAutoResize({
      width: true,
      height: true,
      horizontal: true,
      vertical: true,
   });
});

app.on("activate", () => {
   if (win === null) newWin();
});

app.on("window-all-closed", () => {
   if (!isMac) app.quit();
   win = null;
});
