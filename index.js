//-- Cho sect0--------------------------------------------------------
//--1-Cac bien global----------------
var nSect=0;
var nMenu=0;
var nImage=8; // so nay 8 mod 8 bang 0 ung anh goc 0.png la nha tho
var nLang=0;
var maLang='vi';
const toggleIcon = document.getElementById('toggle-icon');
const menuText = document.getElementById('menutext');
const languagebrowse = document.getElementById('languagebrowse');
let isMenuOpen = false;
var idsectht, idsectht2;

//--2- Quan trong Chỉ điều khiển việc ẩn/hiện menu-text khi ở chế độ mobile (media query)
//--Khi click vao 3 gach o goc trai se dieu khien menu nho--
toggleIcon.addEventListener('click', function () {
    alert('TEST');
    // Chỉ điều khiển việc ẩn/hiện menu-text khi ở chế độ mobile (media query)
    if (window.innerWidth <= 600) {
        if (isMenuOpen) {
            menuText.classList.remove('visible');
            menuText.classList.add('hidden');
            toggleIcon.classList.remove('fa-times');
            toggleIcon.classList.add('fa-bars');
        } else {
            menuText.classList.remove('hidden');
            menuText.classList.add('visible');
            toggleIcon.classList.remove('fa-bars');
            toggleIcon.classList.add('fa-times');
        }
        isMenuOpen = !isMenuOpen;
    }
});//-------------------------------------------------------------

