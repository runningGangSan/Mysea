// 등록 유효성 검사
$(".registryWrap").on("click", function(){
    var tinymceText = tinymce.get("tinymceEditor").getContent();
    console.log(tinymceText);

    // 제목을 안적었을 때
    if($(".questionTitle").val()==""){
        alert("제목을 기재해주세요.")
        return
    }
    // 아무 내용도 안적혀있을 때
    if(tinymceText==""){
        alert("내용을 기재해주세요.");
        return;
    }
    alert("등록 완료되었습니다.");
})


//에디터
$(function() {
    var plugins = [
        "advlist", "autolink", "lists", "link", "image", "charmap", "print", "preview", "anchor",
        "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table",
        "paste", "code", "help", "wordcount", "save"
    ];
    var edit_toolbar = 'formatselect fontselect fontsizeselect |'
        + ' forecolor backcolor |'
        + ' bold italic underline strikethrough |'
        + ' alignjustify alignleft aligncenter alignright |'
        + ' bullist numlist |'
        + ' table tabledelete |'
        + ' link image';

    tinymce.init({
        language: "ko_KR", //한글판으로 변경
        selector: '.editor',
        height: 500,
        menubar: false,
        plugins: plugins,
        toolbar: edit_toolbar,

        /*** image upload ***/
        image_title: true,
        /* enable automatic uploads of images represented by blob or data URIs*/
        automatic_uploads: true,
        /*
            URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
            images_upload_url: 'postAcceptor.php',
            here we add custom filepicker only to Image dialog
        */
        file_picker_types: 'image',
        /* and here's our custom image picker*/
        file_picker_callback: function (cb, value, meta) {
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');

            /*
            Note: In modern browsers input[type="file"] is functional without
            even adding it to the DOM, but that might not be the case in some older
            or quirky browsers like IE, so you might want to add it to the DOM
            just in case, and visually hide it. And do not forget do remove it
            once you do not need it anymore.
            */
            input.onchange = function () {
                var file = this.files[0];

                var reader = new FileReader();
                reader.onload = function () {
                    /*
                    Note: Now we need to register the blob in TinyMCEs image blob
                    registry. In the next release this part hopefully won't be
                    necessary, as we are looking to handle it internally.
                    */
                    var id = 'blobid' + (new Date()).getTime();
                    var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                    var base64 = reader.result.split(',')[1];
                    var blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);

                    /* call the callback and populate the Title field with the file name */
                    cb(blobInfo.blobUri(), {title: file.name});
                };
                reader.readAsDataURL(file);
            };
            input.click();
        },
        /*** image upload ***/

        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    });
});