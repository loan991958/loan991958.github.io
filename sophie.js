      var rateVread = 1;
      var utterance_volume = 1;
      //const videochon = document.getElementById("videochon");
      videochon.textContent = 'JqJ7PlMCDuE'; //default
      //const selectVideo = document.getElementById("selectVideo");
      //const selectChude = document.getElementById("selectChude");

      // ==========================
      // 1. LOAD VOICES
      // ==========================
      const voiceSelect = document.getElementById("voiceSelect");
      let voices = [];

      function loadVoices() {
        voices = speechSynthesis.getVoices();
        if (!voices.length) return;

        voiceSelect.innerHTML = "";
        voices.forEach(v => {
          const opt = document.createElement("option");
          opt.value = v.name;
          opt.textContent = `${v.lang} ${v.name}`;
          voiceSelect.appendChild(opt);
        });
        for (let opt of voiceSelect.options) {
          if (opt.textContent.includes("vi-VN") && (opt.value.includes("An") || opt.value.includes("Linh"))) {
            voiceSelect.value = opt.value;   // chọn option đó
            break;                      // dừng lại ngay
          }
        }

      }

      speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();


      // ==========================
      // 3. FETCH JSON SUBTITLES
      // ==========================
      async function fetchSubtitles(videoId) {
        const url = `Subs/${videoId}.json`;
        //const url = `https://raw.githubusercontent.com/hoangco89/hoangco89.github.io/main/Subs/${videoId}.json`;
        //neu repo github la private thi phai dung:
        //fetch(url, {
        //    headers: {
        //      Authorization: "token YOUR_GITHUB_TOKEN"
        //    }
        //})
        //.then(r => r.json())
        //.then(data => console.log(data));

        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error("Không tìm thấy JSON");
          return await res.json();
        } catch (err) {
          console.error(err);
          return [];
        }
      }

      // ==========================
      // 4. TTS + SYNC SUBTITLES
      // ==========================
      //let subtitles = [];
      let interval = null;
      let currentIndex = -1;
      const subDiv = document.getElementById("currentSubtitle");

      function speak(textd) {
        speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(textd);
        utter.rate = rateVread;
        const selected = voiceSelect.value;
        const voice = voices.find(v => v.name === selected);
        if (voice) utter.voice = voice;
        loa_button.onclick = () => {
          utter.volume = utterance_volume;
          speechSynthesis.speak(utter);
        }
        loa_button.click(); // tự động phát luôn
      }

      function stopReading() {
        speechSynthesis.cancel();
        clearInterval(interval);
        interval = null;
        currentIndex = -1;
      }

      function resumeSync() {
        stopReading();
        startSync();
      }

      function startSync() {
        interval = setInterval(() => {
          if (!player || !subtitles.length) return;

          const t = player.getCurrentTime();
          let idx = subtitles.findIndex(s => t >= s.start && t < s.end);

          if (idx !== currentIndex) {
            currentIndex = idx;

            if (idx === -1) {
              subDiv.textContent = "";
            } else {
              document.getElementById("currentSubtitle").textContent = subtitles[idx].text;
              document.getElementById("subdich").textContent = subtitles[idx].textdich;
              speak(subtitles[idx].textdich);
            }
          }
        }, 200);
      }

      //---dich
      async function translateFullJson() {
        const selected = voiceSelect.value;
        const v = voices.find(x => x.name === selected);

        let sourceLanguage = 'en';
        let targetLanguage = v.lang.split("-")[0];
        //console.log(sourceLanguage, targetLanguage);
        //tao texts la list chua cac text cua subtitles
        if (!subtitles || subtitles.length === 0) return;
        let texts = subtitles.map(item => item.text);
        let textdichs = subtitles.map(item => item.textdich);

        //console.log(texts);

        Array.prototype.forEach.call(texts, function (cau, i) {
          let inputText = cau;
          let outputTextEle = textdichs[i];

          const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLanguage}&tl=${targetLanguage}&dt=t&q=${encodeURI(inputText)}`;

          const xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              const responseReturned = JSON.parse(this.responseText);
              const translations = responseReturned[0].map((text) => text[0]);
              const outputText = translations.join(" ");
              //outputTextEle.textdich = outputText;
              subtitles[i].textdich = outputText;
              console.log(subtitles[i].textdich);
            }
          };
          //---------------------
          xhttp.open("GET", url);
          xhttp.send();
        });
      }
      const rateRead = document.getElementById('rateRead');
      function tocDoDoc() {
        let rateReadValue = Number(rateRead.textContent.split(':')[1]);
        rateReadValue = (1 + rateReadValue) % 10;//1,2,3,4,5,0
        if (rateReadValue == 0) rateReadValue = 1;
        rateRead.textContent = 'Rate: ' + rateReadValue;
        rateVread = 1 + rateReadValue / 10;//1, 1.5, 2, 2.5, 3, 3.5
      }

      function btnReadSub() {
        // Tắt tiếng YouTube
        if (player && player.mute) {
          player.mute();
        }
        // Bật âm lượng đọc phụ đề
        utterance_volume = 1;
      }

      function btnYoutubeSound() {
        // Bật tiếng YouTube
        if (player && player.unMute) {
          player.unMute();
          player.setVolume(100);
        }
        // Tắt âm lượng đọc phụ đề
        utterance_volume = 0;
      }



      function them_Http() {
        document.getElementById("videochon_http").innerHTML = 'https://www.youtube.com/watch?v=' + videochon.textContent;
      }

          //moi khi chay lai trang thi khoi phuc  voice + video
    
        //ham gui https// da nhap toi streamlit dang chay
  




//-----------
//--- ham lay json cua chu de
async function fetchJsonChude() {
    const url = `Jschude/js_titleIdUrl_chude.json`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Không tìm thấy JSON");
            return await res.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}


//--- load chude vao selectChude
fetchJsonChude().then(data => {
    //console.log(data);
    data.forEach((item, index) => {
        const option = document.createElement("option");
        option.value = item['id'];
        option.textContent = item['title'];
        selectChude.appendChild(option);
    });
    restoreChude();
    taomenu_selectVideo(selectChude.value); // goi lan dau

}); // end fetchJsonChude().then

//ham tao menu selectVideo theo chude da chon
async function taomenu_selectVideo(id_ofcddc){
    const url = `Jschude/${id_ofcddc}.json`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Không tìm thấy JSON selectVideo");
            }
            return response.json();
        })
        .then(data => {
            // Xóa các tùy chọn hiện có trong selectVideo
            //const selectVideo = document.getElementById("selectVideo");
            selectVideo.innerHTML = "";
            data.forEach((item, index) => {
                const option = document.createElement("option");
                option.value = item['id'];
                option.textContent = index + ". " + item['title'];
                selectVideo.appendChild(option);
            });
            restoreVideo(selectChude.value);
            videochon.textContent = selectVideo.value;
        videoId = videochon.textContent;

        subtitles = fetchSubtitles(videoId);

        // 🔥 DỊCH TOÀN BỘ JSON
        if (subtitles.length>0){    
          tbao_pde.textContent = ""
          translateFullJson(subtitles);
        }else{
          currentSubtitle.innerHTML="[source subtitles]";
          subdich.innerHTML="[translated subtitles]";
          tbao_pde.textContent = "No subtites. Click here to get!"

        }  
        player.loadVideoById(videoId);
        player.playVideo();

        startSync();

        });
}

// --- Khi thay đổi selectChude  ---
selectChude.addEventListener("change", () => {
    const chudeId = selectChude.value;
    localStorage.setItem("chude", chudeId);

    taomenu_selectVideo(chudeId);

    //restoreVideo(chudeId);         // khôi phục bài tương ứng

});

// --- Lưu khi thay đổi selectVideo ---co roi ben html
//selectVideo.addEventListener("change", () => {
    //localStorage.setItem("selectChudeValue", selectChude.value);
    //moi lan thay doi chude thi goi ham tao menu selectVideo
//    videochon.textContent = selectVideo.value;

//});
// ------------------------------
// 1) Khôi phục select 1 (chủ đề)
// ------------------------------
function restoreChude() {
    const saved = localStorage.getItem("chude");
    if (saved !== null) {
        selectChude.value = saved;
    } else {
        selectChude.selectedIndex = 0; // default
        selectChude.value = selectChude.options[selectChude.selectedIndex].value;
    }
    //alert('nam o restoreChude : ',selectChude.value);
}

// ------------------------------
// 2) Khôi phục select 2 (bài)
// ------------------------------
function restoreVideo(chudeId) {
    const key = "bai_" + chudeId;
    const saved = localStorage.getItem(key);

    if (saved !== null) {
        selectVideo.value = saved;
    } else {
        selectVideo.selectedIndex = 0; // default
        selectVideo.value = selectVideo.options[selectVideo.selectedIndex].value;

    }
}

// ------------------------------
// 3) Lưu khi thay đổi select 1
// ------------------------------
//selectChude.addEventListener("change", () => {
//    const chudeId = selectChude.value;
//    localStorage.setItem("chude", chudeId);

//    loadBaiTheoChude(chudeId);   // load lại select 2
//    restoreBai(chudeId);         // khôi phục bài tương ứng
//});

// ------------------------------
// 4) Lưu khi thay đổi select 2
// ------------------------------
//selectVideo.addEventListener("change", () => {
//    const chudeId = selectChude.value;
//    const key = "bai_" + chudeId;
//    localStorage.setItem(key, selectVideo.value);

//    videochon.textContent = selectVideo.value;
//});

// ------------------------------
// 5) Khi trang load
// ------------------------------
//window.addEventListener("DOMContentLoaded", () => {
    //restoreChude(); tao menu o tren da restoreChude()
    //tuc la cap nhat selectChude.value
//    const chudeId = selectChude.value;
    //alert(chudeId);
//    taomenu_selectVideo(chudeId); // goi lan dau
//});

function lay_phudejson_byst(){
    let url = "https://www.youtube.com/watch?v=" + videochon.textContent;
    const link = encodeURIComponent(url);
    //alert(link);
    try {
      //neu app.py chay tai may local 8501 thi:
      window.location.href = "https://tien89.streamlit.app/?link=" + link;
    } catch (err) {
      console.error(err);
      alert('py ko hd');
      return;
    }

}

function xuLiUrlInput(){
  let url = inputurl.value;
  //gui link qua nho https://tien89.streamlit.app lay phu de 
  const link = encodeURIComponent(url);
  //let listgui = ['video', 'en', url];
  //alert(link);
  try {
    //neu app.py chay tai may local 8501 thi:
    window.location.href = "https://tien89.streamlit.app/?link=" + link;
  } catch (err) {
    console.error(err);
    //alert('tien89.streamlit.app khong dang hoat dong.');
    return;
  }
}
//https://www.youtube.com/watch?v=Apn6KLPx1_Q




// ham nay phuc vu chu de 3 vi yt khong cho embed, khi do phai nhap dub de chay ngoai trang
playBtn.addEventListener('dblclick', (e) => {
  let url = "https://www.youtube.com/watch?v="+videoId;  
  window.location.href = url;
});


function tom_tat_ndvideo(){
  if (subtitles.length>0){
    alert('co');
  }
  chatbox.innerHTML = 'Toi la Sophie. ';
}