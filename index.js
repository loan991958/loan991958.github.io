// can dat ben html cai nay de chay Swal
//<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script> <!-- Import SweetAlert2 -->

//const keyboard1 = document.getElementById("keyboard1");
//const keyboard2 = document.getElementById("keyboard2");

function chatBoxKb1(){
    let bien1 = listLangCountry[indexSelect1Update];
    Swal.fire({
        title: `<span style='color:darkgreen;'>🗣️Chat by keyboard in ${bien1}</span>`,
        html: `
            <textarea id="box1_ghi" style="border: 1px solid #ccc; 
                                padding: 10px; 
                                font-size:24px;
                                width:100%;
                                height: 300px; 
                                overflow-y: scroll; 
                                margin-bottom: 10px;">
            </textarea>
            `,
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
    }).then((result) => {
        if (result.isConfirmed) {
            let mic1TextNoi = document.getElementById("box1_ghi").value;
            addMessage("mic1-noi", mic1TextNoi);
            dichTextFromTo(mic1TextNoi, 'mic1');

        }
    });
}

function chatBoxKb2(){
    let bien2 = listLangCountry[indexSelect2Update];
    Swal.fire({
        title: `<span style='color:darkblue;'>👤Chat by keyboard in ${bien2}</span>`,
        html: `
            <textarea id="box2_ghi" style="border: 1px solid #ccc; 
                                padding: 10px; 
                                font-size:24px;
                                width:100%;
                                height: 300px; 
                                overflow-y: scroll; 
                                margin-bottom: 10px;">
            </textarea>
            `,
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
    }).then((result) => {
        if (result.isConfirmed) {
            let mic2TextNoi = document.getElementById("box2_ghi").value;
            addMessage("mic2-noi", mic2TextNoi);
            dichTextFromTo(mic2TextNoi, 'mic2');

        }
    });
}
