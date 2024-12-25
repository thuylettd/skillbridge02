//menu header
$('.js-mobile').on('click', function(){
    $(this).toggleClass("js-mobile--close");
    $("html").toggleClass("js-locked");
    // $(".nav-menu").slideToggle();
    // e.preventDefault();
    $(".header-nav").fadeToggle();
});

$('.js-close-popup').on('click', function(){
    $(".popup").removeClass("active");
});







$(".js-slider-news").slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 2000,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                centerMode: true,
                centerPadding: '100px',
                slidesToShow: 2,
                infinite: false,
            }
        },
        {
            breakpoint: 480,
            settings: {
                centerMode: true,
                centerPadding: '100px',
                slidesToShow: 1,
                infinite: false,
            }
        }
    ]
});
$(".js-detail-img").slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: '100px',
    responsive: [
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

$(function () {
    $(".detail-maps__ct .detail-maps__ct-item").click(function () {
        var num = $(".detail-maps__ct .detail-maps__ct-item").index(this);
        $(".detail-maps__show .detail-maps__show-item").removeClass('active');
        $(".detail-maps__show .detail-maps__show-item").eq(num).addClass('active');
        $(".detail-maps__ct .detail-maps__ct-item").removeClass('active');
        $(this).addClass('active')
    });
});







//company

$('.js-show-modal').click(function (e) {
    e.preventDefault();
    var modal_id = $(this).attr('data-modal');
    $('.c-modal').removeClass('is-show');
    $('#' + modal_id).addClass('is-show');
    $('body').addClass('has-modal');
    $('html').addClass("js-locked");


    //height modal > 100vh

    if ($('#' + modal_id).find('.c-modal__wp').outerHeight() > $(window).height()) {
        $('#' + modal_id).addClass('flex-start');
    }
});

$('.js-cancel').click(function (e) {
    e.preventDefault();
    $(this).closest('.c-modal').removeClass('is-show');
    $('body').removeClass('has-modal');
    $('html').removeClass("js-locked");
});



$('.js-tabs li a').click(function(e){
    e.preventDefault();
    var tab_id = $(this).attr('data-tab');
    
    $('.js-tabs li').removeClass('is-active');
    $('.tabs-content').removeClass('current');
    
    $(this).parent().addClass('is-active');
    $("#"+tab_id).addClass('current');
});

$('.tabs-content input').each(function () {
    $(this).change(function () {
        let val_checkbox = $(this).val();
        let data_tab = $(this).attr('data-tab');
        //add item select while input check is checked
        if($(this).prop('checked')){
            $('.box-selected__result').append("<li class=" + val_checkbox + "><span class='txt-val'>" + val_checkbox + "</span><span class='btn-detete-selected'></span></li>");
            $('.company-curent').addClass("active");
        }else{
            $('.box-selected__result li').each(function () {
                let txt_val = $(this).find('.txt-val').text();
                if(val_checkbox == txt_val){
                    $('.' + val_checkbox).hide();
                }
            })
            
            // $('.box-filter__label .form-control li').each(function () {
            // 	let txt_val = $(this).find('.txt-val').text();
            // 	if(val_checkbox == txt_val){
            // 		$('.' + val_checkbox).hide();
            // 	}
            // })
        }
        
        
        //cout item selected
        updateTotal();
        
        //count item selected each tab
        updateQtyTab(data_tab);


        updateQtyTabSP(data_tab);

        //delete only item while click
        $('.btn-detete-selected').click(function () {
            var _this = $(this).parent().attr('class');
            $("." + _this).hide();
            let data_checkbox = $(this).prev().text();
            $('.tabs-content input').each(function () {
                let val_checkbox = $(this).val();
                if(data_checkbox == val_checkbox){
                    $(this).prop('checked', false);
                    updateTotal();

                    updateQtyTab(data_tab);

                    updateQtyTabSP(data_tab);
                }
            })
        })
    })
});


//update skills selected on input
$('.js-submit-skills').click(function (e) {
    e.preventDefault();
    $('.tabs-content input').each(function () {
        if ($(this).prop('checked')) {
            $('#register-form__list-skills').val($(this).val());
        }
    })
    $('.c-modal').removeClass('is-show');
})


$('.txt-delete-all').click(function (e) {
    e.preventDefault();
    $('.popup--clear').addClass("active");
});

$('.clear-option').click(function (e) {
    e.preventDefault();
    $('.box-selected__result li').hide();
    $('.box-selected__heading .qty').html('');
    $('.tabs-content input').prop('checked', false);
    $('.c-ttl__04--custom').removeClass("active");
    $('.custom--box').removeClass("active");
    $('.popup').removeClass("active");
    $('.c-tabs').find('.qty').html('');
    $('.fillter-acc__label').find('.qty').html('');
});



$('.btn-delete-skills-after').click(function () {
    $('#fillter').hide();
    $(this).parent().hide();
})

function updateTotal() {
    let count = 0;
    let checkbox_el = $('.tabs-content input');
    for (let i = 0; i < checkbox_el.length; i++) {
        if (checkbox_el[i].checked === true) {
            count++;
        }
    }
    
    $('.box-selected__heading .qty').html('('+count+')');
}


//update qty each only tab
function updateQtyTab(dataTab) {
    let count = 0;
    let checkbox_el_tab = $('.tabs-content').find("[data-tab='" + dataTab + "']");
    

    if (checkbox_el_tab.length > 0) {
        for (let i = 0; i < checkbox_el_tab.length; i++) {
            if (checkbox_el_tab[i].checked === true) {
                count++;
            }
        }
        $('.c-tabs').find("[data-tab='" + dataTab + "']").find('.qty').html('('+count+')');
    } else {
        $('.c-tabs').find("[data-tab='" + dataTab + "']").find('.qty').html('');
    }
}

//update qty each only tab
function updateQtyTabSP(dataTab) {
    let count = 0;
    let checkbox_el_tab = $('.tabs-content').find("[data-tab='" + dataTab + "']");
    

    if (checkbox_el_tab.length > 0) {
        for (let i = 0; i < checkbox_el_tab.length; i++) {
            if (checkbox_el_tab[i].checked === true) {
                count++;
            }
        }
        $('.fillter-acc').find("[data-tab='" + dataTab + "']").find('.qty').html('('+count+')');
    } else {
        $('.fillter-acc').find("[data-tab='" + dataTab + "']").find('.qty').html('');
    }
}




$('.fillter-acc__label').click(function () {
    $(this).next().slideToggle();
    $(this).parent().toggleClass('is-active');
})


$('.acc-skills__dt').click(function () {
    $(this).next().slideToggle(100);
    $(this).parent().toggleClass('is-active');
})


var skill_template = `<div class="form-grid form-grid--styles02">
											<dl class="form-group">
												<dt class="form-group__label">資格証明書</dt>
												<dd class="form-group__input">
													<a href="" class="txt-link js-qualifications">参考</a>
													<input type="text" class="form-control" placeholder="基本情報技術者">
												</dd>
											</dl>
											<dl class="form-group">
												<dt class="form-group__label">取得日</dt>
												<dd class="form-group__input">
													<input type="text" placeholder="2021年06月" class="form-control form-control--date">
												</dd>
											</dl>
											<a href="" class="box-project__close"><img src="../img/common/close-circle-red.png" alt="" width="24"></a>
										</div>`;

var project = `<div class="box-project">
<a href="" class="box-project__close"><img src="../img/common/close-circle-red.png" alt="" width="24"></a>
<div class="form-grid">
	<dl class="form-group form-group--full">
		<dt class="form-group__label">プロジェクト名</dt>
		<dd class="form-group__input">
			<input type="text" class="form-control" placeholder="プロジェクト名を入力してください。">
		</dd>
	</dl>
	<dl class="form-group">
		<dt class="form-group__label">開始</dt>
		<dd class="form-group__input">
			<input type="text" class="form-control" placeholder="Select time">
		</dd>
	</dl>
	<dl class="form-group">
		<dt class="form-group__label">終了</dt>
		<dd class="form-group__input">
			<input type="text" class="form-control" placeholder="Select time">
		</dd>
	</dl>
</div>
<div class="project-business">
	<h3 class="project-business__ttl"><span>業務内容</span></h3>
	<dl class="form-group form-group--full form-group--styles02">
		<dt class="form-group__label"><span>*</span>プロジェクト内容</dt>
		<dd class="form-group__input">
			<img src="../img/common/editor-02.png" alt="プロジェクト内容">
		</dd>
	</dl>
	<dl class="form-group form-group--full">
		<dt class="form-group__label"><span>*</span>組織</dt>
		<dd class="form-group__input">
			<img src="../img/common/input-01.png" alt="プロジェクト内容">
		</dd>
	</dl>
	<dl class="form-group form-group--full">
		<dt class="form-group__label"><span>*</span>組織</dt>
		<dd class="form-group__input">
			<img src="../img/common/input-02.png" alt="プロジェクト内容">
		</dd>
	</dl>
	<dl class="form-group form-group--full">
		<dt class="form-group__label"><span>*</span>役割</dt>
		<dd class="form-group__input">
			<img src="../img/common/input-02.png" alt="プロジェクト内容">
		</dd>
	</dl>
	<dl class="form-group form-group--full">
		<dt class="form-group__label"><span>*</span>開発環境</dt>
		<dd class="form-group__input">
			<img src="../img/common/input-03.png" alt="プロジェクト内容">
		</dd>
	</dl>
	<dl class="form-group form-group--full">
		<dt class="form-group__label"><span>*</span>担当業務</dt>
		<dd class="form-group__input">
			<img src="../img/common/input-04.png" alt="担当業務">
		</dd>
	</dl>
</div>
</div>`;

$('.box-project__close').click(function (e) {
    e.preventDefault();
    $(this).parent().remove();
})


var id = 2;
$('.js-add-qualifications').click(function () {
    // $(this).parent().append(skill_template);
    id++;
    $(this).before( `<div class="form-grid form-grid--styles02">
	<dl class="form-group">
		<dt class="form-group__label">資格証明書</dt>
		<dd class="form-group__input">
			<a href="" class="txt-link js-qualifications" data-id="`+ id +`">参考</a>
			<input type="text" class="form-control" placeholder="基本情報技術者" id="`+ id +`">
		</dd>
	</dl>
	<dl class="form-group">
		<dt class="form-group__label">取得日</dt>
		<dd class="form-group__input">
			<input type="text" placeholder="2021年06月" class="form-control form-control--date">
		</dd>
	</dl>
	<a href="" class="box-project__close"><img src="../img/common/close-circle-red.png" alt="" width="24"></a>
</div>` );
    $('.box-project__close').click(function (e) {
        e.preventDefault();
        $(this).parent().remove();
    })
    $('.js-qualifications').click(function (e) {
        e.preventDefault();
        var id = $(this).attr('data-id');
        $('#qualifications').attr('data-modal', id);
        $('#qualifications').addClass('is-show');
    });
})

$('.js-add-project').click(function (e) {
    e.preventDefault();
    $(this).before(project);
    $('.box-project__close').click(function (e) {
        e.preventDefault();
        $(this).parent().remove();
    })
})


$('.js-submit-qualifications').click(function (e) {
    e.preventDefault();
    var data_modal = $(this).closest('.c-modal').attr('data-modal');
    console.log(data_modal);
    $('.qualifications-content__wp input').each(function () {
        if ($(this).prop('checked')) {
            $('#' + data_modal).val($(this).val());
        }
    })
    $('.c-modal').removeClass('is-show');
});
$('.box-selected__heading--cusotm .c-ttl__04').on('click', function(){
    $(this).toggleClass("active");
    $(this).next(".custom--box").toggleClass("active");
});



jQuery(function ($) {
    $('.mh').matchHeight();
    $('.service-second__list02-item .c-ttl__08 .txt-lg').matchHeight();
});