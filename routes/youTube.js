var express = require('express');
const { google } = require('googleapis');
var router = express.Router();
var multer = require('multer');
const path = require('path');
const fs = require('fs');
const readline = require('readline');
const { authenticate } = require('@google-cloud/local-auth');

const upload = multer(/*{ dest: 'uploads/' }*/);

router.post('/upload-video', upload.single('video'), (req, res) => {
    console.log('/upload-video')
    console.log(req.body)
    console.log(req.file)
    if (!req.file) {
        return res.status(400).json({ message: '請選擇要上傳的影片' });
    }

    // 在這裡可以對上傳的影片進行處理，例如存儲到特定的位置或進行其他操作
    request(req.file.buffer).execute(
      res=>{
        console.log("requestResponse")
        console.log(res)
      }
    )

    return res.status(200).json({ message: '影片上傳成功' });
});

// 設定您的API金鑰
const API_KEY = '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';

// 建立YouTube客戶端
const youtube = google.youtube({
  version: 'v3',
  auth: API_KEY
});

// 構建上傳請求
const request = (vedio) => youtube.videos.insert({
  part: 'snippet,status',
  requestBody: {
    snippet: {
      title: '影片標題',
      description: '影片描述',
      tags: ['標籤1', '標籤2']
    },
    status: {
      privacyStatus: 'private' // 設定影片隱私狀態，例如：private、public、unlisted
    }
  },
  media: {
    body: vedio//fs.createReadStream('YOUR_VIDEO_FILE_PATH') // 指定要上傳的影片檔案路徑
  },
  access_token: 'ya29.a0AWY7CkkRSyr4a29kpoIazgCXgNcLMG703RTUC64f7DuwYhSmtqS_D_FBECt4zo_Ku2LaQsQNgQSa5t4xH_6zcxSKbuba-nXSYTAL-yOldFjFAgXiNgmYaHQ0OjzZXk1eYV8o3W5uRoGL_hgWf2ClrGN8VgfnaCgYKAZUSARISFQG1tDrpHBYg0cSO39XA6AXVlJOf2A0163'
});

module.exports = router;