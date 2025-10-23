// can dat ben html cai nay de chay Swal
//<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script> <!-- Import SweetAlert2 -->

function chatBoxKb1(){
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
                
            }

        }
    });
}


let listUrlYt = ["https://youtu.be/sk=proj=epXwjLAeKPLBuTFMvjDmdQAhDVbhKcSZJ60xkDI4iF419uvhXC7GZ7jS7CHl8=OCemM293KtU5T3BlbkFJJ14i4QAWBYiJQbPMNBOMtspp8QL==mVbG2uig2oq44YGtjW9TFb3DdQuIrKYm7kNvvTnUqKoUA"];
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
        speakTextDichCc(reply, lang1VoiceC,lnoiDatTextDichCcVaMic);
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

  if (lang1_select.selectedIndex === lang2_select.selectedIndex) {
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
  findVoiceMenu1(indexSelect1Update);
  checkChatGpt();
});

lang2_select.addEventListener('change', function() {
  localStorage.setItem('menu2Index', lang2_select.selectedIndex);
  indexSelect2Update = lang2_select.selectedIndex;
  findVoiceMenu2(indexSelect2Update);
  checkChatGpt();
});
 