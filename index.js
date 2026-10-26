// can dat ben html cai nay de chay Swal
//<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script> <!-- Import SweetAlert2 -->

// Hàm để dịch 
function dichTextFromTo(textDemDich, micNoi){
    //console.log('cac ts:',textDemDich, micNoi);
    const inputText = textDemDich;
    let sourceLanguage;
    let targetLanguage;
    if (micNoi==='mic1'){
        sourceLanguage = listLangVoice[indexSelect1Update].substring(0,2);
        targetLanguage = listLangVoice[indexSelect2Update].substring(0,2);
    }else{
        sourceLanguage = listLangVoice[indexSelect2Update].substring(0,2);
        targetLanguage = listLangVoice[indexSelect1Update].substring(0,2);
    }    
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLanguage}&tl=${targetLanguage}&dt=t&q=${encodeURI(inputText)}`;

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            const responseReturned = JSON.parse(this.responseText);
            const translations = responseReturned[0].map((text) => text[0]);
            const textDichRa  = translations.join(" ");
            console.log(textDichRa);
            //Viet textDichRa vao trong hop chat
            if (micNoi==='mic1'){
              mic1TextDich = textDichRa;
              addMessage("mic1-dich", mic1TextDich);
              let lnoiDatTextDichCcVaMic = layNoiDatTextCc("mic1-dich");/////////////////////
              loa_button.onclick = () => {
                //neu dang phat loa thi nhung
                if (window.speechSynthesis.speaking) {
                  window.speechSynthesis.cancel();
                  lnoiDatTextDichCcVaMic[0].innerHTML = lnoiDatTextDichCcVaMic[0].innerText;
                  loa_button.style.backgroundImage = "url('icons/loa.png')";

                }else{
                //neu loa da dung thi doc lai
                speakTextDichCc(lang2VoiceC,lnoiDatTextDichCcVaMic, 'mic1');
              }
            }
              loa_button.click(); // tự động phát luôn
            }else{//neu micnoi la mic2
              mic2TextDich = textDichRa;
              addMessage("mic2-dich", mic2TextDich);
              let lnoiDatTextDichCcVaMic = layNoiDatTextCc("mic2-dich");
              loa_button.onclick = () => {
                //neu dang phat loa thi nhung
                if (window.speechSynthesis.speaking) {
                  window.speechSynthesis.cancel();
                  lnoiDatTextDichCcVaMic[0].innerHTML = lnoiDatTextDichCcVaMic[0].innerText;
                  loa_button.style.backgroundImage = "url('icons/loa.png')";
                }else{
                //neu loa da dung thi doc lai
                speakTextDichCc(lang1VoiceC,lnoiDatTextDichCcVaMic, 'mic2');
              }
            }
              loa_button.click(); // tự động phát luôn
            }
            //cho speak o sau, no se doc tren DIV cuoi cua chatbox
        }
    }
    xhttp.open("GET", url);
    xhttp.send();
};

function chatBoxKb1(){
    //removeAllDivs();
  if (is1Running) {
    recognition1.stop();
    recognition1=null;
    is1Running=false;
  }  
  if (is2Running) {
    recognition2.stop();
    recognition2=null;
    is2Running=false;
  }  

    //if (recognition1) recognition1.stop();
    //if (recognition2) recognition2.stop();
    //if (is1Running) is1Running=false;
    //if (is2Running) is2Running=false;

    let bien1 = listLangCountry[indexSelect1Update];
    Swal.fire({
        title: `<span style='color:darkgreen;'>🗣️Chat by keyboard in ${bien1}</span>`,
        html: `
            <textarea id="box1_ghi" spellcheck="false"></textarea>
            <script>
                window.addEventListener('DOMContentLoaded', () => {
                    document.getElementById('box1_ghi').focus();
                });
            </script>
            `,
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
    }).then((result) => {
        if (result.isConfirmed) {
            let mic1TextNoi = document.getElementById("box1_ghi").value;
            addMessage("mic1-noi", mic1TextNoi);
            if (daBatChatGpt===true){
                //send to GPT
                sendGptReplyAndSpeak(mic1TextNoi);
            }else{
              dichTextFromTo(mic1TextNoi, 'mic1');

            }

        }
    });
}

function chatBoxKb2(){
  //removeAllDivs();
  if (is1Running) {
    recognition1.stop();
    recognition1=null;
    is1Running=false;
  }  
  if (is2Running) {
    recognition2.stop();
    recognition2=null;
    is2Running=false;
  }  

    //if (recognition1) recognition1.stop();
    //if (recognition2) recognition2.stop();
    //if (is1Running) is1Running=false;
    //if (is2Running) is2Running=false;
    let bien2 = listLangCountry[indexSelect2Update];
    Swal.fire({
        title: `<span style='color:darkblue;'>👤Chat by keyboard in ${bien2}</span>`,
        html: `
            <textarea id="box2_ghi" spellcheck="false"></textarea>
            <script>
                window.addEventListener('DOMContentLoaded', () => {
                    document.getElementById('box2_ghi').focus();
                });
            </script>
            `,
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
    }).then((result) => {
        if (result.isConfirmed) {
            let mic2TextNoi = document.getElementById("box2_ghi").value;
            addMessage("mic2-noi", mic2TextNoi);
            if (daBatChatGpt===true){
                //send to GPT
                sendGptReplyAndSpeak(mic2TextNoi);
            }else{
              dichTextFromTo(mic2TextNoi, 'mic2');

            }//------------------

        }
    });
}

let listUrlYt = ["https://youtu.be/sk=proj=mKMYPU3NdTSnPtyXaqt=Nij9=v5yAf9kJxoxfTaaWYN1pf37MpVFa1Whz7=7VVWzCjI9kne8l7T3BlbkFJaPt5klWtsrAOe_tAhETBJyA=vWDykC1Ljzr34i8K6jMYlZREFEetozGf6jzm5fpLMsuqAmSI8A"];

function maHoaLaiAK(){
    let ch = listUrlYt[listUrlYt.length - 1].split("be/")[1].replaceAll("=","-");
    return ch;
}
let apiKey=maHoaLaiAK();


// Hàm gọi GPT 
async function sendGptReplyAndSpeak(transcript) {
    let userInput = transcript;
    if (!userInput) return;
    //let chatbox = document.getElementById("chatbox");
    //chatbox.innerHTML += `<p><strong>Bạn:</strong> ${userInput}</p>`;
  
    // Gửi tin nhắn đến OpenAI API
    let response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: userInput }]
      })
    });
  
    let data = await response.json();
    let reply = data.choices[0].message.content;
    
    addMessage('mic2-dich', reply);
    let lnoiDatTextDichCcVaMic = layNoiDatTextCc("mic2-dich");/////////////////////
    loa_button.onclick = () => {
      //neu dang phat loa thi nhung
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        lnoiDatTextDichCcVaMic[0].innerHTML = lnoiDatTextDichCcVaMic[0].innerText;
        loa_button.style.backgroundImage = "url('icons/loa.png')";
      }else{
        //neu loa da dung thi doc lai
        //speakTextDichCc(reply, lang1VoiceC,lnoiDatTextDichCcVaMic);
        speakTextDichCc(lang1VoiceC,lnoiDatTextDichCcVaMic, 'mic2');

      }
    }

    loa_button.click(); // tự động phát luôn

}


function anHienDivsInChat(){
  demAnHienClick +=1;
  const messages = document.querySelectorAll("#chatbox div");
  messages.forEach(msg => {
    if (demAnHienClick%2===1) {
      msg.style.display='none';
    } else {
      msg.style.display='block';
    }
  });
}
//--------
// Khôi phục chỉ số đã lưu hoặc gán mặc định
window.addEventListener('load', function() {
  const index1 = localStorage.getItem('menu1Index');
  const index2 = localStorage.getItem('menu2Index');

  if (index1 !== null) {
    lang1_select.selectedIndex = parseInt(index1);
  } else {
    lang1_select.selectedIndex = 16;
  }
  indexSelect1Update = lang1_select.selectedIndex;
  findVoiceMenu1(indexSelect1Update);

  if (index2 !== null) {
    lang2_select.selectedIndex = parseInt(index2);
  } else {
      lang2_select.selectedIndex = 3;
  }
  indexSelect2Update = lang2_select.selectedIndex;
  findVoiceMenu2(indexSelect2Update);
  //tham khao cach ghi gon
  //menu1.selectedIndex = index1 !== null ? parseInt(index1) : 1;
  //menu2.selectedIndex = index2 !== null ? parseInt(index2) : 2;

  checkChatGpt(); // kiểm tra ngay khi khởi động
});

// Hàm kiểm tra sự phù hợp
function checkChatGpt() {

  if (indexSelect1Update === indexSelect2Update) {
    removeAllDivs();
    daBatChatGpt=true;
    batTbChatGpt.innerText = "Enabled chat with GPT in "+listLangCountry[indexSelect1Update];
  }else{
    if (daBatChatGpt===true){
      removeAllDivs();
    }
    daBatChatGpt=false;
    batTbChatGpt.innerText = "";
      
  }
}

// Lưu và kiểm tra khi thay đổi
lang1_select.addEventListener('change', function() {
  localStorage.setItem('menu1Index', lang1_select.selectedIndex);
  indexSelect1Update = lang1_select.selectedIndex;
  //findVoiceMenu1(indexSelect1Update);
  checkChatGpt();
});

lang2_select.addEventListener('change', function() {
  localStorage.setItem('menu2Index', lang2_select.selectedIndex);
  indexSelect2Update = lang2_select.selectedIndex;
  //findVoiceMenu2(indexSelect2Update);
  checkChatGpt();
});
 
function aboutapp() {
Swal.fire({
    title: "<span style='color:darkgreen;'>About</span>",
    html: 
      '<p style="text-align: left;  color:grey;">✅ Ứng dụng <span style="color:darkblue;">Chat in multiple languages </span> do <span style="color:darkblue;">tiensg89@gmail.com</span> viết với mục đích để học tiếng Anh và trò chuyện với chatGPT cũng như tập nói bằng vài ngoại ngữ với sự giúp đỡ của Google dịch.\n</p>'+
      '<p style="text-align: left;  color:grey;">✅ <span style="color:darkblue;">Cách sử dụng như dưới đây sau khi vào trang ứng dụng web:</span>\n</p>'+
      '<p style="text-align: left;  color:grey;"><span style="color:red;">Bước 1:</span> Nhấp vào 🔒 để kích hoạt micro và loa, nó sẽ yêu cầu allow mic và sau đó phát âm ready và mở khóa thành 🔓</p>'+
      '<p style="text-align: left;  color:grey;"><span style="color:red;">Bước 2:</span> Chọn lại hai ngôn ngữ đàm thoại nếu cần. Nếu chọn hai ngôn ngữ đàm thoại giống nhau thì có nghĩa là ta đã chọn nói chuyện với chatGPT bằng ngôn ngữ đó. </p>'+
      '<p style="text-align: left;  color:grey;"><span style="color:red;">Bước 3:</span> Nhấp một trong hai micro để bắt đầu nói. Khi ta ngưng nói thì trong bảng sẽ hiển thị văn bản nói và văn bản dịch đồng thời máy sẽ đọc văn bản dịch và loa cử động. Nếu nhấp vào loa nó sẽ phát âm lại văn bản dịch gần nhất. Nếu loa đang nói mà ta nhấp vào thì nó ngưng nói. Khi mic còn cử động thì có nghĩa nó đang lắng nghe ta nói tiếp. Nếu mic không cử động thì có nghĩa là nó đã ngưng lắng nghe, muốn nó nghe thì ta phải nhấp vào.</p>'+
      '<p style="text-align: left;  color:grey;"><span style="color:red;">Bước 4:</span> Khi quá ồn ào, máy sẽ khó nhận thức tiếng nói, khi đó ta nhấp vào biểu tượng bàn phím để gõ văn bản trò chuyện. Mỗi khi gõ xong thì nhấp OK để nhận  kết quả. </p>'+
      '<p style="text-align: left;  color:grey;"><span style="color:red;">Bước 5:</span> Công dụng của 3 nút : "Show/Hide", "Copy", "Clear": </p>'+
      '<p style="text-align: left;  color:grey;">- "Show/Hide": Nếu nhấp vào thì văn bản sẽ được che đi, nhấp lần nữa văn bản sẽ hiện ra.</p>'+
      '<p style="text-align: left;  color:grey;">- "Copy": Khi nhấp vào thì văn bản sẽ được copy vào bộ nhớ, để sau đó ta có thể dán lại vào nơi khác, ví dụ email để chỉnh sửa hoặc gửi đi.</p>'+
      '<p style="text-align: left;  color:grey;">- "Clear": Khi nhấp vào, các dòng văn bản sẽ bị xóa cho đễ nhìn. </p>'+
      '<p style="text-align: left;  color:grey;"><span style="color:red;">Bước 6:</span> Khi thôi sử dụng thì nhấp vào 🔓 để khóa micro và loa lại thành 🔒.</p>'+

      '<p style="text-align: left;  color:darkblue;">✅ Ứng dụng này cũng có thể giúp người dùng nó tập nói vài ngoại ngữ như đã có trong menu. Ví dụ đối với tôi trong việc học tiếng Anh:</p>'+
      '<p style="text-align: left;  color:grey;">- Trong mỗi ngày, khi gặp phải những câu tiếng Anh chưa biết nói thì tôi  nói bằng tiếng Việt, ứng dụng sẽ dịch ra văn bản tiếng Anh và phát âm. Tôi sẽ nghe kỹ phát âm đó và tập nói theo bằng tiếng Anh, nểu nó dịch ra tiếng Việt đúng ý tôi thì có nghĩa là tôi đã nói câu tiếng Anh đó đúng. </p>'+
      '<p style="text-align: left;  color:grey;">- Mỗi ngày tôi trò chuyện với GPT một đề tài ngắn bằng tiếng Anh để mình tập nói và tập nghe GPT trả lời. Nếu tôi nói, nghe và hiểu cuộc trò chuyện đó thì có nghĩa là tôi đã thành công. </p>',

    confirmButtonText: "OK", 
  });
  
}

//let voicesX=[];
voicesXem.addEventListener("click", () => {
  if (chatbox.innerHTML === ""){
    chatbox.innerHTML = window.speechSynthesis
    .getVoices()
    .map(x => [x.lang,x.name].join(" - "))
    .sort()
    .join("<br>");
  }else{
    chatbox.innerHTML = "";
  }  
  //voicesX = speechSynthesis.getVoices();
  //for (const voice of voicesX) {
  //  console.log(`${voice.name} (${voice.lang})`);
  //  const div = document.createElement("div");
  //  div.textContent = `${voice.name} (${voice.lang})`;
  //  chatbox.appendChild(div);
    
  //}
});


//Thuc thi ham
//loadVoices();
//Thuc thi ham khi window.speechSynthesis co thay doi, neu khong thay doi thi da chay o tren , con o duoi khong chay 
//window.speechSynthesis.onvoiceschanged = function(e) { loadVoices(); }
