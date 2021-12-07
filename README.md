# NHsub

Add subscribe feature to nhentai.net with chrome extension.

## Usage
1. On `nhentai.net`, you should see `NHsub` added to toolbar if installed correctly. Click on it.
2. Add tags you want to subscribe to in the `Subscribed` section. 
3. Click reload icon to show the newest uploads of all your subscribed tags in `New Uploads` section.

![Usage](https://github.com/Lifulifu/NHsub/blob/main/public/images/usage.PNG)

## Install
### English
1. [[Download]](https://github.com/Lifulifu/NHsub/releases) zip file of the latest release and unzip it.
2. Type `chrome://extensions` in chrome search bar and enter the page.
3. Enable `Developer mode` (top right).
4. Click `Load unpacked` (top left) and choose `public` folder.
5. If you can see `NHsub` in toolbar section of `nhentai.net`, DONE!!
### 中文
1. [[下載]](https://github.com/Lifulifu/NHsub/releases)最新版壓縮檔後解壓縮
2. Chrome搜尋欄打`chrome://extensions`後enter
3. 開啟`開發人員模式`(右上角)
4. 點`載入未封裝項目`，選擇`public`資料夾
5. 如果在`nhentai.net`上能看到`NHsub`出現在上方工具列，DONE!!

## Documentation
There will be a detailed doc soon if anyone wants to make a pull request to make this project better, but here are some notes:
- The `tag`s here are not actual nhentai tags, they are simply search strings with category condition (check [search](https://nhentai.net/info/) section). For example:
  - A tag with category `artist` and value `yamada` will be converted to search string `artist:"yamada"`
  - A tag with no category and value `loli` will simply be `loli`
- We use nhentai search api to search for the **FIRST** search result page for each tag, and sort each upload by time.
- To speed up, a batch of `N` search strings is queried each time. Currently `N` = 4. Setting higher values might be viewed as DDoS and blocked by nhentai server.

## TODOs
Please feel free for posting issues or make pull requests!
- [ ] Import / Export tag list
- [ ] Adjustable search batch size on UI
- [ ] Indicate unchecked uploads (show a `new` icon on the cover)
- [ ] Show which tag is this book from (tooltip?)