//--3-Ham nay duoc goi boi ham ben duoi-----------------------------------
function dichViToEn(textCanDich,ptnode){
    const inputText = textCanDich;
    let sourceLanguage = 'vi';
    let targetLanguage = 'en';

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLanguage}&tl=${targetLanguage}&dt=t&q=${encodeURI(inputText)}`;

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            const responseReturned = JSON.parse(this.responseText);
            const translations = responseReturned[0].map((text) => text[0]);
            const outputText = translations.join(" ");
            ptnode.nodeValue = ' '+outputText;
            //console.log(ptnode.nodeValue);
        }
    };
    //---------------------
    xhttp.open("GET", url);
    xhttp.send();
}
//---4- Ham de quy nhan ban cac node con cua moi node----------------------------------
function traverseNodes(node, callback) {
    // Gọi callback cho node hiện tại (có thể là phần tử hoặc văn bản)
    callback(node);
    // Duyệt qua tất cả các node con
    node.childNodes.forEach(child => traverseNodes(child, callback));
}
//--5-----------------------------------
function dich_viDivChonClone_en(content){
    //const content = document.querySelector("[data-vi='sect1']");
    traverseNodes(content, node => {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.nodeValue.trim() !== ''){
                dichViToEn(node.nodeValue,node);
                //da dem dich vao nodeValue
            }else{
                node.nodeValue=' ';      
            }    
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            console.log(' ');
        }
    });
 }    

//--6--Khi goi ham nay (ngay luc dau) thi no se nhan ban viDiv vao enDiv tuong ung roi dich ra En---
function cloneSectXToEn(sectX){
    if (sectX==='sect1'){
        const viDivChon = document.getElementById("sect1vi");
        const viDivChonClone = viDivChon.cloneNode(true); 
        const enDivNhan = document.getElementById("sect1en");
        dich_viDivChonClone_en(viDivChonClone)
        enDivNhan.append(viDivChonClone)
        enDivNhan.style.display = "none";
    }
    if (sectX==='sect2'){
        const viDivChon = document.getElementById("sect2vi");
        const viDivChonClone = viDivChon.cloneNode(true); 
        const enDivNhan = document.getElementById("sect2en");
        dich_viDivChonClone_en(viDivChonClone)
        enDivNhan.append(viDivChonClone)
        enDivNhan.style.display = "none";
    }
    if (sectX==='sect3'){
        const viDivChon = document.getElementById("sect3vi");
        const viDivChonClone = viDivChon.cloneNode(true); 
        const enDivNhan = document.getElementById("sect3en");
        dich_viDivChonClone_en(viDivChonClone)
        enDivNhan.append(viDivChonClone)
        enDivNhan.style.display = "none";
    }
    if (sectX==='sect4'){
        const viDivChon = document.getElementById("sect4vi");
        const viDivChonClone = viDivChon.cloneNode(true); 
        const enDivNhan = document.getElementById("sect4en");
        dich_viDivChonClone_en(viDivChonClone)
        enDivNhan.append(viDivChonClone)
        enDivNhan.style.display = "none";
    }
    if (sectX==='sect5'){
        const viDivChon = document.getElementById("sect5vi");
        const viDivChonClone = viDivChon.cloneNode(true); 
        const enDivNhan = document.getElementById("sect5en");
        dich_viDivChonClone_en(viDivChonClone)
        enDivNhan.append(viDivChonClone)
        enDivNhan.style.display = "none";
    }
    if (sectX==='sect6'){
        const viDivChon = document.getElementById("sect6vi");
        const viDivChonClone = viDivChon.cloneNode(true); 
        const enDivNhan = document.getElementById("sect6en");
        dich_viDivChonClone_en(viDivChonClone)
        enDivNhan.append(viDivChonClone)
        enDivNhan.style.display = "none";
    }
    //None enDivNhan
    //enDivNhan.style.display = "none";
}
//--7-Ham nay thuc thi khi click vao nut nBuuton------------------------------
function nButtLang() { 
    //0-TAT OFF am speaker neu dang noi moi lan thay doi Lang
    const synth = window.speechSynthesis;
    if (synth.speaking) {
        synth.cancel(); // Dừng văn bản hiện tại
        let mauhead = document.querySelector("button[data-headphone-mau]")
        mauhead.setAttribute('data-headphone-mau','0');
    }

    nLang=nLang+1;

    if (nLang%2===1){
        maLang='en';
        //1-buttonlang ra chu en va mau blue
        document.getElementById("nButt").innerHTML=maLang;
        document.getElementById("nButt").style.color="blue";
        //2-Neu chon Toan trang thi phoi bay all sect va phoi bay all enDiv va che all viDiv
        if (nMenu===0){
            for (let i=1;i<=6;i++){
                //phoi bay all sect
                //let sectx = 'sect'+i;
                document.getElementById('sect'+i).style.display = 'block';
                //phoi bay all enDiv
                //let idsecten="#sect"+i+"en";
                document.getElementById("sect"+i+"en").style.display = 'block';
                //che all viDiv
                //let idsectvi="#sect"+i+"vi";
                document.getElementById("sect"+i+"vi").style.display = 'none';
            }
        }else{//neu nMenu !== 0
            for (let i=1; i<=6;i++){
                if (i===nMenu){
                    //phoi bay 1 sect
                    document.getElementById('sect'+i).style.display = 'block';
                    //phoi bay 1 enDiv
                    document.getElementById("sect"+i+"en").style.display = 'block';
                    //che 1 viDiv
                    document.getElementById("sect"+i+"vi").style.display = 'none';
                }else{
                    //che cac sect con lai
                    document.getElementById('sect'+i).style.display = 'none';
                    //che cac enDiv con lai
                    document.getElementById("sect"+i+"en").style.display = 'none';
                    //che cac viDiv con lai
                    document.getElementById("sect"+i+"vi").style.display = 'none';

                }
            }
        }    
    } else {
        //thay doi mau en/vi
        maLang='vi';
        //1-buttonlang ra chu vi va mau vang
        document.getElementById("nButt").innerHTML=maLang;
        document.getElementById("nButt").style.color="brown";
        //2-Neu chon Toan trang thi phoi bay all sect va phoi bay all enDiv va che all viDiv
        if (nMenu===0){
            for (let i=1;i<=6;i++){
                //phoi bay all sect
                document.getElementById('sect'+i).style.display = 'block';
                //phoi bay all viDiv
                document.getElementById("sect"+i+"vi").style.display = 'block';
                //che all viDiv
                document.getElementById("sect"+i+"en").style.display = 'none';
            }
        }else{//neu nMenu !== 0
            for (let i=1; i<=6;i++){
                if (i===nMenu){
                    //phoi bay 1 sect
                    document.getElementById('sect'+i).style.display = 'block';
                    //phoi bay 1 viDiv
                    document.getElementById("sect"+i+"vi").style.display = 'block';
                    //che 1 enDiv
                    document.getElementById("sect"+i+"en").style.display = 'none';
                }else{
                    //che cac sect con lai
                    document.getElementById('sect'+i).style.display = 'none';
                    //che cac enDiv con lai
                    document.getElementById("sect"+i+"en").style.display = 'none';
                    //che cac viDiv con lai
                    document.getElementById("sect"+i+"vi").style.display = 'none';

                }
            }
        }    
    }
}
//--8- Ham chon de muc Menu ----------------------------------------------------
function fchon_sec(id){ 
    maLang=document.getElementById('nButt').innerText;
    console.log(id,maLang);
    //lay ki tu cuoi lam chuong so global
    let nsectstr = id.replace("menu", ""); 
    nSect=parseInt(nsectstr);
    nMenu = nSect;
    if (nMenu===0){
        //Doi ten class title-sect thanh title-sect-xanhdam 
        let a = document.getElementsByClassName( "title-sect" );
        [...a].forEach( x => x.className += " title-sect-xanh" );
        [...a].forEach( x => x.classList.remove("title-sect") );
        //mau text cua menu0 la vang
        document.getElementById('menu0').style.color='brown';
        if (maLang==='vi'){
            for (let i=1;i<=6;i++){
                //mau text cua menu1 - 6  la trang
                document.getElementById('menu'+i).style.color='blue';
                //phoi bay all sect 1 to 6
                document.getElementById('sect'+i).style.display = 'block';
                //phoi bay all enDiv trong cac sect 1 to 6
                document.getElementById("sect"+i+"vi").style.display = 'block';
                //che all viDiv trong cac sect 1 to 6
                document.getElementById("sect"+i+"en").style.display = 'none';
            }
        } else {//maLang==='en'
            for (let i=1;i<=6;i++){
                //mau text cua menu1 - 6  la trang
                document.getElementById('menu'+i).style.color='blue';
                //phoi bay all sect 1 to 6
                document.getElementById('sect'+i).style.display = 'block';
                //phoi bay all enDiv trong cac sect 1 to 6
                document.getElementById("sect"+i+"en").style.display = 'block';
                //che all viDiv trong cac sect 1 to 6
                document.getElementById("sect"+i+"vi").style.display = 'none';
            }
        }
    }else{//nMenu !== 0
        //Doi ten class title-sect thanh title-sect-xanh
        let a = document.getElementsByClassName( "title-sect-xanh" );
        [...a].forEach( x => x.className += " title-sect" );
        [...a].forEach( x => x.classList.remove("title-sect-xanh") );
        

        if (maLang==='vi'){
            for (let i=1;i<=6;i++){
                if (i===nMenu){
                    //mau text cua menu0 la trang
                    document.getElementById('menu0').style.color='blue';
                    //mau text cua menuChon la vang
                    document.getElementById('menu'+i).style.color='brown';
                    //phoi bay 1 sect chon
                    document.getElementById('sect'+i).style.display = 'block';
                    //phoi bay 1 viDiv cua 1 sect chon
                    document.getElementById("sect"+i+"vi").style.display = 'block';
                    //che all enDiv cua cac sect ko chon 
                    document.getElementById("sect"+i+"en").style.display = 'none';
                }else{//i !== nMenu
                    //mau text cua menu0 la trang
                    document.getElementById('menu0').style.color='blue';
                    document.getElementById('menu'+i).style.color='blue';
                    document.getElementById('sect'+i).style.display = 'none';
                    document.getElementById("sect"+i+"vi").style.display = 'none';
                    document.getElementById("sect"+i+"en").style.display = 'none';

                }
            }
        } else {//maLang==='en'
            for (let i=1;i<=6;i++){
                if (i===nMenu){
                    document.getElementById('menu0').style.color='white';
                    document.getElementById('menu'+i).style.color='brown';
                    //phoi bay all sect
                    document.getElementById('sect'+i).style.display = 'block';
                    //phoi bay all enDiv
                    document.getElementById("sect"+i+"en").style.display = 'block';
                    //che all viDiv
                    document.getElementById("sect"+i+"vi").style.display = 'none';
                }else{
                    document.getElementById('menu0').style.color='white';
                    document.getElementById('menu'+i).style.color='white';
                    document.getElementById('sect'+i).style.display = 'none';
                    document.getElementById("sect"+i+"en").style.display = 'none';
                    document.getElementById("sect"+i+"vi").style.display = 'none';

                }
            }
        }


    }
}
//--9- Ham doc tieng Anh ỏ Viet theo giọng doc da cai trong may, co the khac nhau hoac chua cai-🎧
function speakViEn(text,malang){
    const message = new SpeechSynthesisUtterance(text);
    message.lang = malang;
    const voices = speechSynthesis
                    .getVoices()
                    .filter(voice => {
                        voice.lang = malang;});
    message.voice = voices[0];
    speechSynthesis.speak(message);
}

//-10- ---------------------------
function speakerViEnSectX(maLang, sectX){
    //alert(sectX.slice(-1));
    if (maLang === 'vi'){
        let maLangNoi = 'vi-VN';
        const content = document.getElementById(sectX+'vi');
        let textvi='';
        traverseNodes(content, node => {
            if (node.nodeType === Node.TEXT_NODE) {
                if (node.nodeValue.trim() !== ''){
                    textvi += node.nodeValue.trim()+' ';
                }
            }
        });
        textvi = textvi.replace(/🎧/g,'');
        speakViEn(textvi,maLangNoi);   
    }
    if (maLang === 'en'){
        let maLangNoi = 'en-US';

        const content = document.getElementById(sectX+'en');
        let texten='';
        traverseNodes(content, node => {
            if (node.nodeType === Node.TEXT_NODE) {
                if (node.nodeValue.trim() !== ''){
                    texten += node.nodeValue.trim()+' ';
                    //da dem dich vao nodeValue
                }
            }
        });
        texten = texten.replace(/🎧/g,'');
        speakViEn(texten,maLangNoi);   
    }
}
//--Xem hinh anh khi click < hoac > ---------------
function changeImageSect0(n) { 
    if (nSect !== 0){
        let images_sectN="images_sect"+String(nSect)+"/";
        nImage = nImage + n
        mod_nImage_8 = nImage % 8; 
        let im = String(mod_nImage_8)+'.png';
        //document.getElementById('sect0').style.backgroundImage = "url('images_sect0/" + im + "')";
        document.getElementById('sect0').style.backgroundImage = "url('" + images_sectN + im + "')";
    } else {
        for (let j = 0; j <= 6; j++) {
            let images_sectN="images_sect"+String(j)+"/";
            nImage = nImage + n
            mod_nImage_8 = nImage % 8; 
            let im = String(mod_nImage_8)+'.png';
            //document.getElementById('sect0').style.backgroundImage = "url('images_sect0/" + im + "')";
            document.getElementById('sect0').style.backgroundImage = "url('" + images_sectN + im + "')";
    
        }
    }    
}
//---------
function readSelectedText() {
    // Lấy đoạn văn bản đã chọn
    const selectedText = window.getSelection().toString();

    // Kiểm tra xem người dùng có chọn văn bản nào không
    if (selectedText) {
        // Tạo một đối tượng SpeechSynthesisUtterance để đọc văn bản
        const speech = new SpeechSynthesisUtterance(selectedText);

        // Chọn ngôn ngữ (ví dụ: tiếng Việt)
        if (document.getElementById('nButt').innerText==='vi'){
            speech.lang = 'vi-VN';
        }else{
            speech.lang = 'en-US';
        }

        speech.onend = function(){
            let mauhead = document.querySelector("button[data-headphone-mau]")
            mauhead.setAttribute('data-headphone-mau','0');

        }
        // Đọc văn bản
        window.speechSynthesis.speak(speech);

        let mauhead = document.querySelector("button[data-headphone-mau]")
        mauhead.setAttribute('data-headphone-mau','1');

        if (! window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel(); // Dừng văn bản hiện tại
            mauhead.setAttribute('data-headphone-mau','0');

        }



    } else {
        let mauhead = document.querySelector("button[data-headphone-mau]")
        mauhead.setAttribute('data-headphone-mau','0');

        //alert("Vui lòng bôi chọn một đoạn văn bản.");
    }
}


//-- can dat cuoi tep 6 lenh thuc thu ham cloneSectXToEn() voi doi so la cac sectx 
cloneSectXToEn('sect1'); 
cloneSectXToEn('sect2'); 
cloneSectXToEn('sect3'); 
cloneSectXToEn('sect4'); 
cloneSectXToEn('sect5'); 
cloneSectXToEn('sect6'); 
document.getElementById('menu0').style.color='brown';
fchon_sec("menu0");
